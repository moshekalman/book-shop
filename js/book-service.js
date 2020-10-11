const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 5;

var gPageIdx = 0;
var gNextId = (loadFromStorage(STORAGE_KEY)) ? loadFromStorage(STORAGE_KEY).length + 1 : 1;
var gBooks = _createBooks();

var gBookInfo = [
    'At 33, the age of adulthood among hobbits, Frodo Baggins receives a magic Ring of Invisibility from his uncle Bilbo. Frodo, a Christlike figure, learns that the ring has the power to control the entire world and, he discovers, to corrupt its owner. A fellowship of hobbits, elves, dwarfs, and men is formed to destroy the ring by casting it into the volcanic fires of the Crack of Doom, where it was forged. They are opposed on their harrowing mission by the evil Sauron and his Black Riders.',
    `Robert Kiyosaki’s Rich Dad Poor Dad was first published in 1997 and quickly became a must-read for people interested in investing, money, and the global economy. The book has been translated into dozens of languages, sold around the world, and has become the #1 Personal Finance book of all time.
    The overarching theme of Rich Dad Poor Dad is how to use money as a tool for wealth development. 
    It destroys the myth that the rich are born rich, explains why your personal residence may not really be an asset, describes the real difference between an asset and a liability, and much more.`,
    `It's the Best!`
];

function _createBooks() {
    if (loadFromStorage(STORAGE_KEY)) return loadFromStorage(STORAGE_KEY);
    var books = [];
    books.push(_createBook('Lord Of The Rings', 20));
    books.push(_createBook('Rich Dad, Poor Dad', 15));
    books.push(_createBook('Best Book Ever', 26));
    saveToStorage(STORAGE_KEY, books);
    return books;
}

function _createBook(title, price = 15) {
    console.log(gNextId);
    return {
        title,
        price,
        id: gNextId++,
        rating: 0
    };
}

function removeBook(bookId, bookPrice) {
    currBookIdx = gBooks.findIndex(book => bookId === book.id);
    gBooks.splice(currBookIdx, 1);
    saveToStorage(STORAGE_KEY, gBooks);
}

function addBook(title, price) {
    if (!title || !price) return;
    gBooks.push(_createBook(title, price));
    saveToStorage(STORAGE_KEY, gBooks);
}

function updateBook(bookId, bookPrice) {
    currBook = getBookById(bookId);
    currBook.price = bookPrice;
    saveToStorage(STORAGE_KEY, gBooks);
}

function getBookById(bookId) {
    return currBook = gBooks.find(book => bookId === book.id);
}

function changeRating(diff, bookId) {
    currBook = getBookById(bookId);
    if (currBook.rating + diff > 10 || currBook.rating + diff < 0) return;
    currBook.rating += diff;
    onReadBook(bookId);
}

function getSort(sortBy) {
    if (sortBy === 'title') gBooks.sort((book1, book2) =>
        (book1[sortBy].toLowerCase() > book2[sortBy].toLowerCase()) ? 1 : -1);
    else gBooks.sort((book1, book2) => book1[sortBy] - book2[sortBy]);
}

function getBooksForDisplay() {
    var fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
}

function nextPage(diff) {
    console.log(gPageIdx);
    if (((gPageIdx+1) * PAGE_SIZE >= gBooks.length && diff === 1) || (gPageIdx === 0 && diff === -1)) return;
    gPageIdx += diff;
}

