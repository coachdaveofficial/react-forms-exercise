import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';


function TodoList({initialTodos=[]}) {
    const [todos, setTodos] = useState(initialTodos);
    const addTodo = (todo) => {
        let newTodo = {...todo, id: uuid() };
        setTodos([...todos, newTodo]);
    }
    const removeTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));
    const completeTodo = (id) => setTodos(todos.map(todo => {
        if (todo.id === id) {
            return {...todo, isCompleted: !todo.isCompleted}
        }
        return todo;
    }));
    

    return (
        <div>
            <NewTodoForm addTodo={addTodo}/>
            {todos.map(({ id, isCompleted, task}) => {
                return (
                <div key={id}>
                    <Todo isCompleted={isCompleted} task={task} remove={removeTodo} id={id} complete={completeTodo}/>
                </div>
                )
            })}
        </div>
    );
}

export default TodoList;