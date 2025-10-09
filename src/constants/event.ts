import { ActionMode } from '.'

export enum KeyCode {
  SPACE = 'Space',
  BACKSPACE = 'Backspace',
  DIGIT_1 = 'Digit1',
  DIGIT_2 = 'Digit2',
  DIGIT_3 = 'Digit3',
  DIGIT_4 = 'Digit4',
  KEY_A = 'KeyA',
  KEY_C = 'KeyC',
  KEY_D = 'KeyD',
  KEY_V = 'KeyV',
  KEY_Z = 'KeyZ',
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
