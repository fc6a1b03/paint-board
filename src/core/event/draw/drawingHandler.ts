import { paintBoard } from '@/core/paintBoard'
import { ActionMode, SHAPE_ELEMENT_CUSTOM_TYPE } from '@/constants'
import { DrawStyle, DrawType } from '@/constants/draw'

import useBoardStore from '@/store/board'
import useShapeStore from '@/store/shape'
import useDrawStore from '@/store/draw'

import { ReticulateElement } from '@/core/element/draw/reticulate'
import { ShapeElement } from '@/core/element/draw/shape'
import { PixelsElement } from '@/core/element/draw/pixels'
import { DrawTextElement } from '@/core/element/draw/text'
import { MultiLineElement } from '@/core/element/draw/multiLine'
import { RainbowElement } from '@/core/element/draw/rainbow'
import { ThornElement } from '@/core/element/draw/thorn'
import { MultiPointElement } from '@/core/element/draw/multiPoint'
import { WiggleElement } from '@/core/element/draw/wiggle'

import { LineShape } from '@/core/element/shape/line'
import { ArrowLineShape } from '@/core/element/shape/arrowLine'
import { GraphElement } from '@/core/element/shape/graph'
import { RectElement } from '@/core/element/shape/rect'
import { CircleElement } from '@/core/element/shape/circle'
import { RegularPolygonElement } from '@/core/element/shape/regularPolygon'

export class DrawingHandler {
  startPoint: fabric.Point | undefined
  currentDrawingElement:
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
    | RectElement
    | CircleElement
    | GraphElement
    | RegularPolygonElement
    | null = null // The current mouse move draws the element

  drawingStart(point: fabric.Point) {
    this.startPoint = point
    let currentDrawingElement = null

    if (useBoardStore.getState().mode === ActionMode.DRAW) {
      if (useBoardStore.getState().drawType === DrawType.Shape) {
        switch (useShapeStore.getState().currentShapeIcon) {
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE:
            currentDrawingElement = new LineShape(point)
            break
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_ARROW_LINE:
            currentDrawingElement = new ArrowLineShape(point)
            break
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_RECTANGLE:
            currentDrawingElement = new RectElement(point)
            break
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_CIRCLE:
            currentDrawingElement = new CircleElement(point)
            break
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_TRIANGLE:
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_PENTAGON:
          case SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_HEXAGON:
            currentDrawingElement = new RegularPolygonElement(point)
            break
          default:
            currentDrawingElement = new GraphElement(point)
            break
        }
      } else if (useBoardStore.getState().drawType === DrawType.FreeStyle) {
        switch (useDrawStore.getState().drawStyle) {
          case DrawStyle.Shape:
            currentDrawingElement = new ShapeElement()
            break
          case DrawStyle.Pixels:
            currentDrawingElement = new PixelsElement()
            break
          case DrawStyle.Text:
            currentDrawingElement = new DrawTextElement()
            break
          case DrawStyle.MultiLine:
            currentDrawingElement = new MultiLineElement()
            break
          case DrawStyle.Reticulate:
            currentDrawingElement = new ReticulateElement()
            break
          case DrawStyle.Rainbow:
            currentDrawingElement = new RainbowElement()
            break
          case DrawStyle.Thorn:
            currentDrawingElement = new ThornElement()
            break
          case DrawStyle.MultiPoint:
            currentDrawingElement = new MultiPointElement()
            break
          case DrawStyle.Wiggle:
            currentDrawingElement = new WiggleElement()
            break
          default:
            break
        }
      }
    }
    this.currentDrawingElement = currentDrawingElement
  }

  handDrawing(point: fabric.Point) {
    if (
      useBoardStore.getState().mode === ActionMode.DRAW &&
      this.currentDrawingElement
    ) {
      this.currentDrawingElement.addPosition(point)
    }
  }

  drawingEnd(point?: fabric.Point) {
    if (this.currentDrawingElement) {
      let isDestroy = false
      if (this.startPoint && point) {
        const { x: startX, y: startY } = this.startPoint
        const { x: endX, y: endY } = point
        if (startX === endX && startY === endY) {
          this.currentDrawingElement.destroy()
          isDestroy = true
        }
      }
      if (!isDestroy) {
        if (
          this.currentDrawingElement instanceof LineShape ||
          this.currentDrawingElement instanceof ArrowLineShape
        ) {
          this.currentDrawingElement?.mouseUp()
        }
        paintBoard.history?.saveState()
      }
      this.currentDrawingElement = null
    }
  }
}
