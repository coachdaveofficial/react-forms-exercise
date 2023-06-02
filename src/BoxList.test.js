import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function () {
    render(<BoxList />)
});

it("matches snapshot", function () {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it('renders the list of boxes', () => {
    const boxes = [
        { id: '1', bgColor: 'red', width: 100, height: 200 },
        { id: '2', bgColor: 'blue', width: 150, height: 250 },
    ];
    const { getAllByTestId } = render(<BoxList initialBoxes={boxes} />);

    const boxElements = getAllByTestId('Box');

    expect(boxElements.length).toBe(boxes.length);
});

it('adds a new box when the form is submitted', () => {
    const initialBoxes = [
        { id: '1', bgColor: 'blue', width: 100, height: 200 },
    ];
    const {getByLabelText, getByText, getAllByTestId} = render(<BoxList initialBoxes={initialBoxes} />);

    const bgColorInput = getByLabelText('Background Color:');
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');
    const addButton = getByText('Add Box');

    const newBox = {
        bgColor: 'red',
        width: '120',
        height: '180',
    };

    fireEvent.change(bgColorInput, { target: { value: newBox.bgColor } });
    fireEvent.change(widthInput, { target: { value: newBox.width } });
    fireEvent.change(heightInput, { target: { value: newBox.height } });
    fireEvent.click(addButton);

    const boxElements = getAllByTestId('Box');

    expect(boxElements.length).toBe(initialBoxes.length + 1);
    expect(boxElements[boxElements.length - 1]).toHaveStyle({
        backgroundColor: newBox.bgColor,
        width: `${newBox.width}px`,
        height: `${newBox.height}px`,
    });
});

it('removes a box when the "Remove me" button is clicked', () => {
    const boxes = [
        { id: '1', bgColor: 'red', width: 100, height: 200 },
        { id: '2', bgColor: 'blue', width: 150, height: 250 },
    ];
    const {getAllByTestId, getAllByText} = render(<BoxList initialBoxes={boxes} />);

    const removeButtons = getAllByText('Remove me');
    fireEvent.click(removeButtons[0]);

    const boxElements = getAllByTestId('Box');

    expect(boxElements.length).toBe(boxes.length - 1);
});