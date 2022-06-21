export const config = {
  img: {
    done: './assets/done_white_24dp.svg',
    restore: './assets/restore_white_24dp.svg',
    edit: './assets/edit_white_24dp.svg',
    delete: './assets/delete_white_24dp.svg',
  },

  localStorageKey: 'BOOKSHELF',

  event: {
    RENDER_ALL: 'render-all',
    RENDER_INCOMPLETE_BOOKS: 'render-incomplete-books',
    RENDER_COMPLETE_BOOKS: 'render-complete-books',
    RENDER_SEARCHED_BOOKS: 'render-searched-books',
    RENDER_EDIT_MODAL: 'render-edit-modal',
    RENDER_DELETE_MODAL: 'render-delete-modal',
  },

  modal: {
    backdrop: {
      id: 'modalBackdrop',
      hideClass: 'modal-backdrop--none',
    },

    edit: {
      id: 'editModal',
      hideClass: 'edit-modal--none',

      form: {
        id: 'editBookForm',
        editedBookTitle: {
          id: 'editedBookTitle',
        },
        title: {
          id: 'editTitle',
        },
        writer: {
          id: 'editWriter',
        },
        year: {
          id: 'editYear',
        },
        isFinished: {
          id: 'editIsFinished',
        },
        cancelBtn: {
          id: 'editCancelBtn',
        },
      },
    },

    delete: {
      id: 'deleteModal',
      hideClass: 'delete-modal--none',

      deletedBookTitle: {
        id: 'deletedBookTitle',
      },

      action: {
        cancel: {
          id: 'deleteCancelBtn',
        },
        approve: {
          id: 'deleteApproveBtn',
        },
      },
    },
  },

  addBook: {
    form: {
      id: 'addBookForm',
      title: {
        id: 'title',
      },
      writer: {
        id: 'writer',
      },
      year: {
        id: 'year',
      },
      isFinished: {
        id: 'isFinished',
      },
    },
  },

  searchBar: {
    form: {
      id: 'searchBarForm',
      searchInput: {
        id: 'searchInput',
      },
      resetBtn: {
        id: 'resetSearchBtn',
        hideClass: 'reset-search--none',
      },
    },

    searchBarSpan: {
      id: 'searchBarSpan',
      hideClass: 'search-bar__span--none',

      searchedBookTitle: {
        id: 'searchedBookTitle',
      },
    },
  },

  bookshelf: {
    incomplete: {
      emptyBook: {
        id: 'incompleteBookshelfEmptyBook',
        hideClass: 'incomplete-bookshelf__empty-book--none',
      },

      emptySearch: {
        id: 'incompleteBookshelfEmptySearch',
        hideClass: 'incomplete-bookshelf__empty-search--none',

        searchedBookTitle: {
          id: 'incompleteEmptySearchSearchedBookTitle',
        },
      },

      list: {
        id: 'incompleteBookshelfList',
        hideClass: 'incomplete-bookshelf-list--none',
      },
    },

    complete: {
      emptyBook: {
        id: 'completeBookshelfEmptyBook',
        hideClass: 'complete-bookshelf__empty-book--none',
      },

      emptySearch: {
        id: 'completeBookshelfEmptySearch',
        hideClass: 'complete-bookshelf__empty-search--none',

        searchedBookTitle: {
          id: 'completeEmptySearchSearchedBookTitle',
        },
      },

      list: {
        id: 'completeBookshelfList',
        hideClass: 'complete-bookshelf-list--none',
      },
    },
  },
};
