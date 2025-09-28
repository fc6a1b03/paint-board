import { v4 as uuidv4 } from 'uuid'
import { paintBoard } from '../paintBoard'
import { fabric } from 'fabric'

export const initCustomObjectAttr = (obj: fabric.Object, type: string) => {
  const id = uuidv4()
  obj.set({
    id,
    _customType: type
  } as any)
}

export const cloneObjects = (objects: fabric.Object[]) => {
  const canvas = paintBoard.canvas
  if (!canvas) {
    return
  }

  // clear the current selection
  canvas.discardActiveObject()

  const offsetX = 20
  const offsetY = 20

  const copys = objects.map((object) => {
    return new Promise<fabric.Object>((resolve) => {
      object?.clone((cloned: fabric.Object) => {
        const id = uuidv4()
        cloned.set({
          left: (cloned?.left || 0) + offsetX,
          top: (cloned?.top || 0) + offsetY,
          evented: true,
          id,
          perPixelTargetFind: true
        })
        resolve(cloned)
        canvas.add(cloned)
      })
    })
  })
  Promise.all(copys).then((objs) => {
    const activeSelection = new fabric.ActiveSelection(objs, {
      canvas: canvas
    })
    canvas.setActiveObject(activeSelection)
    paintBoard.render()
  })
}
