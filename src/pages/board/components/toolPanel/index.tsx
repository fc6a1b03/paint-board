import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { CANVAS_ELE_TYPE, CommonWidth } from '@/utils/constants'
import { PaintBoard } from '@/utils/paintBoard'
import { FreeDrawStyle } from '@/utils/element/freeDraw'
import Layer from '../layer'
import UndoIcon from '@/components/icons/undo'
import RedoIcon from '@/components/icons/redo'
import SaveIcon from '@/components/icons/save'
import CleanIcon from '@/components/icons/clean'

import styles from './index.module.css'

interface IProps {
  board: PaintBoard | undefined // 画板
  toolType: string // 操作类型
  setToolType: (type: string) => void // 修改操作类型
}

let toastTimeout: NodeJS.Timeout | null = null

/**
 * 操作面板
 */
const ToolPanel: React.FC<IProps> = ({ board, toolType, setToolType }) => {
  // 刷新操作栏
  const [, setRefresh] = useState(0)
  const [toastState, setToastState] = useState(false)
  const [showPanel, setShowPanel] = useState(true)
  // 颜色输入框(目前是只读数据)
  const colorInput = useMemo(() => {
    if (board?.currentLineColor) {
      return board.currentLineColor.split('#')[1] || ''
    }
    return ''
  }, [board?.currentLineColor])

  // 改变画笔颜色
  const changeLineColor = (color: string) => {
    if (board) {
      board.setFreeDrawColor(color)
      setRefresh((v) => v + 1)
    }
  }

  const copyColor = () => {
    const inputElement = document.querySelector(
      '#colorInput'
    ) as HTMLInputElement
    inputElement.select()
    document.execCommand('copy')
    setToastState(true)
    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }
    toastTimeout = setTimeout(() => {
      setToastState(false)
    }, 2000)
  }

  // 点击后退
  const undo = () => {
    if (board) {
      board.undo()
    }
  }

  // 点击前进
  const redo = () => {
    if (board) {
      board.redo()
    }
  }

  // 清除画布
  const clean = () => {
    if (board) {
      board.clean()
    }
  }

  // 保存图片
  const saveImage = () => {
    if (board) {
      board.saveImage()
    }
  }

  // 改变宽度
  const setWidth = (w: number) => {
    if (board) {
      switch (toolType) {
        case CANVAS_ELE_TYPE.FREE_DRAW:
          board.setFreeDrawWidth(w)
          break
        case CANVAS_ELE_TYPE.ERASER:
          board.setCleanWidth(w)
          break
        default:
          break
      }
      setRefresh((v) => v + 1)
    }
  }

  const setFreeDrawStyle = (mode: FreeDrawStyle) => {
    if (board) {
      board.setFreeDrawStyle(mode)
      setRefresh((v) => v + 1)
    }
  }

  const changeShowPanel = () => {
    setShowPanel((v) => !v)
  }

  return (
    <>
      <div
        className={`fixed top-5 left-5 flex flex-col card shadow-xl overflow-visible ${
          showPanel ? 'p-5' : ''
        }`}
        style={{ backgroundColor: '#EEF1FF' }}
      >
        <label className="btn btn-circle swap swap-rotate absolute -top-4 -left-4 h-8 w-8 min-h-0">
          <input type="checkbox" onChange={() => changeShowPanel()} />
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        {showPanel && (
          <>
            {/* 类型切换 */}
            <div className="btn-group">
              <button
                className={`btn flex-grow ${
                  toolType === CANVAS_ELE_TYPE.FREE_DRAW ? 'btn-active' : ''
                }`}
                onClick={() => setToolType(CANVAS_ELE_TYPE.FREE_DRAW)}
              >
                画笔
              </button>
              <button
                className={`btn flex-grow ${
                  toolType === CANVAS_ELE_TYPE.ERASER ? 'btn-active' : ''
                }`}
                onClick={() => setToolType(CANVAS_ELE_TYPE.ERASER)}
              >
                橡皮擦
              </button>
              <button
                className={`btn flex-grow ${
                  toolType === CANVAS_ELE_TYPE.SELECT ? 'btn-active' : ''
                }`}
                onClick={() => setToolType(CANVAS_ELE_TYPE.SELECT)}
              >
                选择
              </button>
            </div>
            {/* 宽度设置 */}
            {(toolType === CANVAS_ELE_TYPE.FREE_DRAW ||
              toolType === CANVAS_ELE_TYPE.ERASER) && (
              <div className="mt-3">
                <div className="font-bold">Width</div>
                <div className="btn-group mt-1">
                  {Object.values(CommonWidth).map((w) => (
                    <button
                      key={w}
                      className={classNames({
                        btn: true,
                        'flex-grow': true,
                        'btn-active':
                          toolType === CANVAS_ELE_TYPE.FREE_DRAW
                            ? board?.currentLineWidth === w
                            : board?.cleanWidth === w
                      })}
                      onClick={() => setWidth(w)}
                    >
                      <div
                        className="rounded-2xl bg-black"
                        style={{
                          height: `${w / 2}px`,
                          width: '30px'
                        }}
                        key={w}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* 颜色设置 */}
            {toolType === CANVAS_ELE_TYPE.FREE_DRAW && (
              <div className="form-control mt-3">
                <div className="font-bold">Color</div>
                <div className="mt-1 flex items-center justify-center w-full">
                  <div className="w-8 h-8 mr-2 tooltip" data-tip="画笔颜色">
                    <input
                      type="color"
                      value={`#${colorInput}`}
                      onChange={(e) => {
                        changeLineColor(e.target.value)
                      }}
                      className={styles.lineColor}
                    />
                  </div>

                  <label className="input-group">
                    <span className="font-bold bg-primary">#</span>
                    <input
                      onClick={copyColor}
                      value={colorInput}
                      id="colorInput"
                      className="input input-bordered input-sm w-40 max-w-xs focus:outline-none cursor-pointer"
                      readOnly
                    />
                  </label>
                </div>
              </div>
            )}
            {toolType === CANVAS_ELE_TYPE.FREE_DRAW && (
              <div className="mt-3">
                <div className="font-bold">Style</div>
                <div className="btn-group">
                  <button
                    className={`btn btn-sm flex-grow ${
                      board?.currentFreeDrawStyle === FreeDrawStyle.Basic
                        ? 'btn-active'
                        : ''
                    }`}
                    onClick={() => setFreeDrawStyle(FreeDrawStyle.Basic)}
                  >
                    基础
                  </button>
                  <button
                    className={`btn btn-sm flex-grow ${
                      board?.currentFreeDrawStyle === FreeDrawStyle.Shadow
                        ? 'btn-active'
                        : ''
                    }`}
                    onClick={() => setFreeDrawStyle(FreeDrawStyle.Shadow)}
                  >
                    荧光
                  </button>
                  <button
                    className={`btn btn-sm flex-grow ${
                      board?.currentFreeDrawStyle === FreeDrawStyle.DoubleColor
                        ? 'btn-active'
                        : ''
                    }`}
                    onClick={() => setFreeDrawStyle(FreeDrawStyle.DoubleColor)}
                  >
                    双色
                  </button>
                  <button
                    className={`btn btn-sm flex-grow ${
                      board?.currentFreeDrawStyle === FreeDrawStyle.Spray
                        ? 'btn-active'
                        : ''
                    }`}
                    onClick={() => setFreeDrawStyle(FreeDrawStyle.Spray)}
                  >
                    喷雾
                  </button>
                </div>
                {/* <div className="btn-group">
                  <button
                    className={`btn btn-sm ${
                      board?.currentFreeDrawStyle === FreeDrawStyle.Bubble
                        ? 'btn-active'
                        : ''
                    }`}
                    onClick={() => setFreeDrawStyle(FreeDrawStyle.Bubble)}
                  >
                    泡泡
                  </button>
                  <button
                    className={`btn btn-sm ${
                      board?.currentFreeDrawStyle === FreeDrawStyle.Spray
                        ? 'btn-active'
                        : ''
                    }`}
                    onClick={() => setFreeDrawStyle(FreeDrawStyle.Spray)}
                  >
                    喷雾
                  </button>
                </div> */}
              </div>
            )}
            {/* 操作画板 */}
            <div className="mt-3">
              <div className="font-bold">Tool</div>
              <ul className="menu menu-horizontal bg-base-100 rounded-box justify-between mt-1">
                <li>
                  <a onClick={undo}>
                    <div className="tooltip" data-tip="后退">
                      <UndoIcon />
                    </div>
                  </a>
                </li>
                <li>
                  <a onClick={redo}>
                    <div className="tooltip" data-tip="前进">
                      <RedoIcon />
                    </div>
                  </a>
                </li>
                <li>
                  <a onClick={clean}>
                    <div className="tooltip" data-tip="清除画布">
                      <CleanIcon />
                    </div>
                  </a>
                </li>
                <li>
                  <a onClick={saveImage}>
                    <div className="tooltip" data-tip="导出为图片">
                      <SaveIcon />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            {/* 图层设置 */}
            <Layer board={board} refresh={() => setRefresh((v) => v + 1)} />
          </>
        )}
      </div>
      {toastState && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <div>
              <span className="whitespace-nowrap">Copy successfully.</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ToolPanel
