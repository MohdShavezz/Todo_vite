import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoItem({todo}) {
    const {updateTodo,deleteTodo,toggleComplete}=useTodo()
 const [isEditable,setIsEditable]=useState(false)
 const [todoMsg,setTodoMsg]=useState(todo.todo)

 const editTodo=()=>{
    updateTodo(todo.id,{...todo,todo:todoMsg})
    setIsEditable(false)
 }

 const toggle=()=>{
    toggleComplete(todo.id)
 }
  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black 
          ${todo.isCompleted?"bg-[#c6e9a7]":"bg-[#ccbed7]"}  `}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
            checked={todo.isCompleted} onChange={toggle}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                isEditable ? "border-black/10 px-2" : "border-transparent"
            } ${todo.isCompleted ? "line-through" : ""}`}
              value={todoMsg} readOnly={!isEditable} 
              onChange={prev=>setTodoMsg(prev.target.value)}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={()=>{
                if(todo.isCompleted) return
                if(isEditable){
                    editTodo()
                }else{
                    setIsEditable((e)=>!e)
                }
              }}
              disabled={todo.isCompleted}
          >
              {isEditable?"📁":"✏️"}
             
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={()=>deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;