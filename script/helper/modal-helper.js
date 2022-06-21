import { config } from '../config/config.js';

const showElement = (elementId = '', hideClass = '') => {
  document.getElementById(elementId).classList.remove(hideClass);
};

const hideElement = (elementId = '', hideClass = '') => {
  document.getElementById(elementId).classList.add(hideClass);
};

const removeEditModalRelatedEventListener = (
  modalBackdropClickHandler = () => {},
  editModalClickHandler = (e = new Event()) => {},
  editModalSubmitHandler = (e = new Event()) => {},
  editModalCancelBtnClickHandler = () => {}
) => {
  const modalBackdrop = document.getElementById(config.modal.backdrop.id);
  const editModal = document.getElementById(config.modal.edit.id);
  const editBookForm = document.getElementById(config.modal.edit.form.id);
  const editCancelBtn = document.getElementById(
    config.modal.edit.form.cancelBtn.id
  );

  modalBackdrop.removeEventListener('click', modalBackdropClickHandler);
  editModal.removeEventListener('click', editModalClickHandler);
  editBookForm.removeEventListener('submit', editModalSubmitHandler);
  editCancelBtn.removeEventListener('click', editModalCancelBtnClickHandler);

  // console.log('Remove edit modal event listener');
};

const removeDeleteModalRelatedEventListener = (
  deleteBackdropClickHandler = () => {},
  deleteModalClickHandler = (e = new Event()) => {},
  deleteModalApproveBtnClickHandler = () => {},
  deleteModalCancelBtnClickHandler = () => {}
) => {
  const modalBackdrop = document.getElementById(config.modal.backdrop.id);
  const deleteModal = document.getElementById(config.modal.delete.id);
  const deleteCancelBtn = document.getElementById(
    config.modal.delete.action.cancel.id
  );
  const deleteApproveBtn = document.getElementById(
    config.modal.delete.action.approve.id
  );

  modalBackdrop.removeEventListener('click', deleteBackdropClickHandler);
  deleteModal.removeEventListener('click', deleteModalClickHandler);
  deleteCancelBtn.removeEventListener(
    'click',
    deleteModalCancelBtnClickHandler
  );
  deleteApproveBtn.removeEventListener(
    'click',
    deleteModalApproveBtnClickHandler
  );

  // console.log('Remove delete modal event listener!');
};

export {
  showElement,
  hideElement,
  removeEditModalRelatedEventListener,
  removeDeleteModalRelatedEventListener,
};
