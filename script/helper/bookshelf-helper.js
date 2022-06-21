import { config } from '../config/config.js';
import { books } from '../main.js';
import { dispatch, hideSearchRelatedElement } from './helper.js';
import { hideElement } from './modal-helper.js';

const addBookToBookshelf = (
  book = {
    id: 0,
    title: '',
    author: '',
    year: 0,
    isComplete: false,
  }
) => {
  books.push(book);
};

const markBookFinished = (bookId = 0) => {
  const targetBook = books.find((book) => book.id === bookId);

  if (targetBook === undefined) return;

  targetBook.isComplete = true;

  dispatch(config.event.RENDER_ALL);
};

const markBookNotFinished = (bookId = 0) => {
  const targetBook = books.find((book) => book.id === bookId);

  if (targetBook === undefined) return;

  targetBook.isComplete = false;

  dispatch(config.event.RENDER_ALL);
};

const deleteBook = (bookId = 0) => {
  const targetBookIndex = books.findIndex((book) => book.id === bookId);

  if (targetBookIndex === -1) return;

  books.splice(targetBookIndex, 1);

  dispatch(config.event.RENDER_ALL);
};

const editBook = ({
  id = 0,
  title = '',
  author = '',
  year = 0,
  isComplete = false,
}) => {
  const targetBookIndex = books.findIndex((book) => book.id === id);

  if (targetBookIndex === -1) return;

  books[targetBookIndex].title = title;
  books[targetBookIndex].author = author;
  books[targetBookIndex].year = year;
  books[targetBookIndex].isComplete = isComplete;

  hideElement(config.modal.backdrop.id, config.modal.backdrop.hideClass);
  hideElement(config.modal.edit.id, config.modal.edit.hideClass);

  dispatch(config.event.RENDER_ALL);
};

const markFinishedClickHandler = (bookId = 0) => {
  // console.log(`Mark Finished: ${bookId}`);

  hideSearchRelatedElement();
  markBookFinished(bookId);
};

const editClickHandler = (
  bookId = 0,
  bookTitle = '',
  bookAuthor = '',
  bookYear = 0,
  bookIsComplete = false
) => {
  // console.log(`Edit: ${bookId}`);

  hideSearchRelatedElement();
  dispatch(config.event.RENDER_EDIT_MODAL, {
    bookId,
    bookTitle,
    bookAuthor,
    bookYear,
    bookIsComplete,
  });
};

const deleteClickHandler = (bookId = 0, bookTitle = '') => {
  // console.log(`Delete: ${bookId}`);

  hideSearchRelatedElement();
  dispatch(config.event.RENDER_DELETE_MODAL, {
    bookId,
    bookTitle,
  });
};

const restoreClickHandler = (bookId = 0) => {
  // console.log(`Restore: ${bookId}`);

  hideSearchRelatedElement();
  markBookNotFinished(bookId);
};

const createIncompleteCardComponent = ({
  id,
  title,
  author,
  year,
  isComplete,
}) => {
  const cardContainer = document.createElement('article');
  cardContainer.classList.add('incomplete-book-item');

  const bookTitle = document.createElement('h3');
  bookTitle.textContent = title;

  const hr = document.createElement('hr');

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `Penulis: ${author}`;

  const bookYear = document.createElement('p');
  bookYear.textContent = `Tahun: ${year}`;

  // Action
  const cardActionContainer = document.createElement('div');
  cardActionContainer.classList.add('incomplete-book-item-action');

  const markFinishedBtn = document.createElement('button');
  markFinishedBtn.classList.add('incomplete-book-item-action__button');
  markFinishedBtn.classList.add('incomplete-book-item-action__button--check');
  markFinishedBtn.addEventListener(
    'click',
    markFinishedClickHandler.bind(null, id)
  );

  const markFinishedImg = document.createElement('img');
  markFinishedImg.setAttribute('src', config.img.done);
  markFinishedImg.setAttribute('alt', 'Mark Finished');

  markFinishedBtn.append(markFinishedImg);

  const editBtn = document.createElement('button');
  editBtn.classList.add('incomplete-book-item-action__button');
  editBtn.classList.add('incomplete-book-item-action__button--edit');
  editBtn.addEventListener(
    'click',
    editClickHandler.bind(null, id, title, author, year, isComplete)
  );

  const editImg = document.createElement('img');
  editImg.setAttribute('src', config.img.edit);
  editImg.setAttribute('alt', 'Edit');

  editBtn.append(editImg);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('incomplete-book-item-action__button');
  deleteBtn.classList.add('incomplete-book-item-action__button--delete');
  deleteBtn.addEventListener('click', deleteClickHandler.bind(null, id, title));

  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', config.img.delete);
  deleteImg.setAttribute('alt', 'Delete');

  deleteBtn.append(deleteImg);

  // Append all button to action container
  cardActionContainer.append(markFinishedBtn, editBtn, deleteBtn);

  // Append all to container
  cardContainer.append(
    bookTitle,
    hr,
    bookAuthor,
    bookYear,
    cardActionContainer
  );

  return cardContainer;
};

const createCompleteCardComponent = ({
  id,
  title,
  author,
  year,
  isComplete,
}) => {
  const cardContainer = document.createElement('article');
  cardContainer.classList.add('complete-book-item');

  const bookTitle = document.createElement('h3');
  bookTitle.textContent = title;

  const hr = document.createElement('hr');

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `Penulis: ${author}`;

  const bookYear = document.createElement('p');
  bookYear.textContent = `Tahun: ${year}`;

  // Action
  const cardActionContainer = document.createElement('div');
  cardActionContainer.classList.add('complete-book-item-action');

  const restoreBtn = document.createElement('button');
  restoreBtn.classList.add('complete-book-item-action__button');
  restoreBtn.classList.add('complete-book-item-action__button--check');
  restoreBtn.addEventListener('click', restoreClickHandler.bind(null, id));

  const restoreImg = document.createElement('img');
  restoreImg.setAttribute('src', config.img.restore);
  restoreImg.setAttribute('alt', 'Mark Not Finished');

  restoreBtn.append(restoreImg);

  const editBtn = document.createElement('button');
  editBtn.classList.add('complete-book-item-action__button');
  editBtn.classList.add('complete-book-item-action__button--edit');
  editBtn.addEventListener(
    'click',
    editClickHandler.bind(null, id, title, author, year, isComplete)
  );

  const editImg = document.createElement('img');
  editImg.setAttribute('src', config.img.edit);
  editImg.setAttribute('alt', 'Edit');

  editBtn.append(editImg);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('complete-book-item-action__button');
  deleteBtn.classList.add('complete-book-item-action__button--delete');
  deleteBtn.addEventListener('click', deleteClickHandler.bind(null, id, title));

  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', config.img.delete);
  deleteImg.setAttribute('alt', 'Delete');

  deleteBtn.append(deleteImg);

  // Append all button to action container
  cardActionContainer.append(restoreBtn, editBtn, deleteBtn);

  // Append all to container
  cardContainer.append(
    bookTitle,
    hr,
    bookAuthor,
    bookYear,
    cardActionContainer
  );

  return cardContainer;
};

export {
  addBookToBookshelf,
  deleteBook,
  editBook,
  createIncompleteCardComponent,
  createCompleteCardComponent,
};
