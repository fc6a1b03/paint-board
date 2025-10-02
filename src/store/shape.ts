import { DrawLineType } from '@/constants/drawLineType'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { produce } from 'immer'
import { SHAPE_ELEMENT_CUSTOM_TYPE } from '@/constants'

interface ShapeState {
  currentShapeIcon: string // current shape icon
  shapeIconList: string[] // shape icon list
  strokeStyle: string // shape stroke style
  currentStrokeColor: number // current stroke color
  strokeColorList: string[] // stroke Color list
  strokeWidth: number // stroke width
  shapeLinePointCount: number // Number of line segment turning points
}

interface ShapeAction {
  updateCurrentShapeIcon: (shapeIcon: string) => void
  addShapeIcon: (shapeIcon: string) => void
  deleteShapeIcon: (shapeIcon: string) => void
  updateStrokeStyle: (strokeStyle: string) => void
  updateCurrentStrokeColor: (strokeColorIndex: number) => void
  updateStrokeColor: (strokeColor: string, strokeColorIndex: number) => void
  deleteStrokeColor: (strokeColorIndex: number) => void
  updateStrokeWidth: (strokeWidth: number) => void
  updateShapeLinePointCount: (count: number) => void
}

const useShapeStore = create<ShapeState & ShapeAction>()(
  persist(
    (set, get) => ({
      currentShapeIcon: SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE,
      shapeIconList: [],
      strokeStyle: DrawLineType.Solid,
      currentStrokeColor: 0,
      strokeColorList: ['#000000'],
      strokeWidth: 3,
      shapeLinePointCount: 3,
      updateCurrentShapeIcon(shapeIcon) {
        set({
          currentShapeIcon: shapeIcon
        })
      },
      addShapeIcon(shapeIcon) {
        set(
          produce((state) => {
            const findColorIndex = state.shapeIconList.findIndex(
              (item: string) => item === shapeIcon
            )
            if (findColorIndex === -1) {
              state.shapeIconList.push(shapeIcon)
            }
          })
        )
      },
      deleteShapeIcon(shapeIcon) {
        set(
          produce((state) => {
            state.shapeIconList = state.shapeIconList.filter(
              (item: string) => item !== shapeIcon
            )
          })
        )
      },
      updateStrokeStyle(strokeStyle) {
        const oldStrokeStyle = get().strokeStyle
        if (oldStrokeStyle !== strokeStyle) {
          set({
            strokeStyle
          })
        }
      },
      updateCurrentStrokeColor(colorIndex) {
        set({
          currentStrokeColor: colorIndex
        })
      },
      updateStrokeColor: (color: string, colorIndex: number) => {
        set(
          produce((state) => {
            state.strokeColorList[colorIndex] = color
          })
        )
      },
      deleteStrokeColor(colorIndex) {
        set(
          produce((state) => {
            state.strokeColorList.splice(colorIndex, 1)
          })
        )
      },
      updateStrokeWidth: (strokeWidth) => {
        const oldStrokeWidth = get().strokeWidth
        if (oldStrokeWidth !== strokeWidth) {
          set({
            strokeWidth
          })
        }
      },
      updateShapeLinePointCount(count) {
        const oldCount = get().shapeLinePointCount
        if (count !== oldCount) {
          set({
            shapeLinePointCount: count
          })
        }
      }
    }),
    {
      name: 'PAINT-BOARD-SHAPE-STORE'
    }
  )
)

export default useShapeStore
