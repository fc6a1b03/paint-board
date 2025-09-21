import useDrawStore from '@/store/draw'
import { useTranslation } from 'react-i18next'
import { styleSwitch } from './constant'

const DrawStyleConfig = () => {
  const { t } = useTranslation()
  const { drawStyle, updateDrawStyle } = useDrawStore()

  return (
    <div className="mt-2">
      <div className="font-bold text-sm font-fredokaOne">
        {t('title.drawStyle')}
      </div>
      {Object.keys(styleSwitch).map((lineKey) => (
        <div key={lineKey} className="join mt-1 flex">
          {styleSwitch[lineKey].map(({ type, text }) => (
            <button
              key={type}
              className={`join-item btn btn-xs flex-grow font-fredokaOne text-xs font-normal ${
                drawStyle === type ? 'btn-primary font-semibold' : 'btn-neutral'
              }`}
              onClick={() => updateDrawStyle(type)}
            >
              {t(text)}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DrawStyleConfig
