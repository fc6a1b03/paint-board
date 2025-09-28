import { KeyCodeModeMap } from '@/constants/event'
import useBoardStore from '@/store/board'

/**
 * Mode switching handler
 * Handles tool mode switching and deletion operations
 */
export class ModeHandler {
  /**
   * Switch tool mode based on number key
   */
  switchMode(keyCode: string) {
    const mode = KeyCodeModeMap[keyCode as keyof typeof KeyCodeModeMap]
    if (mode) {
      useBoardStore.getState().updateMode(mode)
    }
  }
}
