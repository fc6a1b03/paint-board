import { fabric } from 'fabric'
import { paintBoard } from '@/core/paintBoard'
import { initCustomObjectAttr } from '@/core/utils/object'
import { getShapeStrokeStyle, getShapeStrokeWidth } from './utils'
import useShapeStore from '@/store/shape'
import { ELEMENT_CUSTOM_TYPE } from '@/constants'
import * as LucideIcons from 'lucide-react'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'

export class GraphElement {
  graphInstance: fabric.Object | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    const { currentShapeIcon } = useShapeStore.getState()

    const strokeWidth = getShapeStrokeWidth()
    const { strokeColorList, currentStrokeColor } = useShapeStore.getState()

    // get the current Lucide icon
    const iconComponent = (LucideIcons as any)[currentShapeIcon]

    if (!iconComponent) {
      console.warn(`Icon "${currentShapeIcon}" not found in LucideIcons`)
      return
    }

    const graphIcon = createElement(iconComponent, {
      size: 24,
      color: strokeColorList[currentStrokeColor],
      strokeWidth: strokeWidth
    })

    const svgString = renderToString(graphIcon)

    // use fabric.loadSVGFromString to load SVG
    fabric.loadSVGFromString(svgString, (objects, options) => {
      const svgGroup = fabric.util.groupSVGElements(objects, options)
      const dashArray = getShapeStrokeStyle(strokeWidth)

      svgGroup.set({
        left: point.x,
        top: point.y,
        scaleX: 0,
        scaleY: 0,
        stroke: strokeColorList[currentStrokeColor],
        strokeWidth,
        strokeUniform: true,
        strokeLineCap: 'round',
        perPixelTargetFind: true,
        lockUniScaling: true
      })

      // apply styles to all objects in the SVG group
      if (svgGroup.type === 'group') {
        const group = svgGroup as fabric.Group
        if (group.getObjects) {
          group.getObjects().forEach((obj: fabric.Object) => {
            obj.set({
              stroke: strokeColorList[currentStrokeColor],
              strokeWidth,
              strokeDashArray: dashArray,
              strokeLineCap: 'round',
              strokeUniform: true
            })
          })
        }
      } else {
        // if not a group, set styles directly
        svgGroup.set({
          strokeDashArray: dashArray
        })
      }

      // set control point visibility, only show four corners
      svgGroup.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tl: true,
        tr: true,
        bl: true,
        br: true
      })

      paintBoard.canvas?.add(svgGroup)
      this.graphInstance = svgGroup
      this.startX = point.x
      this.startY = point.y
      initCustomObjectAttr(svgGroup, ELEMENT_CUSTOM_TYPE.SHAPE_GRAPH)
    })
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
      scaleX: width / 24,
      scaleY: height / 24,
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
