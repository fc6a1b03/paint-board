import useShapeStore from '@/store/shape'
import { useTranslation } from 'react-i18next'
import { drawLineTypeSwitch } from '@/constants/drawLineType'
import { FC } from 'react'

interface IProps {
  strokeStyle?: string
  updateStrokeStyle?: (strokeStyle: string) => void
}

const StrokeStyleConfig: FC<IProps> = (props) => {
  const { strokeStyle, updateStrokeStyle } = useShapeStore()
  const { t } = useTranslation()

  return (
    <div className="mt-3">
      <div className="font-bold text-sm font-fredokaOne">
        {t('title.strokeStyle')}
      </div>
      {Object.keys(drawLineTypeSwitch).map((lineKey) => (
        <div key={lineKey} className="join mt-1 flex">
          {drawLineTypeSwitch[lineKey].map(({ type, icon }) => (
            <button
              key={type}
              className={`join-item btn btn-xs flex-grow ${
                (props.strokeStyle || strokeStyle) === type
                  ? 'btn-primary'
                  : 'btn-neutral'
              }`}
              onClick={() => {
                updateStrokeStyle(type)
                props?.updateStrokeStyle?.(type)
              }}
            >
              {icon({})}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default StrokeStyleConfig
