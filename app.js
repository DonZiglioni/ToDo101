const newTodo = document.querySelector('.input[name="input"]')
const addButton = document.querySelector('.button')
const list = document.querySelector('#list')
const addSound = document.querySelector('#ding-add')
const removeSound = document.querySelector('#ding-remove')
const completeSound = document.querySelector('#ding-complete')

const myList = localStorage.getItem('storedList')
list.innerHTML = myList

const rows = document.querySelectorAll('li')
for (let row of rows) {
    if (row.className === 'completedRow') {
        row.firstChild.checked = 'true'
    }
}

const addNewItem = () => {
    const newText = document.createElement('span')
    const newItem = document.createElement('li')
    const newCheckbox = document.createElement('input')
    const newRemove = document.createElement('span')

    newCheckbox.setAttribute('name', 'checkbox')
    newCheckbox.setAttribute('type', 'checkbox')
    newCheckbox.setAttribute('class', 'checkbox')

    newText.setAttribute('class', 'listItem')
    newText.innerText = newTodo.value

    newRemove.setAttribute('class', 'delete')
    newRemove.innerText = "X"

    newItem.setAttribute('class', 'row')
    newItem.append(newText)
    newItem.prepend(newCheckbox)
    newItem.append(newRemove)

    list.prepend(newItem)

    console.log(list, newItem);
    localStorage.setItem('storedList', list.innerHTML)
    newTodo.value = ''
}

addButton.addEventListener('click', () => {
    if (newTodo.value) {
        addNewItem()
        addSound.play()
    }
})

const boxes = document.querySelectorAll('input[name="checkbox"]')
console.log(boxes);

list.addEventListener('click', (e) => {
    if (e.target.className === 'delete') {
        e.target.parentElement.remove()
        removeSound.play()
        localStorage.setItem('storedList', list.innerHTML)
    }
    if (e.target.className === 'checkbox') {
        e.target.checked ? e.target.nextElementSibling.className = 'completed' : e.target.nextElementSibling.className = 'listItem'
        e.target.checked ? e.target.parentElement.className = 'completedRow' : e.target.parentElement.className = 'row'
        localStorage.setItem('storedList', list.innerHTML)
        for (let box of boxes) {
            if (e.target.checked === true) {
                console.log("true");
                completeSound.play();
            }
            console.log(box.checked, "event: ", e.target.checked);
        }
    }
})





document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        if (newTodo.value) {
            addNewItem()
            addSound.play()
        }
    };
})
