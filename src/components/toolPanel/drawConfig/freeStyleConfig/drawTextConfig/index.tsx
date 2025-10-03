import useDrawStore from '@/store/draw'
import { useTranslation } from 'react-i18next'

const DrawTextConfig = () => {
  const { t } = useTranslation()
  const { drawTextValue, updateDrawTextValue } = useDrawStore()

  return (
    <div className="mt-2">
      <div className="font-bold text-sm font-fredokaOne">
        {t('title.drawText')}
      </div>
      <input
        value={drawTextValue}
        className="input input-bordered input-sm mt-1 w-full"
        onInput={(e) =>
          updateDrawTextValue((e.target as HTMLInputElement).value)
        }
      />
    </div>
  )
}

export default DrawTextConfig
