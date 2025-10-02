import { DrawLineType } from '@/constants/drawLineType'
import { paintBoard } from '@/core/paintBoard'
import useShapeStore from '@/store/shape'

export const getShapeStrokeWidth = () => {
  const zoom = paintBoard.canvas?.getZoom() ?? 1
  const strokeWidth = useShapeStore.getState().strokeWidth
  return strokeWidth / zoom
}

export const getShapeStrokeStyle = (base = 5) => {
  const strokeStyle = useShapeStore.getState().strokeStyle
  const value = Math.round(base)

  switch (strokeStyle) {
    case DrawLineType.Dashed:
      return [value * 3, value * 2]
    case DrawLineType.Dotted:
      return [value, value * 3]
    default:
      return undefined
  }
}
