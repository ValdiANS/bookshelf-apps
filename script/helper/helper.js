import { config } from '../config/config.js';
import { hideElement } from './modal-helper.js';

const dispatch = (eventName = '', detail = {}) => {
  document.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
    })
  );
};

const createBookObject = (
  title = '',
  author = '',
  year = 0,
  isComplete = false
) => {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
};

const hideSearchRelatedElement = () => {
  const searchInput = document.getElementById(
    config.searchBar.form.searchInput.id
  );

  searchInput.value = '';

  hideElement(
    config.searchBar.form.resetBtn.id,
    config.searchBar.form.resetBtn.hideClass
  );

  hideElement(
    config.searchBar.searchBarSpan.id,
    config.searchBar.searchBarSpan.hideClass
  );

  hideElement(
    config.bookshelf.incomplete.emptySearch.id,
    config.bookshelf.incomplete.emptySearch.hideClass
  );

  hideElement(
    config.bookshelf.complete.emptySearch.id,
    config.bookshelf.complete.emptySearch.hideClass
  );
};

const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }

  return true;
};

const replaceLocalStorageBooks = (books = []) => {
  if (!isStorageExist()) return;

  localStorage.setItem(config.localStorageKey, JSON.stringify(books));
};

const getBooksFromLocalStorage = () => {
  if (!isStorageExist()) return;

  return JSON.parse(localStorage.getItem(config.localStorageKey)) || [];
};

export {
  dispatch,
  createBookObject,
  hideSearchRelatedElement,
  replaceLocalStorageBooks,
  getBooksFromLocalStorage,
};
