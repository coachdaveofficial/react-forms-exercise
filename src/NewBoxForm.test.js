import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("renders without crashing", function () {
    const { getByLabelText } = render(<NewBoxForm />);

    const bgColorInput = getByLabelText('Background Color:');
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');

    expect(bgColorInput).toBeInTheDocument();
    expect(widthInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
});

it("matches snapshot", function () {
    const { asFragment } = render(<NewBoxForm />);
    expect(asFragment()).toMatchSnapshot();
});

it('updates form data on input change', () => {
    const { getByLabelText } = render(<NewBoxForm />);

    const bgColorInput = getByLabelText('Background Color:');
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');

    fireEvent.change(bgColorInput, { target: { value: '#ff0000' } });
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '200' } });

    expect(bgColorInput.value).toBe('#ff0000');
    expect(widthInput.value).toBe('100');
    expect(heightInput.value).toBe('200');
});

it('calls addBox function with form data on form submission', () => {
    const addBoxMock = jest.fn();
    const {getByLabelText, getByText} = render(<NewBoxForm addBox={addBoxMock} />);

    const bgColorInput = getByLabelText('Background Color:');
    const widthInput = getByLabelText('Width:');
    const heightInput = getByLabelText('Height:');
    const addButton = getByText('Add Box');

    fireEvent.change(bgColorInput, { target: { value: '#ff0000' } });
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '200' } });
    fireEvent.click(addButton);

    expect(addBoxMock).toHaveBeenCalledWith({
        bgColor: '#ff0000',
        width: '100',
        height: '200',
    });
});