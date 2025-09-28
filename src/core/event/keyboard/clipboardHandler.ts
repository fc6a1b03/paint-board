import { fabric } from 'fabric'
import { paintBoard } from '@/core/paintBoard'
import { ImageElement } from '@/core/element/image'
import { ActionMode } from '@/constants'
import useBoardStore from '@/store/board'
import { cloneObjects } from '@/core/utils/object'

/**
 * Clipboard operations handler
 * Handles copy, paste operations for objects, images, and text
 */
export class ClipboardHandler {
  private copiedObjects: fabric.Object[] = [] // stored replicated objects
  private isKeyboardPaste = false // flag whether it is keyboard paste

  /**
   * Select all objects on canvas
   */
  selectAllObjects() {
    const canvas = paintBoard?.canvas
    if (!canvas) return

    // get all objects on the canvas
    const allObjects = canvas.getObjects()

    if (allObjects.length === 0) {
      console.log('No objects to select')
      return
    }

    // if there is only one object, select it directly
    if (allObjects.length === 1) {
      canvas.setActiveObject(allObjects[0])
    } else {
      // if there are multiple objects, create an active selection group
      const activeSelection = new fabric.ActiveSelection(allObjects, {
        canvas: canvas
      })
      canvas.setActiveObject(activeSelection)
    }

    // re-render the canvas
    canvas.renderAll()
    console.log(`Selected ${allObjects.length} objects`)
  }

  /**
   * Copy selected objects
   */
  copySelectedObjects() {
    const canvas = paintBoard?.canvas
    if (!canvas) return

    const activeObjects = canvas.getActiveObjects()
    if (!activeObjects.length) {
      console.log('No object selected to copy')
      return
    }
    this.copiedObjects = activeObjects
  }

  /**
   * Set keyboard paste flag
   */
  setKeyboardPasteFlag() {
    this.isKeyboardPaste = true
  }

  /**
   * Handle paste from clipboard (images/text) or copied objects
   */
  handlePaste(e: ClipboardEvent) {
    let handled = false

    if (e.clipboardData && e.clipboardData.items) {
      /**
       * Paste Clipboard Image
       */
      const items = e.clipboardData.items
      const imageItem = Array.from(items).find(
        (item) => item.kind === 'file' && item.type.indexOf('image') !== -1
      )

      if (imageItem) {
        const blob = imageItem.getAsFile()
        if (blob) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const data = event.target?.result
            if (data && typeof data === 'string') {
              const image = new ImageElement()
              image.addImage(data)
              useBoardStore.getState().updateMode(ActionMode.SELECT)
            }
          }

          reader.readAsDataURL(blob)
        }
        handled = true
      } else {
        /**
         * Paste Clipboard Text
         */
        const text = e.clipboardData.getData('text/plain')
        if (text && text.trim()) {
          paintBoard.textElement?.loadText({
            text
          })
          handled = true
          useBoardStore.getState().updateMode(ActionMode.SELECT)
        }
      }
    }

    // if it is keyboard triggered paste and there is no handled clipboard content, then paste replicated objects
    if (this.isKeyboardPaste && !handled) {
      setTimeout(() => {
        this.pasteObjects()
      }, 0)
    }

    // reset flag
    this.isKeyboardPaste = false
  }

  /**
   * Paste copied objects
   */
  private pasteObjects() {
    const canvas = paintBoard?.canvas
    if (!canvas || this.copiedObjects.length === 0) {
      console.log('No objects to paste')
      return
    }

    cloneObjects(this.copiedObjects)
  }
}
