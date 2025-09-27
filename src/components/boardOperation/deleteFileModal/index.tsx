import useFileStore from '@/store/files'
import { useTranslation } from 'react-i18next'

interface IProps {
  fileId: string
}

const DeleteFileModal: React.FC<IProps> = ({ fileId }) => {
  const { t } = useTranslation()
  const { files, deleteFile } = useFileStore()

  const deleteCurrentFile = () => {
    if (files.length > 1) {
      deleteFile(fileId)
    }
  }

  return (
    <>
      <input type="checkbox" id="delete-file-modal" className="modal-toggle" />
      <label htmlFor="delete-file-modal" className="modal cursor-pointer">
        <label
          className="modal-box relative flex flex-col justify-center items-center"
          htmlFor=""
        >
          <h3 className="text-lg font-bold text-center">
            {t('deleteFileModal.title')}
          </h3>
          <div className="w-64 flex justify-between mt-10">
            <label
              htmlFor="delete-file-modal"
              className="btn btn-active btn-primary btn-sm w-2/5"
              onClick={deleteCurrentFile}
            >
              {t('confirm')}
            </label>
            <label
              htmlFor="delete-file-modal"
              className="btn btn-active btn-ghost btn-sm w-2/5"
            >
              {t('cancel')}
            </label>
          </div>
        </label>
      </label>
    </>
  )
}

export default DeleteFileModal
