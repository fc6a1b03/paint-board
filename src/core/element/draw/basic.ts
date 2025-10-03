import useDrawStore from '@/store/draw'
import { getDrawWidth, getShadowWidth } from '@/core/utils/draw'
import { paintBoard } from '@/core/paintBoard'
import { fabric } from 'fabric'
import { getStrokeDashArray } from './utils'

export const renderPencilBrush = () => {
  const canvas = paintBoard.canvas
  if (!canvas) {
    return
  }

  const pencilBrush = new fabric.PencilBrush(canvas)
  canvas.isDrawingMode = true
  canvas.freeDrawingBrush = pencilBrush
  canvas.freeDrawingBrush.width = getDrawWidth()
  const {
    currentDrawColor,
    drawColors,
    shadowWidth,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor
  } = useDrawStore.getState()
  canvas.freeDrawingBrush.color = drawColors[currentDrawColor]

  const strokeDashArray = getStrokeDashArray()
  canvas.freeDrawingBrush.strokeDashArray = strokeDashArray

  if (shadowWidth > 0) {
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: getShadowWidth(),
      offsetX: shadowOffsetX,
      offsetY: shadowOffsetY,
      color: shadowColor
    })
  }
}
