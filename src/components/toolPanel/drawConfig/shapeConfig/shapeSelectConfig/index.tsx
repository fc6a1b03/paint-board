import React, { useState } from 'react'
import useShapeStore from '@/store/shape'
import { useTranslation } from 'react-i18next'

import * as LucideIcons from 'lucide-react'
import { SHAPE_ELEMENT_CUSTOM_TYPE } from '@/constants'

const DEFAULT_SHAPE_ICON = [
  {
    type: SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE,
    iconName: 'Minus'
  },
  {
    type: SHAPE_ELEMENT_CUSTOM_TYPE.SHAPE_ARROW_LINE,
    iconName: 'ArrowDownUp'
  }
]

const ShapeSelectConfig = () => {
  const {
    currentShapeIcon,
    shapeIconList,
    addShapeIcon,
    updateCurrentShapeIcon,
    deleteShapeIcon
  } = useShapeStore()
  const { t } = useTranslation()
  const [iconName, setIconName] = useState('')
  const [tipMessage, setTipMessage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null)

  // Convert icon names in different formats to PascalCase
  const convertToPascalCase = (name: string): string => {
    // kebab-case -> PascalCase
    if (name.includes('-')) {
      return name
        .split('-')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('')
    }

    // camelCase -> PascalCase
    if (name.charAt(0) === name.charAt(0).toLowerCase()) {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return name
  }

  const validateAndLoadIcon = () => {
    if (!iconName.trim()) {
      setTipMessage(t('graphInput.graphInputTip') as string)
      return
    }

    // Convert to PascalCase format
    const pascalCaseName = convertToPascalCase(iconName.trim())

    // Check if the icon exists in lucide-react
    const IconComponent = (LucideIcons as any)[pascalCaseName]

    // Check if it is a valid React component
    if (IconComponent) {
      addShapeIcon(pascalCaseName)
      setTipMessage(t('graphInput.addSuccess') as string)
    } else {
      setTipMessage(
        t('graphInput.addFailed', { Name: pascalCaseName }) as string
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndLoadIcon()
    }
  }

  // Drag start
  const handleDragStart = (e: React.DragEvent, icon: string) => {
    setIsDragging(true)
    setDraggedIcon(icon)
    e.dataTransfer.setData('text/plain', icon)
  }

  // Drag end
  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedIcon(null)
  }

  const handleDeleteDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDeleteDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const icon = e.dataTransfer.getData('text/plain')
    if (icon && draggedIcon) {
      deleteShapeIcon(icon)
      setTipMessage(t('graphInput.deleteTip') as string)
    }
    setIsDragging(false)
    setDraggedIcon(null)
  }

  return (
    <div className="mt-3">
      <div className="font-bold text-sm font-fredokaOne flex items-center">
        {t('title.graphSelect')}
        <a
          className="ml-1 tooltip cursor-pointer before:w-32"
          data-tip={t('graphInput.titleTip')}
          href="https://lucide.dev/icons/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LucideIcons.CircleQuestionMark size={16} />
        </a>
      </div>
      <div className="join w-full mt-2">
        <input
          type="text"
          placeholder={t('graphInput.graphInputTip') as string}
          className={`input input-bordered input-sm join-item flex-1 outline-none`}
          value={iconName}
          onChange={(e) => {
            setTipMessage('')
            setIconName(e.target.value)
          }}
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn btn-primary btn-sm join-item"
          onClick={validateAndLoadIcon}
        >
          {t('graphInput.add')}
        </button>
      </div>

      {/* operation tips */}
      {tipMessage && (
        <div className="flex items-center gap-x-1 mt-2">
          <LucideIcons.Info size={16} />
          <span className="text-sm">{tipMessage}</span>
        </div>
      )}

      <div className="mt-2 bg-slate-50 shadow-inner shadow-slate-200 p-2 rounded-lg relative">
        <div className="flex flex-wrap w-64 gap-1 max-h-32 overflow-y-auto">
          {DEFAULT_SHAPE_ICON.map(({ type, iconName }) => {
            const IconComponent = (LucideIcons as any)[iconName]
            return IconComponent ? (
              <div
                key={type}
                className={`flex items-center justify-center rounded-md p-1 cursor-pointer ${
                  currentShapeIcon === type ? 'bg-primary' : 'hover:bg-base-200'
                }`}
                onClick={() => {
                  updateCurrentShapeIcon(type)
                }}
              >
                <IconComponent
                  size={20}
                  color={currentShapeIcon === type ? '#fff' : '#000'}
                />
              </div>
            ) : null
          })}
          {shapeIconList.map((icon) => {
            const IconComponent = (LucideIcons as any)[icon]
            return IconComponent ? (
              <div
                key={icon}
                draggable={currentShapeIcon !== icon}
                className={`flex items-center justify-center rounded-md p-1 cursor-pointer transition-opacity ${
                  currentShapeIcon === icon ? 'bg-primary' : 'hover:bg-base-200'
                } ${draggedIcon === icon ? 'opacity-50' : ''}`}
                onClick={() => {
                  updateCurrentShapeIcon(icon)
                }}
                onDragStart={(e) => handleDragStart(e, icon)}
                onDragEnd={handleDragEnd}
              >
                <IconComponent
                  size={20}
                  color={currentShapeIcon === icon ? '#fff' : '#000'}
                  className="pointer-events-none"
                />
              </div>
            ) : null
          })}
        </div>

        {/* delete area - only show when dragging */}
        {isDragging && (
          <div
            className="absolute bottom-2 right-2 w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse transition-all duration-200 hover:bg-red-600 hover:scale-110"
            onDragOver={handleDeleteDragOver}
            onDrop={handleDeleteDrop}
          >
            <LucideIcons.Trash2 size={16} color="#fff" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ShapeSelectConfig
