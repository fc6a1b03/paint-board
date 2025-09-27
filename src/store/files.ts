import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'
import { v4 as uuidv4 } from 'uuid'
import { produce } from 'immer'
import { useMemo } from 'react'

import useBoardStore from './board'
import { paintBoard } from '@/core/paintBoard'
import { ActionMode } from '@/constants'

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name)
  }
}

export const DEFAULT_BACKGROUND_SORT = ['image', 'color']
export const DEFAULT_BACKGROUND_COLOR_LIST = [
  'rgba(102, 204, 138, 0.4)',
  'linear-gradient(60deg, rgba(172,233,194,1) 0%, RGBA(23, 185, 48, 0.8) 49%, rgba(102,204,138,1) 100%)',
  'radial-gradient(circle, rgba(160,186,165,1) 0%, rgba(79,190,119,1) 35%, RGB(20, 78, 44) 100%)'
]

export interface IBoardData {
  version: string // fabric version
  objects: fabric.Object[]
  background: string // canvas background color ( rgba)
  backgroundImage: fabric.Image
}

export interface IFile {
  id: string // file id
  title: string // file title
  boardVersion: string // paint board version
  zoom: number // current canvas zoom
  viewportTransform?: number[] // current canvas transform
  canvasWidth: number // canvas width
  canvasHeight: number // canvas Height
  backgroundColorList: string[] // canvas background color
  currentBackgroundColor: number
  backgroundImage: string // canvas background image
  backgroundImageOpacity: number // canvas background image opacity
  backgroundSort: string[]
  boardData?: Partial<IBoardData>
}

interface FileState {
  currentId: string // current file id
  files: IFile[] // file list
}

interface FileAction {
  updateCurrentFile: (newId: string) => void
  updateFileTitle: (newTitle: string, id: string) => void
  updateZoom: (newZoom: number) => void
  updateTransform: (newTransform: number[]) => void
  updateCanvasWidth: (width: number) => void
  updateCanvasHeight: (height: number) => void
  updateBackgroundColor: (colorIndex: number, color: string) => void
  updateCurrentBackgroundColor: (colorIndex: number) => void
  deleteBackgroundColor: (colorIndex: number) => void
  updateBackgroundImage: (image: string) => void
  updateBackgroundImageOpacity: (opacity: number) => void
  updateBackgroundSort: (oldIndex?: number, newIndex?: number) => void
  updateBoardData: (data: Partial<IBoardData>) => void
  addFile: () => void
  deleteFile: (fileId: string) => void
  saveJSON: () => void
  uploadFile: (file: File | undefined) => Promise<boolean>
  orderFileList: (oldIndex?: number, newIndex?: number) => void
}

const initId = uuidv4()
export const BOARD_VERSION = '1.5.7'

// Helper functions for common operations
const findFileIndex = (files: IFile[], fileId: string): number => {
  return files.findIndex((file) => file.id === fileId)
}

const getCurrentFileIndex = (files: IFile[], currentId: string): number => {
  const index = findFileIndex(files, currentId)
  if (index === -1) {
    console.warn(`Current file with id ${currentId} not found`)
  }
  return index
}

const createDefaultFile = (
  id: string = uuidv4(),
  title: string = 'empty title'
): IFile => ({
  id,
  title,
  boardVersion: BOARD_VERSION,
  boardData: {},
  zoom: 1,
  canvasWidth: 1,
  canvasHeight: 1,
  backgroundColorList: [...DEFAULT_BACKGROUND_COLOR_LIST],
  currentBackgroundColor: -1,
  backgroundImage: '',
  backgroundImageOpacity: 1,
  backgroundSort: [...DEFAULT_BACKGROUND_SORT]
})

// Generic helper for current file operations
const updateCurrentFile = (
  get: () => FileState & FileAction,
  set: (fn: any) => void,
  updateFn: (file: IFile, index: number) => void,
  beforeUpdate?: () => void
) => {
  const { files, currentId } = get()
  const updateIndex = getCurrentFileIndex(files, currentId)
  if (updateIndex > -1) {
    beforeUpdate?.()
    set(
      produce((state: FileState & FileAction) => {
        updateFn(state.files[updateIndex], updateIndex)
      })
    )
  }
}

const useFileStore = create<FileState & FileAction>()(
  persist(
    (set, get) => ({
      currentId: initId,
      files: [createDefaultFile(initId, 'paint-board')],
      updateCurrentFile(newId) {
        const currentId = get().currentId
        if (newId !== currentId) {
          set({
            currentId: newId
          })
        }
      },
      updateFileTitle(newTitle, id) {
        const files = get().files
        const updateIndex = findFileIndex(files, id)
        if (updateIndex > -1 && files[updateIndex].title !== newTitle) {
          set(
            produce((state) => {
              state.files[updateIndex].title = newTitle
            })
          )
        }
      },
      updateBoardData(data) {
        const { files, currentId } = get()
        const updateIndex = getCurrentFileIndex(files, currentId)
        if (updateIndex > -1) {
          set(
            produce((state) => {
              state.files[updateIndex].boardVersion = BOARD_VERSION
              state.files[updateIndex].boardData = data
            })
          )
        }
      },
      updateZoom(newZoom) {
        updateCurrentFile(get, set, (file) => {
          file.zoom = newZoom
        })
      },
      updateTransform(newTransform) {
        updateCurrentFile(get, set, (file) => {
          file.viewportTransform = newTransform
        })
      },
      updateCanvasWidth(width) {
        updateCurrentFile(
          get,
          set,
          (file) => {
            file.canvasWidth = width
          },
          () => paintBoard.updateCanvasWidth(width)
        )
      },
      updateCanvasHeight(height) {
        updateCurrentFile(
          get,
          set,
          (file) => {
            file.canvasHeight = height
          },
          () => paintBoard.updateCanvasHeight(height)
        )
      },
      updateCurrentBackgroundColor(colorIndex) {
        updateCurrentFile(get, set, (file) => {
          file.currentBackgroundColor = colorIndex
        })
      },
      updateBackgroundColor(colorIndex, color) {
        updateCurrentFile(get, set, (file) => {
          file.backgroundColorList[colorIndex] = color
        })
      },
      deleteBackgroundColor(colorIndex) {
        updateCurrentFile(get, set, (file) => {
          if (colorIndex === file.currentBackgroundColor) {
            file.currentBackgroundColor = -1
          }
          file.backgroundColorList.splice(colorIndex, 1)
        })
      },
      updateBackgroundImage(image) {
        updateCurrentFile(get, set, (file) => {
          file.backgroundImage = image
        })
      },
      updateBackgroundImageOpacity(opacity) {
        updateCurrentFile(get, set, (file) => {
          file.backgroundImageOpacity = opacity
        })
      },
      updateBackgroundSort(oldIndex, newIndex) {
        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') {
          return
        }
        updateCurrentFile(get, set, (file) => {
          const backgroundSort = file.backgroundSort || [
            ...DEFAULT_BACKGROUND_SORT
          ]
          const [removed] = backgroundSort.splice(oldIndex, 1)
          backgroundSort.splice(newIndex, 0, removed)
          file.backgroundSort = backgroundSort
        })
      },
      addFile() {
        set(
          produce((state) => {
            state.files.unshift(createDefaultFile())
          })
        )
      },
      deleteFile(fileId) {
        const files = get().files
        if (files.length <= 1) {
          console.warn('Cannot delete the last file')
          return
        }

        const updateIndex = findFileIndex(files, fileId)
        if (updateIndex > -1) {
          set(
            produce((state) => {
              state.files.splice(updateIndex, 1)

              if (state.currentId === fileId) {
                state.currentId = state.files[0].id
                paintBoard.initCanvasStorage()
                useBoardStore.getState().updateMode(ActionMode.DRAW)
              }
            })
          )
        }
      },
      saveJSON() {
        const { files, currentId } = get()
        const currentData = files.find((file) => file.id === currentId)

        if (!currentData) {
          console.warn('No current file to save')
          return
        }

        try {
          const json = JSON.stringify(currentData)
          const blob = new Blob([json], { type: 'application/json' })
          const link = document.createElement('a')

          link.href = URL.createObjectURL(blob)
          link.download = `${currentData.title || 'paint-board'}.json`
          link.click()

          URL.revokeObjectURL(link.href)
        } catch (error) {
          console.error('Failed to save JSON:', error)
        }
      },
      uploadFile(file) {
        return new Promise((resolve) => {
          if (file) {
            const reader = new FileReader()
            reader.onload = (fEvent) => {
              const data = fEvent.target?.result as string
              let result = false
              if (data) {
                const json = JSON.parse(data)
                if (json?.boardData && json?.title) {
                  const id = uuidv4()
                  const { background, backgroundImage, ...otherBoardData } =
                    json.boardData || {}

                  let backgroundColorList = [...DEFAULT_BACKGROUND_COLOR_LIST]
                  let currentBackgroundColor = -1
                  if (background) {
                    backgroundColorList = [background]
                    currentBackgroundColor = 0
                  } else if (json?.backgroundColorList) {
                    backgroundColorList = json.backgroundColorList
                    currentBackgroundColor = json.currentBackgroundColor
                  }

                  const newFile: IFile = {
                    ...createDefaultFile(id, json?.title),
                    boardVersion: json?.boardVersion || BOARD_VERSION,
                    boardData: otherBoardData,
                    canvasWidth: json?.canvasWidth || 1,
                    canvasHeight: json?.canvasHeight || 1,
                    backgroundColorList,
                    currentBackgroundColor,
                    backgroundImage:
                      json?.backgroundImage || backgroundImage?.src || '',
                    backgroundImageOpacity: json?.backgroundImageOpacity || 1,
                    backgroundSort: json?.backgroundSort || [
                      ...DEFAULT_BACKGROUND_SORT
                    ]
                  }

                  set(
                    produce((state) => {
                      state.files.unshift(newFile)
                      state.currentId = state.files[0].id
                    })
                  )
                  result = true
                }
              }
              resolve(result)
            }
            reader.onerror = (error) => {
              console.log('reader fail', error)
              resolve(false)
            }
            reader.readAsText(file)
          } else {
            resolve(false)
          }
        })
      },
      orderFileList(oldIndex, newIndex) {
        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') {
          return
        }

        set(
          produce((state) => {
            const removed = state.files.splice(oldIndex, 1)[0]
            state.files.splice(newIndex, 0, removed)
          })
        )
      }
    }),
    {
      name: 'PAINT-BOARD-FILES',
      storage: createJSONStorage(() => storage)
    }
  )
)

export const useCurrentFile = () => {
  const { files, currentId } = useFileStore()

  const currentFile = useMemo(
    () => files.find((file) => file.id === currentId),
    [files, currentId]
  )

  return currentFile
}

export default useFileStore
