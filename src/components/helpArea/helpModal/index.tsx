import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useBoardStore from '@/store/board'
import { languageList } from './constants'

import { Github, BookText, Film, Keyboard } from 'lucide-react'
import TranslateIcon from '@/components/icons/translate.svg?react'
import Shortcut from '../shortcut'
import Features from '../features'

const HelpModal = () => {
  const { t, i18n } = useTranslation()
  const { language, updateLanguage } = useBoardStore()
  const [activeTab, setActiveTab] = useState<'shortcut' | 'featureIntro'>(
    'shortcut'
  )

  const handleChangLang = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
    updateLanguage(newLanguage)
  }

  const handleTabChange = (tab: 'shortcut' | 'featureIntro') => {
    setActiveTab(tab)
  }

  return (
    <dialog id="help-modal" className="modal">
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <div className="modal-box w-[90vw] max-w-[800px] h-[90vh] max-h-[800px] overflow-auto">
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap mb-10">
          <a
            href="https://github.com/LHRUN/paint-board"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2  py-2 px-3 rounded-md bg-[#eef1ff95] cursor-pointer hover:bg-[#eef1ff]"
          >
            <Github size={20} />
            <span>{t('helpInfo.openSourceRepo')}</span>
          </a>
          <a
            href="https://space.bilibili.com/317136468/lists/2495018?type=season"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2  py-2 px-3 rounded-md bg-[#eef1ff95] cursor-pointer hover:bg-[#eef1ff]"
          >
            <Film size={20} />
            <span>bilibili</span>
          </a>

          <div className="dropdown dropdown-bottom dropdown-end ml-auto">
            <div tabIndex={0} role="button">
              <TranslateIcon className="w-8 h-8 p-1 rounded-md cursor-pointer bg-[#66CC8960] hover:bg-[#66CC8980]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-compact shadow bg-base-100 rounded-box w-40 z-[11]"
            >
              {languageList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => handleChangLang(item.value)}
                >
                  <a className={`${item.value === language ? 'active' : ''}`}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          role="tablist"
          className="tabs tabs-bordered tabs-lg sticky -top-6 bg-white z-10"
        >
          <a
            role="tab"
            className={`tab ${activeTab === 'shortcut' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('shortcut')}
          >
            <Keyboard size={20} className="mr-2" />
            {t('helpInfo.shortcuts')}
          </a>
          <a
            role="tab"
            className={`tab ${
              activeTab === 'featureIntro' ? 'tab-active' : ''
            }`}
            onClick={() => handleTabChange('featureIntro')}
          >
            <BookText size={20} className="mr-2" />
            {t('helpInfo.featureIntro')}
          </a>
        </div>

        {activeTab === 'shortcut' && <Shortcut />}
        {activeTab === 'featureIntro' && <Features />}
      </div>
    </dialog>
  )
}

export default HelpModal
