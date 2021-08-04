function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1:-1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, {borrows}) => {
    if (borrows.some((borrow) => borrow.id === account.id)) {
      acc++;
    }
    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //create an array of books currently checked out by given account
  let checkedOutBooks = books.filter(({borrows}) => {
    return borrows.some((borrow) => borrow.id === account.id && borrow.returned === false)
  });
  //console.log(checkedOutBooks)
  //create target array with the matching author and book objects joined
  return newArr = checkedOutBooks.map(book => {
    //find matching author for a given book
    let author = authors.find(author => book.authorId === author.id)
    //console.log(author)
    //return new object to the array with correct keys and values
    return {author, ...book}
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
