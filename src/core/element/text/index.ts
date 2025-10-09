import { fabric } from 'fabric'
import { isUndefined } from 'lodash'
import { paintBoard } from '../../paintBoard'

import { FontStyle } from '@/constants/font'
import { ActionMode } from '@/constants'

import useDrawStore from '@/store/draw'
import useBoardStore from '@/store/board'

export class TextElement {
  text: fabric.IText | null = null
  isTextEditing = false

  loadText({ x, y, text }: { x?: number; y?: number; text?: string }) {
    const canvas = paintBoard?.canvas
    if (canvas) {
      // Creating editable text input
      const viewportCenter = canvas.getVpCenter()
      const { fontStyles, drawColors, textFontFamily } = useDrawStore.getState()

      const boardCenter = isUndefined(x) && isUndefined(y)

      const textObj = new fabric.IText(text || 'Type here...', {
        originX: boardCenter ? 'center' : 'left',
        originY: boardCenter ? 'center' : 'top',
        left: boardCenter ? viewportCenter.x : x,
        top: boardCenter ? viewportCenter.y : y,
        fill: drawColors[0],
        fontSize: 25 / (canvas?.getZoom() ?? 1),
        fontFamily: textFontFamily,
        fontWeight: fontStyles.includes(FontStyle.BOLD) ? 'bold' : 'normal',
        fontStyle: fontStyles.includes(FontStyle.ITALIC) ? 'italic' : 'normal',
        underline: fontStyles.includes(FontStyle.UNDER_LINE),
        linethrough: fontStyles.includes(FontStyle.LINE_THROUGH)
      })
      this.text = textObj
      canvas.add(textObj)
      useBoardStore.getState().updateMode(ActionMode.SELECT)
      canvas.setActiveObject(textObj)

      textObj.enterEditing() // Enters editing state
      textObj.selectAll() // Selects entire text
      canvas.requestRenderAll()
    }
  }

  resetText() {
    if (this?.text) {
      this.text.exitEditing()
      this.text = null
    }
  }
}
