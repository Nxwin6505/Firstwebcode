const books = [];

getUrl = async(url) => {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (error) { console.log('Failed to retrieve data: ', error); }
}

getBooks = () => {
  getUrl("https://www.anapioficeandfire.com/api/books").then(data => {
    data.forEach(b => {
      const book = { Name: b.name, ISBN: b.isbn, Authors: b.authors, Pages: b.numberOfPages, Publisher: b.publisher, Released: b.released };
      let characters = [],
        charLen = b.characters.length >= 5 ? 5 : b.characters.length;
      for (let i = 0; i < charLen; i++) {
        getUrl(b.characters[i]).then(c => characters.push(c.name));
      }
      book.Characters = characters;
      books.push(book);
    });
  });
}

getBooks();
console.log(books);