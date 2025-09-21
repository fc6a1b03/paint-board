import useShapeStore from '@/store/shape'
import { shapeStyleSwitch } from './constant'
import { useTranslation } from 'react-i18next'

const ShapeStyleConfig = () => {
  const { shapeStyle, updateShapeStyle } = useShapeStore()
  const { t } = useTranslation()

  return (
    <div className="mt-3">
      <div className="font-bold text-sm font-fredokaOne">
        {t('title.shapeType')}
      </div>
      {Object.keys(shapeStyleSwitch).map((lineKey) => (
        <div key={lineKey} className="join mt-1 flex">
          {shapeStyleSwitch[lineKey].map(({ type, icon: Icon }) => (
            <button
              key={type}
              className={`join-item btn btn-xs flex-grow text-[#eef1ff] ${
                shapeStyle === type ? 'btn-primary' : 'btn-neutral'
              }`}
              onClick={() => {
                updateShapeStyle(type)
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ShapeStyleConfig
