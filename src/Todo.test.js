import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function () {
    render(<Todo />)
});

it("matches snapshot", function () {
    const { asFragment } = render(<Todo />);
    expect(asFragment()).toMatchSnapshot();
});

it('renders with the provided task', () => {
    const { getByTestId } = render(<Todo task="test" />);

    const todoElement = getByTestId('Todo');

    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('test');
});

it('calls remove function with todo ID when "Remove me" button is clicked', () => {
    const removeMock = jest.fn();
    const todoId = 'test';
    const { getByText } = render(<Todo task="test" remove={removeMock} id={todoId} />);

    const removeButton = getByText('Remove me');

    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledWith(todoId);
});