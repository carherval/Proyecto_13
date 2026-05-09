import Swal from 'sweetalert2'

const LOADING_MSG = 'Cargando...'
const DIALOG_LABELS = { accept: 'Aceptar', cancel: 'Cancelar' }

// "Custom hook" para los diálogos emergentes
const useDialog = () => {
  const showLoadingDialog = (title = LOADING_MSG) =>
    Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading()
    })

  // Las acciones a realizar después de aceptar o cancelar el mensaje son opcionales
  const showAlertDialog = (title, doActions = () => {}) =>
    Swal.fire({ title, confirmButtonText: DIALOG_LABELS.accept }).then(
      (result) => (result.isConfirmed || result.isDismissed) && doActions()
    )

  const showConfirmDialog = (title, doActions) =>
    Swal.fire({
      title,
      confirmButtonText: DIALOG_LABELS.accept,
      showCancelButton: true,
      cancelButtonText: DIALOG_LABELS.cancel
    }).then((result) => result.isConfirmed && doActions())

  const closeDialog = () => Swal.close()

  return { showLoadingDialog, showAlertDialog, showConfirmDialog, closeDialog }
}

export default useDialog
