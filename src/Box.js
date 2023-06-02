import React from 'react';

function Box({bgColor, width, height, remove, id}) {

    let boxStyle = {
        backgroundColor: bgColor,
        width: `${width}px`,
        height: `${height}px`
        }
    return (
        <div data-testid="Box" key={id} style={boxStyle}>
            <span>
                <button onClick={() => remove(id)}>Remove me</button>
            </span>
        </div>
    )
}



export default Box;