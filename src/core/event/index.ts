import { CanvasMouseEvent } from './mouseEvent'
import { ObjectEvent } from './objectEvent'
import { CanvasTouchEvent } from './touchEvent'
import { CanvasZoomEvent } from './zoomEvent'
import { WindowEvent } from './windowEvent'

export class EventModule {
  mouseEvent: CanvasMouseEvent
  zoomEvent: CanvasZoomEvent
  objectEvent: ObjectEvent
  windowEvent: WindowEvent
  touchEvent: CanvasTouchEvent

  constructor() {
    const mouseEvent = new CanvasMouseEvent()
    this.mouseEvent = mouseEvent

    const zoomEvent = new CanvasZoomEvent()
    this.zoomEvent = zoomEvent

    const objectEvent = new ObjectEvent()
    this.objectEvent = objectEvent

    const windowEvent = new WindowEvent()
    this.windowEvent = windowEvent

    const touchEvent = new CanvasTouchEvent()
    this.touchEvent = touchEvent
  }

  removeEvent() {
    this.windowEvent.removeWindowEvents()
    this.touchEvent.removeTouchEvents()
  }
}
