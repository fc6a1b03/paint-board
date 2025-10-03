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
    <div className="flex items-start mt-2">
      <div className="font-bold font-fredokaOne text-sm w-20 shrink-0 text-right">
        {t('title.imageFilters')}
      </div>
      <div className="flex flex-row flex-wrap w-44 items-center ml-2">
        {filtersCheckbox.map((item, index) => (
          <label key={index} className="cursor-pointer label inline-flex p-1">
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
    </div>
  )
}

export default ImageFilterConfig
