import { useState } from "react"

import './App.css'

import TodoForm from "./components/TodoForm"
import Search from "./components/search"
import Filter from "./components/Filter"

function App() {

  const [todos,setTodos] = useState([
   {
    id:1,
     text:"Criar funcionalidade x no sistema",
     category:"trabalho",
     isComplete:false
   },
   {
   id:2,
    text:"Ir para a academia",
    category:"Personal",
    isComplete:false
   },
   {
   id:3,
    text:"Estudar React",
    category:"Estudos",
    isComplete:false
   }
  ])

const [search,setSearch] = useState("")

const [filter,setFilter] = useState("All")
const [sort,setSort] = useState("Asc")

const addtodo = (text,category) => {
  const newTodos = [
    ...todos,{
     id: Math.floor(Math.random() * 10000),
      text,
      category,
      isComplete:false
    }
  ]
   setTodos(newTodos); 
}

const RemoveTodo = (id) => {
  const newTodos = [...todos];
  const filteredTodos = newTodos.filter((todo) => 
    todo.id !== id ? todo : null
  );
  setTodos(filteredTodos)
}

const CompletoToDo = (id) =>{
  const newTodos = [...todos]
  newTodos.map((todo) => todo.id === id ? todo.isComplete = !todo.isComplete : todo)
  setTodos(newTodos)
}


  return (
  <div className="app">
    <h1>Lista de Tarefas</h1>
    <Search search = {search} setSearch = {setSearch} />
    <Filter filter = {filter} setFilter = {setFilter} setSort = {setSort}/>
    <div className="Todo-list">
        {todos
        .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isComplete : !todo.isComplete)
        .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a ,b) => sort === "Asc" ? 
        a.text.localeCompare(b.text) : 
        b.text.localeCompare(a.text))
        .map((todo) => (
       <div className="todo" key = {todo.id} style={{textDecoration : todo.isComplete ? "line-through":""}}>
       <div className="content">
          <p>{todo.text}</p>
          <p className="category">({todo.category})</p>
      </div>
      <div>
          <button className="Complete" onClick={() => CompletoToDo(todo.id)}>Completar</button>
          <button className="Remove" onClick={() => RemoveTodo(todo.id)}>x</button>
      </div>  
      </div>
      
      //   <ToDo 
      // key = {todo.id}
      // todo = {todo}
      // text = {todo.text}
      // category = {todo.category}  
      // removeTodo = {RemoveTodo}
      // />
      ))}
    </div>
    <TodoForm addtodo = {addtodo}/>
    
  </div>
  )
}

export default App
