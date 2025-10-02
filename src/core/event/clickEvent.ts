import { fabric } from 'fabric'
import { ActionMode, SHAPE_ELEMENT_CUSTOM_TYPE } from '@/constants'
import { DrawStyle, DrawType } from '@/constants/draw'
import { paintBoard } from '@/core/paintBoard'

import { ReticulateElement } from '../element/draw/reticulate'
import { ShapeElement } from '@/core/element/draw/shape'
import { PixelsElement } from '../element/draw/pixels'
import { DrawTextElement } from '../element/draw/text'
import { MultiLineElement } from '../element/draw/multiLine'
import { RainbowElement } from '../element/draw/rainbow'
import { ThornElement } from '../element/draw/thorn'
import { MultiPointElement } from '../element/draw/multiPoint'
import { WiggleElement } from '../element/draw/wiggle'

import { LineShape } from '@/core/element/shape/line'
import { ArrowLineShape } from '@/core/element/shape/arrowLine'
import { GraphElement } from '@/core/element/shape/graph'

import useDrawStore from '@/store/draw'
import useBoardStore from '@/store/board'
import useShapeStore from '@/store/shape'

export class CanvasClickEvent {
  isMouseDown = false
  isSpaceKeyDown = false
  startPoint: fabric.Point | undefined
  currentElement:
    | ShapeElement
    | PixelsElement
    | DrawTextElement
    | MultiLineElement
    | ReticulateElement
    | RainbowElement
    | ThornElement
    | MultiPointElement
    | WiggleElement
    | LineShape
    | ArrowLineShape
    | GraphElement
    | null = null // The current mouse move draws the element

  constructor() {
    this.initClickEvent()
  }

  initClickEvent() {
    const canvas = paintBoard.canvas

    canvas?.on('mouse:down', (e) => {
      this.isMouseDown = true
      if (this.isSpaceKeyDown) {
        return
      }
      this.startPoint = e.absolutePointer

      let currentElement = null

      if (useBoardStore.getState().mode === ActionMode.DRAW) {
        if (useBoardStore.getState().drawType === DrawType.Shape) {
          switch (useShapeStore.getState().currentShapeIcon) {
            case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE:
              currentElement = new LineShape(e.absolutePointer)
              break
            case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_ARROW_LINE:
              currentElement = new ArrowLineShape(e.absolutePointer)
              break
            default:
              currentElement = new GraphElement(e.absolutePointer)
              break
          }
        } else if (useBoardStore.getState().drawType === DrawType.FreeStyle) {
          switch (useDrawStore.getState().drawStyle) {
            case DrawStyle.Shape:
              currentElement = new ShapeElement()
              break
            case DrawStyle.Pixels:
              currentElement = new PixelsElement()
              break
            case DrawStyle.Text:
              currentElement = new DrawTextElement()
              break
            case DrawStyle.MultiLine:
              currentElement = new MultiLineElement()
              break
            case DrawStyle.Reticulate:
              currentElement = new ReticulateElement()
              break
            case DrawStyle.Rainbow:
              currentElement = new RainbowElement()
              break
            case DrawStyle.Thorn:
              currentElement = new ThornElement()
              break
            case DrawStyle.MultiPoint:
              currentElement = new MultiPointElement()
              break
            case DrawStyle.Wiggle:
              currentElement = new WiggleElement()
              break
            default:
              break
          }
        }
      }
      this.currentElement = currentElement
    })
    canvas?.on('mouse:move', (e) => {
      if (this.isMouseDown) {
        // Press space, drag the canvas, stop drawing.
        if (this.isSpaceKeyDown) {
          canvas.relativePan(new fabric.Point(e.e.movementX, e.e.movementY))
          return
        }

        // two touch disabled drawing on mobile
        if (paintBoard.evnet?.touchEvent.isTwoTouch) {
          return
        }

        if (
          useBoardStore.getState().mode === ActionMode.DRAW &&
          this.currentElement
        ) {
          this.currentElement.addPosition(e.absolutePointer)
        }
      }
    })
    canvas?.on('mouse:up', (e) => {
      this.isMouseDown = false

      if (this.currentElement) {
        let isDestroy = false
        if (this.startPoint && e.absolutePointer) {
          const { x: startX, y: startY } = this.startPoint
          const { x: endX, y: endY } = e.absolutePointer
          if (startX === endX && startY === endY) {
            this.currentElement.destroy()
            isDestroy = true
          }
        }
        if (!isDestroy) {
          if (
            this.currentElement instanceof LineShape ||
            this.currentElement instanceof ArrowLineShape
          ) {
            this.currentElement?.mouseUp()
          }
          paintBoard.history?.saveState()
        }
        this.currentElement = null
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
