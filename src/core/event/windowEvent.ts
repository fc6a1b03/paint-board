import { KeyCode } from '@/constants/event'
import { paintBoard } from '@/core/paintBoard'
import { fabric } from 'fabric'
import useFileStore from '@/store/files'
import useBoardStore from '@/store/board'
import { KeyboardHandler } from './keyboard'

export class WindowEvent {
  private keyboardHandler: KeyboardHandler

  constructor() {
    this.keyboardHandler = new KeyboardHandler()
    this.initWindowEvent()
  }

  initWindowEvent() {
    window.addEventListener('keydown', this.keydownFn)
    window.addEventListener('keyup', this.keyupFn)
    window.addEventListener('paste', this.pasteFn)
    window.addEventListener('resize', this.resizeFn)
    window.addEventListener('orientationchange', this.resizeFn)
  }

  removeWindowEvent() {
    window.removeEventListener('keydown', this.keydownFn)
    window.removeEventListener('keyup', this.keyupFn)
    window.removeEventListener('paste', this.pasteFn)
    window.removeEventListener('resize', this.resizeFn)
    window.removeEventListener('orientationchange', this.resizeFn)
  }

  keydownFn = (e: KeyboardEvent) => {
    // Handle space key for pan mode
    if (e.code === KeyCode.SPACE) {
      /**
       * After pressing the SPACE key, change the mouse style, disable the drawing function, and open the drawing cache
       */
      paintBoard?.evnet?.clickEvent.setSpaceKeyDownState(true)
      const canvas = paintBoard?.canvas
      if (canvas) {
        if (!useBoardStore.getState().isObjectCaching) {
          fabric.Object.prototype.set({
            objectCaching: true
          })
        }
        canvas.defaultCursor = 'pointer'
        canvas.isDrawingMode = false
        canvas.selection = false
        fabric.Object.prototype.set({
          selectable: false,
          hoverCursor: 'pointer'
        })
      }
      return
    }

    // Delegate other keyboard events to the keyboard handler
    this.keyboardHandler.handleKeyDown(e)
  }

  keyupFn = (e: KeyboardEvent) => {
    if (e.code === KeyCode.SPACE) {
      /**
       * restores all states.
       */
      paintBoard.evnet?.clickEvent.setSpaceKeyDownState(false)
      if (paintBoard.canvas) {
        paintBoard.canvas.defaultCursor = 'default'
      }

      const transform = paintBoard.canvas?.viewportTransform
      if (transform) {
        useFileStore.getState().updateTransform(transform)
        if (!useBoardStore.getState().isObjectCaching) {
          fabric.Object.prototype.set({
            objectCaching: false
          })
        }
        paintBoard.handleMode()
      }
    }
  }

  pasteFn = (e: ClipboardEvent) => {
    // Delegate paste events to the keyboard handler
    this.keyboardHandler.handlePaste(e)
  }

  resizeFn = () => {
    const canvas = paintBoard.canvas
    if (canvas) {
      const { files, currentId } = useFileStore.getState()
      const file = files.find((item) => item.id === currentId)
      if (file) {
        canvas.setWidth(window.innerWidth * file.canvasWidth)
        canvas.setHeight(window.innerHeight * file.canvasHeight)
      }
    }
  }
}
