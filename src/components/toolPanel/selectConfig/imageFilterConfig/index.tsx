import { paintBoard } from '@/core/paintBoard'
import { filtersCheckbox } from './constant'
import { renderImageFilters } from '@/core/element/image'
import { useTranslation } from 'react-i18next'

const ImageFilterConfig = () => {
  const { t } = useTranslation()

  // update current image filters
  const updateImageFilters = (filter: string) => {
    const image = paintBoard.canvas?.getActiveObject() as fabric.Image
    renderImageFilters(image, filter)
    paintBoard.render()
    paintBoard.triggerHook()
  }

  const filters =
    (paintBoard.canvas?.getActiveObject() as fabric.Image)?.filters?.map(
      (item: any) => item?.type ?? ''
    ) ?? []

  return (
    <>
      <div className="font-bold font-fredokaOne mt-3 text-sm">
        {t('title.imageFilters')}
      </div>
      <div className="flex flex-row flex-wrap w-52 items-center justify-between">
        {filtersCheckbox.map((item, index) => (
          <label key={index} className="cursor-pointer label inline-flex">
            <span className="label-text mr-2 text-xs">{t(item.text)}</span>
            <input
              type="checkbox"
              checked={filters.includes(item.type)}
              onChange={() => updateImageFilters(item.type)}
              className="checkbox checkbox-xs checkbox-success"
            />
          </label>
        ))}
      </div>
    </>
  )
}

export default ImageFilterConfig
