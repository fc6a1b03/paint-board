import { cameraFilters } from './cameraFilters'
import { applyBasicAdjustments } from './adjustments'
import useCameraStore from '@/store/camera'

export let CameraImageData: string | null = null

export class RenderLoop {
  video: HTMLVideoElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  animationId: number | null = null
  isRunning = false

  constructor(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.video = video
    this.canvas = canvas
    this.ctx = ctx
    this.start()
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.render()
  }

  render() {
    if (!this.isRunning) return
    this.renderCameraFrame()
    this.animationId = requestAnimationFrame(this.render.bind(this))
  }

  stop() {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  renderCameraFrame(): void {
    const { video, canvas, ctx } = this

    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.save()

    // horizontal flip canvas (fix mirror problem)
    ctx.scale(-1, 1)
    ctx.translate(-canvas.width, 0)

    // draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    ctx.restore()

    // get image data
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const { cameraFilter } = useCameraStore.getState()

    // apply filter
    const filterFunction = cameraFilters[cameraFilter]
    if (filterFunction) {
      imageData = filterFunction(imageData)
    }

    // apply basic adjustments
    imageData = applyBasicAdjustments(imageData)

    // put image data back to canvas
    ctx.putImageData(imageData, 0, 0)
    CameraImageData = canvas.toDataURL()
  }
}
