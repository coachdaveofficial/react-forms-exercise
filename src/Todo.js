import React from 'react';
import './Todo.css'

function Todo({isCompleted=false, task, remove, id, complete}) {

    const classes = `Todo ${isCompleted ? "Completed" : ""}`
    return (
        <li data-testid="Todo" id={id} className={classes}>
            {task}
            <span style={{'marginLeft': '10px'}}>
                <button onClick={() => remove(id)}>Remove me</button>
                <button onClick={() => complete(id)}>Completed</button>
            </span>
        </li>
    )
}



export default Todo;