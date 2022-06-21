import { config } from '../config/config.js';
import { createBookObject, dispatch } from './helper.js';
import { addBookToBookshelf } from './bookshelf-helper.js';

const addBookSubmitHandler = (e = new Event()) => {
  e.preventDefault();

  const addBookTitleInput = document.getElementById(
    config.addBook.form.title.id
  );
  const addBookWriterInput = document.getElementById(
    config.addBook.form.writer.id
  );
  const addBookYearInput = document.getElementById(config.addBook.form.year.id);
  const addBookIsFinishedInput = document.getElementById(
    config.addBook.form.isFinished.id
  );

  const addBookTitle = addBookTitleInput.value;
  const addBookWriter = addBookWriterInput.value;
  const addBookYear = addBookYearInput.value;
  const addBookIsFinished = addBookIsFinishedInput.checked;

  const newBook = createBookObject(
    addBookTitle,
    addBookWriter,
    addBookYear,
    addBookIsFinished
  );

  addBookToBookshelf(newBook);

  addBookIsFinished
    ? dispatch(config.event.RENDER_COMPLETE_BOOKS)
    : dispatch(config.event.RENDER_INCOMPLETE_BOOKS);

  e.target.reset();
};

export { addBookSubmitHandler };
