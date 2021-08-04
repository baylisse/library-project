function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //if the most recent books.borrows object has a returned === false, increase accumulator by one,use reduce method
  return books.reduce ((acc, book) => {
    //access most recent borrow
    const lastBorrow = book.borrows[0];
    //check and see if last borrow is returned
    if (lastBorrow.returned === false) {
      acc++; //increment accumulator
    }
    return acc; //if it gets to here, book is not borrowed and nothing happens to accumulator. return accumulator.
  }, 0)
}

function _limitToFive (array) {
  return array.slice(0, 5);
}

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA]>obj[keyB]){
      return -1;
    } else if(obj[keyB]>obj[keyA]) {
      return 1;
    }
    return 0;
  })
}

function getMostCommonGenres(books) {
  let genreCount = books.reduce((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre]+=1;
    } else{
      acc[genre]=1;
    }
    return acc;
  }, {})
  const sortedKeys = _sortObjectByValues(genreCount);
  let sorted = sortedKeys.map((key) => ({name: key, count: genreCount[key]}));
  return _limitToFive(sorted);
}

function getMostPopularBooks(books) {
  //return the top 5 books with the most items in the borrows array
  //sort books by number of borrows
  books.sort((bookA, bookB) => bookA.borrows.length < bookB.borrows.length ? 1:-1);
  //console.log(books)
  //create an array of the most popular books with map to extract the title and borrow count
  const popularBooksList = books.map((book) => {
    //return objects for the popular books array with the correct format
    return {name: book.title, count: book.borrows.length}
  });
  //console.log(popularBooksList)
  //limit popular books array to 5 values
  return _limitToFive(popularBooksList)//popularBooksList.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // we are going to use reduce to get an array of objects that have the correct keys and values
  const authorList = books.reduce((acc, book) => { 
    // grab the authorId and borrows array
    const { authorId, borrows } = book;
    // get the authorObj
    const authorObj = authors.find(author => author.id === authorId);
    // build the author name from the authorObj
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    // get the number of times this book has been borrowed
    const count = borrows.length;
    // see if we already have an entry for this author in the accumulator
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      // if we get in here, then we already have an entry for this author in the accumulator
      // so we need to just add to its borrow count
      authExists.count += count;
    } else {
      // if we get in here, then we don't have an entry for this author, so we need to add it
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    // finally, return the acc
    return acc;
  }, []);
  // sort in descending order by count
  const sortedAuthorList = authorList.sort((authorA, authorB) => authorB.count - authorA.count);
  // get the top five
  return _limitToFive(sortedAuthorList);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
