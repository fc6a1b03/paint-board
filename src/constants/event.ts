import { ActionMode } from '.'
import { DrawStyle, DrawType } from './draw'

export enum KeyCode {
  SPACE = 'Space',
  BACKSPACE = 'Backspace',
  DIGIT_1 = 'Digit1',
  DIGIT_2 = 'Digit2',
  DIGIT_3 = 'Digit3',
  DIGIT_4 = 'Digit4',
  DIGIT_5 = 'Digit5',
  DIGIT_6 = 'Digit6',
  KEY_Q = 'KeyQ',
  KEY_W = 'KeyW',
  KEY_E = 'KeyE',
  KEY_R = 'KeyR',
  KEY_A = 'KeyA',
  KEY_S = 'KeyS',
  KEY_D = 'KeyD',
  KEY_F = 'KeyF',
  KEY_Z = 'KeyZ',
  KEY_X = 'KeyX',
  KEY_C = 'KeyC',
  KEY_V = 'KeyV',
  KEY_B = 'KeyB',
  BRACKET_LEFT = 'BracketLeft', // [
  BRACKET_RIGHT = 'BracketRight', // ]
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  EQUAL = 'Equal', // +
  MINUS = 'Minus', // -
  DIGIT_0 = 'Digit0', // digit 0
  NUMPAD_ADD = 'NumpadAdd', // numpad +
  NUMPAD_SUBTRACT = 'NumpadSubtract', // numpad -
  NUMPAD_0 = 'Numpad0' // numpad 0
}

export const KeyCodeModeMap = {
  [KeyCode.DIGIT_1]: ActionMode.DRAW,
  [KeyCode.DIGIT_2]: ActionMode.ERASE,
  [KeyCode.DIGIT_3]: ActionMode.SELECT,
  [KeyCode.DIGIT_4]: ActionMode.Board
}

export const KeyCodeDrawTypeMap = {
  [KeyCode.DIGIT_5]: DrawType.FreeStyle,
  [KeyCode.DIGIT_6]: DrawType.Shape
}

export const KeyCodeDrawStyleMap = {
  [KeyCode.KEY_Q]: DrawStyle.Basic,
  [KeyCode.KEY_W]: DrawStyle.Rainbow,
  [KeyCode.KEY_E]: DrawStyle.Shape,
  [KeyCode.KEY_A]: DrawStyle.Material,
  [KeyCode.KEY_S]: DrawStyle.Pixels,
  [KeyCode.KEY_D]: DrawStyle.MultiColor,
  [KeyCode.KEY_Z]: DrawStyle.Text,
  [KeyCode.KEY_X]: DrawStyle.MultiLine,
  [KeyCode.KEY_C]: DrawStyle.Reticulate,
  [KeyCode.KEY_R]: DrawStyle.MultiPoint,
  [KeyCode.KEY_F]: DrawStyle.Wiggle,
  [KeyCode.KEY_V]: DrawStyle.Thorn
}
