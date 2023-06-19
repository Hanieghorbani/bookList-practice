class Books {
  constructor(title, author, translator, pages) {
    this.title = title
    this.author = author
    this.translator = translator
    this.pages = pages
  }
}

const table = document.querySelector("table")
const addBtn = document.querySelector(".fa-plus")
const body = document.querySelector("body")
const addPage = document.querySelector(".addPage")
const inputTitle = document.querySelector(".inputTitle")
const inputAuthor = document.querySelector(".inputAuthor")
const inputTranslator = document.querySelector(".inputTranslator")
const inputPages = document.querySelector(".inputPages")
const confirmBtn = document.querySelector(".confirmBtn")

let book1 = new Books("سفر روح", "مایکل نیوتون", "محمود دانایی", 350)
let book2 = new Books(
  "ما شروعش می کنیم",
  "کالین هوور",
  "مهدی شمسایی",
  301
)
let book3 = new Books("بر باد رفته", "مارگارت میچل", "حسن شهباز", 1500)

let listOfBooks = [book1, book2, book3]

function generateList() {
  let tempTr
  let tempTh = `<tr class="header">
    <th><i class="fa-regular fa-check-square mainIcon"></i></th>
    <th>عنوان</th>
    <th>نویسنده</th>
    <th>مترجم</th>
    <th>صفحات</th>
    <th><i class="fa-regular fa-star mainIcon"></i></th>
  </tr>`
  table.insertAdjacentHTML("beforeend", tempTh)
  listOfBooks.forEach((book) => {
    generateTR(book)
  })
}

function generateTR(book) {
  tempTr = `<tr>
     <td><i class="fa-light fa-check-square"></i></td>
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.translator}</td>
     <td>${book.pages}</td>
     <td class="score">
       <i class="fa-light fa-star 0"></i>
       <i class="fa-light fa-star 1"></i>
       <i class="fa-light fa-star 2"></i>
       <i class="fa-light fa-star 3"></i>
       <i class="fa-light fa-star 4"></i>
     </td>
   </tr>`

    table.insertAdjacentHTML("beforeend", tempTr)
}

table.addEventListener("click", (e) => {
  if (
    e.target.className.split(" ").includes("fa-star") &&
    !e.target.className.split(" ").includes("mainIcon")
  ) {
    let numOfScore = e.target.className.split(" ")[2]
    let i = 0
    for (const icon of e.target.parentElement.children) {
      icon.setAttribute("class", `fa-light fa-star ${i++}`)
    }
    for (let i = 0; i <= numOfScore; i++) {
      e.target.parentElement.children[i].setAttribute(
        "class",
        `fa fa-star ${i}`
      )
    }
  } else if (e.target.className == "fa-light fa-check-square") {
    e.target.className = "fa-light fa-square"
  } else if (e.target.className == "fa-light fa-square") {
    e.target.className = "fa-light fa-check-square"
  }
 setLocalStorage()
  
})

function setLocalStorage() {
  let arrayOfItems = []
  for (const item of table.children) {
    console.log(item.innerHTML);
    arrayOfItems.push(item.innerHTML.trim())
    localStorage.setItem("table", JSON.stringify(arrayOfItems))
  }
}

function getLocalStorage() {
  let tableStorage = JSON.parse(localStorage.getItem("table"))
  if (tableStorage) {
    table.insertAdjacentHTML("beforeend", tableStorage)
  } else {
    generateList()
  }
}

getLocalStorage()

addBtn.addEventListener("click", () => {
  body.classList.add("active")
})

enterKeyFocus(inputTitle)
enterKeyFocus(inputAuthor)
enterKeyFocus(inputPages)
enterKeyFocus(inputTranslator)

function enterKeyFocus(input) {
  input.addEventListener("keydown", (e) => {
    if (e.keyCode == 13 && input.value.trim()) {
      e.target.nextElementSibling.focus()
      if (
        e.target.nextElementSibling.tagName == "BUTTON" &&
        inputAuthor.value &&
        inputPages.value &&
        inputTitle.value &&
        inputTranslator.value
      ) {
        e.target.nextElementSibling.blur()
        e.target.nextElementSibling.style.animation = "trans 0.3s"
        setTimeout(
          () => (e.target.nextElementSibling.style.animation = ""),
          300
        )
        e.target.style.border = "1px solid var(--color)"
        completeAdd()
      } else {
        evaluationOfInput()
      }
    }
  })
}

function clearInput() {
  inputAuthor.value = ""
  inputPages.value = ""
  inputTitle.value = ""
  inputTranslator.value = ""
}

function evaluationOfInput() {
  for (const inputElem of addPage.children) {
    if (inputElem.tagName == "INPUT") {
      if (!inputElem.value.trim().length) {
        inputElem.style.border = "2.5px solid rgb(227, 76, 76)"
      } else {
        inputElem.style.border = "1px solid var(--color)"
      }
    }
  }
}

function completeAdd() {
  if (
    inputAuthor.value &&
    inputPages.value &&
    inputTitle.value &&
    inputTranslator.value
  ) {
    console.log("yes")
     console.log(listOfBooks);   
    let newBook = new Books(inputTitle.value,inputAuthor.value,inputTranslator.value,inputPages.value)
    console.log(newBook);
    listOfBooks.push(newBook)
    console.log(listOfBooks);
      
    
    clearInput()
   body.classList.remove('active')
    generateTR(newBook)
    setLocalStorage()


  } else {
    console.log("no")
  }
}

confirmBtn.addEventListener("click", () => {
  completeAdd()
})
