import useDrawStore from '@/store/draw'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'

const fontFamilyRadio: Record<string, string> = {
  georgia: 'Georgia',
  fredokaOne: 'Fredoka One',
  hanaleiFill: 'Hanalei Fill',
  ruslanDisplay: 'Ruslan Display',
  lobster: 'Lobster',
  pacifico: 'Pacifico',
  gloriaHallelujah: 'Gloria Hallelujah'
}

interface IProps {
  fontFamily?: string
  layoutType?: string
  updateFontFamily?: (fontFamily: string) => void
}

const FontFamilyConfg: FC<IProps> = ({
  fontFamily,
  updateFontFamily,
  layoutType = 'horizontal'
}) => {
  const { textFontFamily, updateTextFontFamily } = useDrawStore()
  const { t } = useTranslation()

  return (
    <div
      className={`mt-2 ${
        layoutType === 'horizontal' ? 'flex items-start' : ''
      }`}
    >
      <div
        className={`font-bold text-sm font-fredokaOne ${
          layoutType === 'horizontal' ? 'w-20 text-right shrink-0' : ''
        }`}
      >
        {t('title.fontFamily')}
      </div>
      <div>
        {Object.keys(fontFamilyRadio).map((key) => (
          <label
            className={`flex justify-between items-center mt-1 w-full cursor-pointer ${
              layoutType === 'horizontal' ? 'first:mt-0 ml-3' : ''
            }`}
            key={key}
          >
            <div
              style={{
                fontFamily: `${fontFamilyRadio[key]}`
              }}
              className="text-xs"
            >
              {fontFamilyRadio[key]}
            </div>
            <input
              type="radio"
              name="radio-5"
              className="radio radio-success radio-xs"
              checked={(fontFamily || textFontFamily) === fontFamilyRadio[key]}
              onChange={() => {
                updateTextFontFamily(fontFamilyRadio[key])
                updateFontFamily?.(fontFamilyRadio[key])
              }}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default FontFamilyConfg
