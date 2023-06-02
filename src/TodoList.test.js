import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", function () {
    render(<TodoList />)
});

it("matches snapshot", function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('renders the list of todos', () => {
    const todos = [
        { id: '1', task: 'laundry', isCompleted: false},
        { id: '2', task: 'homework', isCompleted: true}
    ];
    const { getAllByTestId } = render(<TodoList initialTodos={todos} />);

    const todoElements = getAllByTestId('Todo');

    expect(todoElements.length).toBe(todos.length);
});


it('displays a new todo when a new todo is added', () => {
    const { getByLabelText, getByText, getByTestId, queryByText } = render(<TodoList />);
  
    const taskInput = getByLabelText('Task:');
    const addButton = getByText('Add Todo');
  
    fireEvent.change(taskInput, { target: { value: 'groceries' } });
    fireEvent.click(addButton);
  
    const todoElement = getByTestId('Todo');
    expect(todoElement).toBeInTheDocument();
    expect(queryByText('groceries')).toBeInTheDocument();
  });

it('removes a todo when the "Remove me" button is clicked', () => {
    const todos = [
        { id: '1', task: 'laundry', isCompleted: false},
        { id: '2', task: 'homework', isCompleted: true}
    ];
    const {getAllByTestId, getAllByText} = render(<TodoList initialTodos={todos} />);

    const removeButtons = getAllByText('Remove me');
    fireEvent.click(removeButtons[0]);

    const todoElements = getAllByTestId('Todo');

    expect(todoElements.length).toBe(todos.length - 1);
});

it('completes a todo when the "Complete" button is clicked', () => {
    const todos = [
        { id: '1', task: 'laundry', isCompleted: false},
        { id: '2', task: 'homework', isCompleted: true}
    ];
    const {getAllByTestId, getAllByText} = render(<TodoList initialTodos={todos} />);

    const completeButtons = getAllByText('Completed');
    fireEvent.click(completeButtons[0]);

    const todoElements = getAllByTestId('Todo');

    expect(todoElements[0]).toHaveClass('Completed');
});