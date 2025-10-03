import _ from 'lodash'
import { useMemo, useState } from 'react'
import useDrawStore from '@/store/draw'
import { useTranslation } from 'react-i18next'
import { DrawStyle } from '@/constants/draw'

import AddColorIcon from '@/components/icons/addColor.svg?react'
import ClearIcon from '@/components/icons/clear.svg?react'
import EditIcon from '@/components/icons/edit.svg?react'

const DrawColorConfig = () => {
  const {
    drawStyle,
    drawColors,
    updateDrawColor,
    deleteDrawColor,
    updateCurrentDrawColor,
    currentDrawColor,
    currentMultiColor
  } = useDrawStore()
  const { t } = useTranslation()
  const [editColorIndex, setEditColorIndex] = useState(-1)

  const currentColorIndexList = useMemo(() => {
    return [DrawStyle.MultiColor, DrawStyle.Pixels, DrawStyle.Shape].includes(
      drawStyle
    )
      ? currentMultiColor
      : [currentDrawColor]
  }, [drawStyle, currentDrawColor, currentMultiColor])

  const handleDrawColor = _.debounce((color: string, colorIndex: number) => {
    updateDrawColor(color, colorIndex)
  }, 100)

  return (
    <div className="form-control mt-2">
      <div className="font-bold text-sm font-fredokaOne">
        {t('title.drawColor')}
      </div>
      <div className="mt-1 pb-1 flex items-center gap-x-2 w-full relative">
        {drawColors.map((drawColor, drawColorIndex) => (
          <div
            className={`relative w-6 h-6 transition-all duration-300 ${
              currentColorIndexList.includes(drawColorIndex) ? 'w-7' : ''
            }`}
            key={drawColor + drawColorIndex}
          >
            <div
              className={`absolute top-0 left-0 shrink-0 flex items-center justify-between w-6 bg-gray-200 overflow-hidden join hover:w-20 hover:z-10 transition-all duration-300 ring-offset-1 ${
                currentColorIndexList.includes(drawColorIndex)
                  ? 'ring-2 ring-primary mx-1'
                  : 'hover:ring-2 ring-base-200'
              }`}
            >
              <div
                className={`shrink-0 w-6 h-6 rounded-sm cursor-pointer join-item`}
                style={{ background: drawColor }}
                onClick={() => {
                  updateCurrentDrawColor(drawColorIndex)
                }}
              ></div>
              <label
                htmlFor="draw-color-input"
                onClick={() => {
                  setEditColorIndex(drawColorIndex)
                }}
              >
                <EditIcon
                  className={`shrink-0 w-5 h-5 cursor-pointer join-item hover:opacity-80`}
                />
              </label>
              <ClearIcon
                className={`shrink-0 w-4 h-4 mr-1 cursor-pointer join-item hover:opacity-80`}
                onClick={() => {
                  deleteDrawColor(drawColorIndex)
                }}
              />
            </div>
          </div>
        ))}
        {drawColors.length < 6 && (
          <AddColorIcon
            className="w-6 h-6 cursor-pointer hover:opacity-60"
            onClick={() => {
              updateDrawColor('#000000', drawColors.length)
            }}
          />
        )}
        <input
          id="draw-color-input"
          type="color"
          value={editColorIndex >= 0 ? drawColors[editColorIndex] : '#000000'}
          onChange={(e) => {
            if (editColorIndex >= 0) {
              handleDrawColor(e.target.value, editColorIndex)
            }
          }}
          className={`w-0 h-0 opacity-0 absolute top-7 left-${
            editColorIndex * 7
          }`}
        />
      </div>
    </div>
  )
}

export default DrawColorConfig
