'use strict';

function init() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTML = '';
    books.forEach(book => {
        strHTML += `<div class="row"><div class="cell id"><h3>${book.id}</h3></div>
        <div class="cell title"><h3>${book.title}</h3></div><div class="cell price">
        <h3>${book.price}</h3></div>
        <div class="cell actions">
        <button class="read" onclick="onReadBook(${book.id})">Read</button>
        <button class="update" onclick="onUpdateBook(${book.id})">Update</button>
        <button class="delete" onclick="onRemoveBook(${book.id})">Delete</button>
        </div></div>`;
    });
    var elBooks = document.querySelector('.books-content-container');
    elBooks.innerHTML = strHTML;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var elName = document.querySelector('input[name=name]');
    var elPrice = document.querySelector('input[name=price]');
    var name = elName.value;
    var price = elPrice.value;
    addBook(name, price);
    renderBooks();
    elName.value = '';
    elPrice.value = '';
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt('New price:');
    updateBook(bookId, bookPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var currBook = getBookById(bookId);
    if (!gBookInfo[bookId - 1]) return alert('No info on cuurrent book!');
    var strHTML = `<p>${gBookInfo[bookId - 1]}</p>
    <img src="./img/${bookId}.jpg">
    <button class="close-model" onclick="closeModel()">Close</button>
    <div class="rate" >
        <button onclick="onRate(-1,${bookId})">-</button>
        <h5 class="rating">${currBook.rating}</h5>
        <button onclick="onRate(1,${bookId})">+</button>
      </div>`;
    var elModel = document.querySelector('.book-details');
    elModel.innerHTML = strHTML;
    elModel.hidden = false;
}

function closeModel(elModel) {
    var elModel = document.querySelector('.book-details');
    elModel.hidden = true;
}

function onRate(diff, bookId) {
    console.log('Diff', diff);
    changeRating(diff, bookId);
}

function onSort(sortBy) {
    getSort(sortBy);
    renderBooks();
}

function onNextPage(diff) {
    nextPage(diff);
    renderBooks();
}