import { paintBoard } from '../paintBoard'
import { v4 as uuidv4 } from 'uuid'
import useBoardStore from '@/store/board'
import { ActionMode, ELEMENT_CUSTOM_TYPE } from '@/constants'
import {
  initCustomObjectAttr,
  filterUnlockedObjects
} from '@/core/utils/object'
import { fabric } from 'fabric'

export class ObjectEvent {
  constructor() {
    this.initObjectEvent()
    this.initTextEvent()
  }

  initObjectEvent() {
    const canvas = paintBoard?.canvas
    canvas?.on('selection:created', (e) => {
      this.handleSelectionChange(e)
    })

    canvas?.on('selection:updated', (e) => {
      this.handleSelectionChange(e)
    })

    canvas?.on('selection:cleared', () => {
      paintBoard.triggerHook()
    })

    canvas?.on('path:created', (options) => {
      const { mode } = useBoardStore.getState()
      if ([ActionMode.DRAW, ActionMode.ERASE].includes(mode)) {
        /**
         * record fabric brush object
         */
        if (mode === ActionMode.DRAW) {
          const id = uuidv4()
          ;(options as any).path.set({
            id,
            perPixelTargetFind: true
          })
        }

        // Save fabric brush and fabric eraser operation state
        paintBoard.history?.saveState()
      }
    })
    canvas?.on('object:modified', (e) => {
      // Prohibit recording if the change is due to IText input content
      if (e.target?.type === 'i-text') {
        const obj = e.target as fabric.IText
        if (obj._textBeforeEdit === obj.text) {
          return
        }
      }
      // Usually operations that change the object such as dragging and zooming, record the operation
      if (e.action && e.target) {
        paintBoard.history?.saveState()
      }
    })
  }

  /**
   * Handle selection changes
   * filter out locked objects
   */
  private handleSelectionChange(e: any) {
    const canvas = paintBoard?.canvas
    if (!canvas) return

    // get current selected objects
    const selectedObjects = e.selected || []

    if (selectedObjects.length <= 1) {
      paintBoard.triggerHook()
      return
    }

    // filter out locked objects
    const unlockedObjects = filterUnlockedObjects(selectedObjects)

    // if there are locked objects that are filtered out, they need to be re-selected
    if (unlockedObjects.length !== selectedObjects.length) {
      // clear current selection
      canvas.discardActiveObject()

      // if there are still unlocked objects, re-select them
      if (unlockedObjects.length > 0) {
        if (unlockedObjects.length === 1) {
          // single object directly select
          canvas.setActiveObject(unlockedObjects[0])
        } else {
          // create ActiveSelection for multiple objects
          const activeSelection = new fabric.ActiveSelection(unlockedObjects, {
            canvas: canvas
          })
          canvas.setActiveObject(activeSelection)
        }
      }

      // re-render the canvas
      canvas.renderAll()
    }

    paintBoard.triggerHook()
  }

  initTextEvent() {
    const canvas = paintBoard?.canvas
    canvas?.on('text:editing:entered', () => {
      paintBoard.textElement.isTextEditing = true
    })

    canvas?.on('text:editing:exited', (e) => {
      const obj = e?.target as fabric.IText
      if (obj) {
        paintBoard.textElement.isTextEditing = false

        // If there is no _customType, it means it is a new object.
        if (!obj?._customType) {
          initCustomObjectAttr(obj, ELEMENT_CUSTOM_TYPE.I_TEXT)
        }

        // If the text changes, update the record
        if (obj?._textBeforeEdit !== obj?.text) {
          canvas.discardActiveObject()
          paintBoard.render()
        }
      }
    })
  }
}
