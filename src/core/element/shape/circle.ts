import { fabric } from 'fabric'
import { paintBoard } from '@/core/paintBoard'

import { initCustomObjectAttr } from '@/core/utils/object'
import { getRoughShapeOptions, getFabricShapeOptions } from './utils'
import { ELEMENT_CUSTOM_TYPE } from '@/constants'
import { RoughShapeUtils } from './utils/roughUtils'

export class CircleElement {
  graphInstance: fabric.Object | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    const group = this.renderSketchCircle(point)

    paintBoard.canvas?.add(group)
    this.graphInstance = group
    this.startX = point.x
    this.startY = point.y
    initCustomObjectAttr(group, ELEMENT_CUSTOM_TYPE.SHAPE_CIRCLE)
  }

  renderSketchCircle(point: fabric.Point) {
    const paths = RoughShapeUtils.getCirclePaths(24, getRoughShapeOptions())
    const pathElementList = paths.map((path) => {
      return new fabric.Path(path.d, getFabricShapeOptions(path))
    })

    const group = new fabric.Group(pathElementList, {
      top: point.y,
      left: point.x,
      width: 26,
      height: 26,
      scaleX: 0,
      scaleY: 0
    })

    return group
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.graphInstance) {
      return
    }
    const { x: moveToX, y: moveToY } = new fabric.Point(point.x, point.y)
    const width = Math.abs(moveToX - this.startX)
    const height = Math.abs(moveToY - this.startY)
    const left = moveToX > this.startX ? this.startX : this.startX - width
    const top = moveToY > this.startY ? this.startY : this.startY - height

    this.graphInstance.set({
      scaleX: width / 26,
      scaleY: height / 26,
      left,
      top
    })

    this.graphInstance.setCoords()
    paintBoard.canvas?.requestRenderAll()
  }

  destroy() {
    if (this.graphInstance) {
      paintBoard.canvas?.remove(this.graphInstance)
    }
  }
}
