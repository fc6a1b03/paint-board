import { useMemo } from 'react'
import useShapeStore from '@/store/shape'
import { SHAPE_ELEMENT_CUSTOM_TYPE } from '@/constants'

import StrokeStyleConfig from './strokeStyleConfig'
import PointCountConfig from './linePointCountConfig'
import ShapeSelectConfig from './shapeSelectConfig'
import StrokeWidthConfig from './strokeWidthConfig'
import StrokeColorConfig from './strokeColorConfig'

const ShapeDrawConfig = () => {
  const { currentShapeIcon } = useShapeStore()
  const isLine = useMemo(() => {
    return [
      SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE,
      SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_ARROW_LINE
    ].includes(currentShapeIcon)
  }, [currentShapeIcon])

  return (
    <>
      <ShapeSelectConfig />
      {isLine && <PointCountConfig />}
      <StrokeStyleConfig />
      <StrokeWidthConfig />
      <StrokeColorConfig />
    </>
  )
}

export default ShapeDrawConfig
