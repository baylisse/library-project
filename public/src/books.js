function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //create 2 arrays, borrowed and unborrowed
  //use filter to create the borrowed array (borrows[0]===false)
  const borrowedArr = books.filter((book) => book.borrows[0].returned === false);
  //console.log(borrowedArr)
  //use filter to create the unborrowed array
  const unborrowedArr = books.filter((book) => book.borrows[0].returned === true);
  //return an array with both borrowed and unborrowed inside it
  const allBooks = [] //declare an empty array to assign the created arrays to
  //push created arrays to empty array
  allBooks.push(borrowedArr);
  allBooks.push(unborrowedArr);
  //return array with both created arrays
  return allBooks;
}
function getBorrowersForBook(book, accounts) {
  const result = [];
  const {borrows} = book;
  borrows.forEach(borrow=> {
    let account = accounts.find(acc => acc.id === borrow.id);
    account['returned'] = borrow.returned;
    result.push(account);
    });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};