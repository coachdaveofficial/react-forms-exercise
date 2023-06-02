import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", function () {
    const { getByLabelText } = render(<NewTodoForm />);

    const taskInput = getByLabelText('Task:');
    
    expect(taskInput).toBeInTheDocument();
    
});

it("matches snapshot", function () {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});

it('updates form data on input change', () => {
    const { getByLabelText } = render(<NewTodoForm />);

    const taskInput = getByLabelText('Task:');
    
    

    fireEvent.change(taskInput, { target: { value: 'test' } });

    expect(taskInput.value).toBe('test');

});

it('calls addTodo function with form data on form submission', () => {
    const addTodoMock = jest.fn();
    const {getByLabelText, getByText} = render(<NewTodoForm addTodo={addTodoMock} />);

    const taskInput = getByLabelText('Task:');
    
    
    const addButton = getByText('Add Todo');

    fireEvent.change(taskInput, { target: { value: 'test' } });
    fireEvent.click(addButton);

    expect(addTodoMock).toHaveBeenCalledWith({
        task: 'test',
        isCompleted: false
    });
});