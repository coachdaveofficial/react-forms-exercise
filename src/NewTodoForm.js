import React, { useState } from 'react';

function NewTodoForm({ addTodo }) {

    const INITIAL_STATE = {
        task: '',
        isCompleted: false
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        addTodo(formData);
        setFormData(INITIAL_STATE);

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='task'>Task: </label>
            <input
                id='task'
                type='text'
                name='task'
                placeholder='Task'
                value={formData.task}
                onChange={handleChange}
            />

            <button>Add Todo</button>

        </form>
    )
}


export default NewTodoForm;