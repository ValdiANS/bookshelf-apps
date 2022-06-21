/*
  Data Schema:
  {
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
  }
*/

import { config } from './config/config.js';
import {
  createCompleteCardComponent,
  createIncompleteCardComponent,
  deleteBook,
  editBook,
} from './helper/bookshelf-helper.js';
import {
  hideElement,
  showElement,
  removeEditModalRelatedEventListener,
  removeDeleteModalRelatedEventListener,
} from './helper/modal-helper.js';
import { addBookSubmitHandler } from './helper/add-book-helper.js';
import {
  dispatch,
  getBooksFromLocalStorage,
  hideSearchRelatedElement,
  replaceLocalStorageBooks,
} from './helper/helper.js';

const {
  RENDER_ALL,
  RENDER_INCOMPLETE_BOOKS,
  RENDER_COMPLETE_BOOKS,
  RENDER_SEARCHED_BOOKS,
  RENDER_EDIT_MODAL,
  RENDER_DELETE_MODAL,
} = config.event;

const books = getBooksFromLocalStorage();

const resetSearchBtnClickHandler = (e = new Event()) => {
  hideSearchRelatedElement();
  dispatch(RENDER_ALL);
};

const searchSubmitHandler = (e = new Event()) => {
  e.preventDefault();

  // Hide empty book message
  hideElement(
    config.bookshelf.incomplete.emptyBook.id,
    config.bookshelf.incomplete.emptyBook.hideClass
  );

  hideElement(
    config.bookshelf.complete.emptyBook.id,
    config.bookshelf.complete.emptyBook.hideClass
  );

  // Search
  const searchInput = document.getElementById(
    config.searchBar.form.searchInput.id
  );

  const resetSearchBtn = document.getElementById(
    config.searchBar.form.resetBtn.id
  );
  resetSearchBtn.addEventListener('click', resetSearchBtnClickHandler);

  const searchedBookTitle = document.getElementById(
    config.searchBar.searchBarSpan.searchedBookTitle.id
  );
  searchedBookTitle.textContent = searchInput.value;

  const incompleteEmptySearchSearchedBookTitle = document.getElementById(
    config.bookshelf.incomplete.emptySearch.searchedBookTitle.id
  );
  incompleteEmptySearchSearchedBookTitle.textContent = searchInput.value;

  const completeEmptySearchSearchedBookTitle = document.getElementById(
    config.bookshelf.complete.emptySearch.searchedBookTitle.id
  );
  completeEmptySearchSearchedBookTitle.textContent = searchInput.value;

  showElement(
    config.searchBar.form.resetBtn.id,
    config.searchBar.form.resetBtn.hideClass
  );

  showElement(
    config.searchBar.searchBarSpan.id,
    config.searchBar.searchBarSpan.hideClass
  );

  dispatch(RENDER_SEARCHED_BOOKS, {
    searchValue: searchInput.value.toLowerCase().trim(),
  });
};

document.addEventListener('DOMContentLoaded', () => {
  dispatch(RENDER_ALL);

  // Add Book Form
  const addBookForm = document.getElementById(config.addBook.form.id);
  addBookForm.addEventListener('submit', addBookSubmitHandler);

  // Search Form
  const searchForm = document.getElementById(config.searchBar.form.id);
  searchForm.addEventListener('submit', searchSubmitHandler);
});

// Render Incomplete and Complete Books
document.addEventListener(RENDER_ALL, (e) => {
  dispatch(RENDER_INCOMPLETE_BOOKS);
  dispatch(RENDER_COMPLETE_BOOKS);
});

// Render Incomplete Books
document.addEventListener(RENDER_INCOMPLETE_BOOKS, (e) => {
  replaceLocalStorageBooks(books);

  const incompleteBooks = books.filter((book) => !book.isComplete);

  // Empty Incomplete Bookshelf
  const incompleteBookshelfEmptyBook = document.getElementById(
    'incompleteBookshelfEmptyBook'
  );

  if (incompleteBooks.length !== 0) {
    incompleteBookshelfEmptyBook.classList.add(
      'incomplete-bookshelf__empty-book--none'
    );
  } else {
    incompleteBookshelfEmptyBook.classList.remove(
      'incomplete-bookshelf__empty-book--none'
    );
  }

  // Incomplete List
  const incompleteBookshelfList = document.getElementById(
    config.bookshelf.incomplete.list.id
  );
  incompleteBookshelfList.innerHTML = '';

  incompleteBooks.forEach(({ id, title, author, year, isComplete }) => {
    const incompleteBookCard = createIncompleteCardComponent({
      id,
      title,
      author,
      year,
      isComplete,
    });

    incompleteBookshelfList.append(incompleteBookCard);
  });
});

// Render Complete Books
document.addEventListener(RENDER_COMPLETE_BOOKS, (e) => {
  replaceLocalStorageBooks(books);

  const completeBooks = books.filter((book) => book.isComplete);

  // Empty Complete Bookshelf
  const completeBookshelfEmptyBook = document.getElementById(
    'completeBookshelfEmptyBook'
  );

  if (completeBooks.length !== 0) {
    completeBookshelfEmptyBook.classList.add(
      'complete-bookshelf__empty-book--none'
    );
  } else {
    completeBookshelfEmptyBook.classList.remove(
      'complete-bookshelf__empty-book--none'
    );
  }

  // Complete List
  const completeBookshelfList = document.getElementById(
    config.bookshelf.complete.list.id
  );
  completeBookshelfList.innerHTML = '';

  completeBooks.forEach(({ id, title, author, year, isComplete }) => {
    const completeBookCard = createCompleteCardComponent({
      id,
      title,
      author,
      year,
      isComplete,
    });

    completeBookshelfList.append(completeBookCard);
  });
});

// Render Searched Incomplete and Complete Books
document.addEventListener(RENDER_SEARCHED_BOOKS, (e) => {
  const { searchValue } = e.detail;

  // Hide empty search message
  hideElement(
    config.bookshelf.incomplete.emptySearch.id,
    config.bookshelf.incomplete.emptySearch.hideClass
  );
  hideElement(
    config.bookshelf.complete.emptySearch.id,
    config.bookshelf.complete.emptySearch.hideClass
  );

  const filteredIncompleteBooks = books.filter(
    (book) => !book.isComplete && book.title.toLowerCase().includes(searchValue)
  );

  const filteredCompleteBooks = books.filter(
    (book) => book.isComplete && book.title.toLowerCase().includes(searchValue)
  );

  // Incomplete List
  const incompleteBookshelfList = document.getElementById(
    config.bookshelf.incomplete.list.id
  );
  incompleteBookshelfList.innerHTML = '';

  // Complete List
  const completeBookshelfList = document.getElementById(
    config.bookshelf.complete.list.id
  );
  completeBookshelfList.innerHTML = '';

  if (filteredIncompleteBooks.length === 0) {
    showElement(
      config.bookshelf.incomplete.emptySearch.id,
      config.bookshelf.incomplete.emptySearch.hideClass
    );
  }

  if (filteredCompleteBooks.length === 0) {
    showElement(
      config.bookshelf.complete.emptySearch.id,
      config.bookshelf.complete.emptySearch.hideClass
    );
  }

  if (
    filteredIncompleteBooks.length === 0 &&
    filteredCompleteBooks.length === 0
  )
    return;

  // Filtered Incomplete List
  filteredIncompleteBooks.forEach(({ id, title, author, year, isComplete }) => {
    const incompleteBookCard = createIncompleteCardComponent({
      id,
      title,
      author,
      year,
      isComplete,
    });

    incompleteBookshelfList.append(incompleteBookCard);
  });

  // Filtered Complete List
  filteredCompleteBooks.forEach(({ id, title, author, year, isComplete }) => {
    const completeBookCard = createCompleteCardComponent({
      id,
      title,
      author,
      year,
      isComplete,
    });

    completeBookshelfList.append(completeBookCard);
  });
});

// Render Edit Modal
document.addEventListener(RENDER_EDIT_MODAL, (e) => {
  const bookId = e.detail.bookId;

  const modalBackdrop = document.getElementById(config.modal.backdrop.id);
  const editModal = document.getElementById(config.modal.edit.id);
  const editBookForm = document.getElementById(config.modal.edit.form.id);
  const editedBookTitle = document.getElementById(
    config.modal.edit.form.editedBookTitle.id
  );
  const editTitle = document.getElementById(config.modal.edit.form.title.id);
  const editWriter = document.getElementById(config.modal.edit.form.writer.id);
  const editYear = document.getElementById(config.modal.edit.form.year.id);
  const editIsFinished = document.getElementById(
    config.modal.edit.form.isFinished.id
  );
  const editCancelBtn = document.getElementById(
    config.modal.edit.form.cancelBtn.id
  );

  showElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
  showElement(config.modal.edit.id, config.modal.edit.hideClass);

  editedBookTitle.textContent = e.detail.bookTitle;
  editTitle.value = e.detail.bookTitle;
  editWriter.value = e.detail.bookAuthor;
  editYear.value = e.detail.bookYear;
  editIsFinished.checked = e.detail.bookIsComplete;

  modalBackdrop.addEventListener('click', editBackdropClickHandler);
  editModal.addEventListener('click', editModalClickHandler);
  editBookForm.addEventListener('submit', editModalSubmitHandler);
  editCancelBtn.addEventListener('click', editModalCancelBtnClickHandler);

  function editBackdropClickHandler() {
    hideElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
    hideElement(config.modal.edit.id, config.modal.edit.hideClass);

    removeEditModalRelatedEventListener(
      editBackdropClickHandler,
      editModalClickHandler,
      editModalSubmitHandler,
      editModalCancelBtnClickHandler
    );
  }

  function editModalClickHandler(e = new Event()) {
    e.stopPropagation();
  }

  function editModalSubmitHandler(e = new Event()) {
    e.preventDefault();

    editBook({
      id: bookId,
      title: editTitle.value,
      author: editWriter.value,
      year: editYear.value,
      isComplete: editIsFinished.checked,
    });

    removeEditModalRelatedEventListener(
      editBackdropClickHandler,
      editModalClickHandler,
      editModalSubmitHandler,
      editModalCancelBtnClickHandler
    );
  }

  function editModalCancelBtnClickHandler() {
    hideElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
    hideElement(config.modal.edit.id, config.modal.edit.hideClass);

    removeEditModalRelatedEventListener(
      editBackdropClickHandler,
      editModalClickHandler,
      editModalSubmitHandler,
      editModalCancelBtnClickHandler
    );
  }
});

// Render Delete Modal
document.addEventListener(RENDER_DELETE_MODAL, (e) => {
  const modalBackdrop = document.getElementById(config.modal.backdrop.id);
  const deleteModal = document.getElementById(config.modal.delete.id);
  const deletedBookTitle = document.getElementById(
    config.modal.delete.deletedBookTitle.id
  );
  const deleteCancelBtn = document.getElementById(
    config.modal.delete.action.cancel.id
  );
  const deleteApproveBtn = document.getElementById(
    config.modal.delete.action.approve.id
  );

  deletedBookTitle.textContent = e.detail.bookTitle;

  showElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
  showElement(config.modal.delete.id, config.modal.delete.hideClass);

  modalBackdrop.addEventListener('click', deleteBackdropClickHandler);
  deleteModal.addEventListener('click', deleteModalClickHandler);
  deleteCancelBtn.addEventListener('click', deleteModalCancelBtnClickHandler);
  deleteApproveBtn.addEventListener('click', deleteModalApproveBtnClickHandler);

  function deleteBackdropClickHandler() {
    hideElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
    hideElement(config.modal.delete.id, config.modal.delete.hideClass);

    removeDeleteModalRelatedEventListener(
      deleteBackdropClickHandler,
      deleteModalClickHandler,
      deleteModalApproveBtnClickHandler,
      deleteModalCancelBtnClickHandler
    );
  }

  function deleteModalClickHandler(e = new Event()) {
    e.stopPropagation();
  }

  function deleteModalCancelBtnClickHandler() {
    hideElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
    hideElement(config.modal.delete.id, config.modal.delete.hideClass);

    removeDeleteModalRelatedEventListener(
      deleteBackdropClickHandler,
      deleteModalClickHandler,
      deleteModalApproveBtnClickHandler,
      deleteModalCancelBtnClickHandler
    );
  }

  function deleteModalApproveBtnClickHandler() {
    deleteBook(e.detail.bookId);

    hideElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
    hideElement(config.modal.delete.id, config.modal.delete.hideClass);

    removeDeleteModalRelatedEventListener(
      deleteBackdropClickHandler,
      deleteModalClickHandler,
      deleteModalApproveBtnClickHandler,
      deleteModalCancelBtnClickHandler
    );
  }
});

export { books };
