;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const API_URL = 'http://localhost:3000/todos'
  const $todoForm = get('.todo_form')
  const $todoInput = get('.todo_input')
  const $todoList = get('.todos')
  const createTodoElement = (item) => {
    const { id, content, completed } = item
    const isChecked = completed ? 'checked' : ''
    const $todoItem = document.createElement('div')
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' ${isChecked} 
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
    return $todoItem
  }

  const renderAllTodos = (todos) => {
    todos.forEach((todo) => {
      const todoElement = createTodoElement(todo)
      $todoList.appendChild(todoElement)
    })
  }

  const getTodos = () => {
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      .then((todos) => renderAllTodos(todos))
      .catch((error) => console.error(error.message))
  }

  const addTodo = (event) => {
    event.preventDefault()
    const todoValue = {
      content: $todoInput.value,
      completed: false,
    }

    fetch(API_URL, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(todoValue),
    }).then((response) => response.json())
  }

  const toggleTodo = (e) => {
    if (e.target.className !== 'todo_checkbox') return
    const $item = e.target.closest('.item')
    const id = $item.dataset.id
    const completed = e.target.checked
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
  }

  //수정 모드
  const editTodo = (event) => {
    const $item = event.target.closest('.item')
    const $label = $item.querySelector('label')
    const $editInput = $item.querySelector('input[type="text"]')
    const $contentBtns = $item.querySelector('.content_buttons')
    const $editBtns = $item.querySelector('.edit_buttons')
    const prevLabel = $label.innerText

    // 어떤 todo를 클릭했는지 event와 가장 가까운 (item 클래스를 갖는)요소 찾기
    if (event.target.className === 'todo_edit_button') {
      $label.style.display = 'none'
      $editInput.style.display = 'block'
      $contentBtns.style.display = 'none'
      $editBtns.style.display = 'block'
      $editInput.value = ''
      $editInput.value = prevLabel
      $editInput.focus()
    }

    if (event.target.className === 'todo_edit_cancel_button') {
      console.dir($label)
      $label.style.display = 'block'
      $editInput.style.display = 'none'
      $contentBtns.style.display = 'block'
      $editBtns.style.display = 'none'
      $editInput.value = prevLabel
    }
  }

  const updateTodo = (event) => {
    if (event.target.className !== 'todo_edit_confirm_button') return
    const $item = event.target.closest('.item')
    const id = $item.dataset.id
    const $editInput = $item.querySelector('input[type="text"]')
    const content = $editInput.value

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then(getTodos)
      .catch((error) => console.error(error.message))
  }

  const removeTodo = (event) => {
    console.log(event.target.className)
    if (event.target.className === 'todo_remove_button') {
      const $item = event.target.closest('.item')
      const id = $item.dataset.id
      console.log(id)
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
    }
  }

  const init = () => {
    window.addEventListener('DOMContentLoaded', () => {
      console.log('새로고침 함')
      getTodos()
    })
    $todoForm.addEventListener('submit', addTodo)
    $todoList.addEventListener('click', toggleTodo)
    $todoList.addEventListener('click', editTodo)
    $todoList.addEventListener('click', updateTodo)
    $todoList.addEventListener('click', removeTodo)
  }
  init()
})()
