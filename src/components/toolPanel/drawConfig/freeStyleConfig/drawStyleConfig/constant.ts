import { DrawStyle } from '@/constants/draw'

interface StyleSwitchType {
  type: string
  text: string
  keyboard: string
}

export const styleSwitch: Record<string, Array<StyleSwitchType>> = {
  line_1: [
    {
      type: DrawStyle.Basic,
      text: 'style.basic',
      keyboard: 'Q'
    },
    {
      type: DrawStyle.Rainbow,
      text: 'style.rainbow',
      keyboard: 'W'
    },
    {
      type: DrawStyle.Shape,
      text: 'style.shape',
      keyboard: 'E'
    }
  ],
  line_2: [
    {
      type: DrawStyle.Material,
      text: 'style.material',
      keyboard: 'A'
    },
    {
      type: DrawStyle.Pixels,
      text: 'style.pixels',
      keyboard: 'S'
    },
    {
      type: DrawStyle.MultiColor,
      text: 'style.multiColor',
      keyboard: 'D'
    }
  ],
  line_3: [
    {
      type: DrawStyle.Text,
      text: 'style.text',
      keyboard: 'Z'
    },
    {
      type: DrawStyle.MultiLine,
      text: 'style.multiLine',
      keyboard: 'X'
    },
    {
      type: DrawStyle.Reticulate,
      text: 'style.reticulate',
      keyboard: 'C'
    }
  ],
  line_4: [
    {
      type: DrawStyle.MultiPoint,
      text: 'style.multiPoint',
      keyboard: 'R'
    },
    {
      type: DrawStyle.Wiggle,
      text: 'style.wiggle',
      keyboard: 'F'
    },
    {
      type: DrawStyle.Thorn,
      text: 'style.thorn',
      keyboard: 'V'
    }
  ]
}
