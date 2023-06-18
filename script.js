class Books {
  constructor(read, title, author, translator, pages) {
    this.read = read
    this.title = title
    this.author = author
    this.translator = translator
    this.pages = pages
  }
}

const table = document.querySelector("table")

let book1 = new Books(true, "سفر روح", "مایکل نیوتون", "محمود دانایی", 350)
let book2 = new Books(
  false,
  "ما شروعش می کنیم",
  "کالین هوور",
  "مهدی شمسایی",
  301
)
let book3 = new Books(true, "بر باد رفته", "مارگارت میچل", "حسن شهباز", 1500)

let listOfBooks = [book1, book2, book3]

function generateList() {
  let tempTr
  let tempTh= `<tr class="header">
    <th><i class="fa-regular fa-check-square mainIcon"></i></th>
    <th>عنوان</th>
    <th>نویسنده</th>
    <th>مترجم</th>
    <th>صفحات</th>
    <th><i class="fa-regular fa-star mainIcon"></i></th>
  </tr>`
  table.insertAdjacentHTML('beforeend',tempTh)
  listOfBooks.forEach((book) => {
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
  })
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

  let arrayOfItems = []
  for (const item of table.children) {
    console.log(item.innerHTML)
    arrayOfItems.push(item.innerHTML.trim())
    console.log(arrayOfItems);
    localStorage.setItem("table", JSON.stringify(arrayOfItems))
  }
})

function getLocalStorage() {
  let tableStorage = JSON.parse(localStorage.getItem("table"))
  if (tableStorage) {
    table.insertAdjacentHTML('beforeend',tableStorage)
  } else {
    generateList()
  }
}
getLocalStorage()
