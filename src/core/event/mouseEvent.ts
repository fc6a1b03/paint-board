import { fabric } from 'fabric'
import { paintBoard } from '@/core/paintBoard'
import { DrawingHandler } from './draw/drawingHandler'

export class CanvasMouseEvent {
  drawingHandler: DrawingHandler
  isMouseDown = false
  isSpaceKeyDown = false

  constructor() {
    this.drawingHandler = new DrawingHandler()
    this.initMouseEvents()
  }

  initMouseEvents() {
    const canvas = paintBoard.canvas

    canvas?.on('mouse:down', (e) => {
      this.isMouseDown = true
      if (this.isSpaceKeyDown) {
        return
      }

      if (e.absolutePointer) {
        this.drawingHandler.drawingStart(e.absolutePointer)
      }
    })

    canvas?.on('mouse:move', (e) => {
      if (this.isMouseDown) {
        // Press space, drag the canvas, stop drawing.
        if (this.isSpaceKeyDown) {
          canvas.relativePan(new fabric.Point(e.e.movementX, e.e.movementY))
          return
        }

        // two touch disabled drawing on mobile
        const touches = paintBoard.evnet?.touchEvent?.touches
        if (touches && touches >= 2) {
          return
        }

        if (e.absolutePointer) {
          this.drawingHandler.handDrawing(e.absolutePointer)
        }
      }
    })

    canvas?.on('mouse:up', (e) => {
      this.isMouseDown = false

      if (e.absolutePointer) {
        this.drawingHandler.drawingEnd(e.absolutePointer)
      }
    })

    canvas?.on('mouse:dblclick', (e) => {
      if (e?.absolutePointer) {
        const { x, y } = e.absolutePointer
        paintBoard.textElement?.loadText({
          x,
          y
        })
      }
    })
  }

  setSpaceKeyDownState(isSpaceKeyDown: boolean) {
    this.isSpaceKeyDown = isSpaceKeyDown
  }
}
