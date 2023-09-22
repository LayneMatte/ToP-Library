let test;
const catalog = document.querySelector('.catalog');
const addbook = document.querySelector('.addbook');
const bookform = document.querySelector('.bookform');
const submit = document.querySelector('.submit');
const close = document.querySelector('.close');
const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pcount = document.querySelector('#pcount');
const readstatus = document.querySelector('#readstatus');
let myLibrary = [
        {
        "author":"Suzanne Collins",
        "title":"Hunger Games",
        "pcount":"374",
        "read":true
    },
    {
        "author":"J.K. Rowling",
        "title":"Harry Potter and the Sorcerer's Stone",
        "pcount":"209",
        "read":false
    },
    ];
function Book(author,title,pcount,read) {
    this.author = author
    this.title = title
    this.pcount = pcount
    this.read = read
  }
function updateCatalog () {
            for (let i = 0; i < myLibrary.length; i++) {
                const book = document.createElement('div');
                book.classList.add(`book${i}`);
                book.innerHTML = `
                <div class="category">Author</div> <div class="info">${myLibrary[i].author}</div>
                <div class="category">Title</div> <div class="info">${myLibrary[i].title}</div>
                <div class="category">Page #</div> <div class="info">${myLibrary[i].pcount} </div>
                <div class="category">Read</div>
                    <label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                    </label>
                </br>
                <img src="./icons/delete.svg" alt="delete icon" class="del ${i}">
               `;
                catalog.appendChild(book)
            }
}
updateCatalog()
function wipeCatalog() {
    if (catalog.children.length != 0 ) {
        while (catalog.firstChild) {
            catalog.removeChild(catalog.firstChild);
        }
    }
}

document.addEventListener('mousemove', () => {
    if (catalog.children.length != 0) {
        const del = document.querySelectorAll(`.del`);
                del.forEach(div => div.addEventListener('click',(event) => {
                        const test = event.target.classList.value;
                        const testParent = event.target.parentElement.classList.value;
                        let domIndex = test.split(' ');
                        let newArray = Array.from(catalog.children);
                        let arrayIndex = newArray.findIndex((x) => x.classList.value === testParent);
                        myLibrary.splice(arrayIndex,1);
                        del[domIndex[1]].parentNode.remove();
                        event.stopImmediatePropagation();
                    }
                )
            )
        }
    }
)

addbook.addEventListener('click',(event) => {
    event.preventDefault();bookform.showModal()
    }
)
close.addEventListener('click',(event) => {
    event.preventDefault();bookform.close()
    }
)
submit.addEventListener('click',
        (event) => {
        event.preventDefault();
        let newbook = new Book(`${author.value}`,`${title.value}`,`${pcount.value}`);
        myLibrary.push(newbook);
        wipeCatalog();
        updateCatalog();
    }
)
