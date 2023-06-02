import React, { useState } from 'react';

function NewBoxForm({ addBox }) {

    const INITIAL_STATE = {
        bgColor: "",
        width: "",
        height: ""
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
        addBox(formData);
        setFormData(INITIAL_STATE);

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='bgColor'>Background Color: </label>
            <input
                id="bgColor"
                type='text'
                name='bgColor'
                placeholder='background color'
                value={formData.bgColor}
                onChange={handleChange}
            />
            <label htmlFor='width'>Width: </label>
            <input
                id="width"
                type='text'
                name='width'
                placeholder='width'
                value={formData.width}
                onChange={handleChange}
            />
            <label htmlFor='height'>Height: </label>
            <input
                id="height"
                type='text'
                name='height'
                placeholder='height'
                value={formData.height}
                onChange={handleChange}
            />

            <button>Add Box</button>

        </form>
    )
}


export default NewBoxForm;