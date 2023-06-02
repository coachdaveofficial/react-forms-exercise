import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Box from './Box.js'
import NewBoxForm from './NewBoxForm.js'

function BoxList({initialBoxes = []}) {
    const [boxes, setBoxes] = useState(initialBoxes);

    const addBox = (box) => {
        let newBox = {...box, id: uuid() };
        setBoxes([...boxes, newBox]);
    }
    const removeBox = (id) => setBoxes(boxes.filter(b => b.id !== id));

    return (
        <div>
            <NewBoxForm addBox={addBox}/>
            {boxes.map(({ bgColor, width, height, id }) => {
                return (
                <div key={id}>
                    <Box bgColor={bgColor} width={width} height={height} remove={removeBox} id={id} />
                </div>
                )
            })}
        </div>
    );
}

export default BoxList;