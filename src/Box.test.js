import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Box from "./Box";

it("renders without crashing", function () {
    render(<Box />)
});

it("matches snapshot", function () {
    const { asFragment } = render(<Box />);
    expect(asFragment()).toMatchSnapshot();
});

it('renders with the provided background color, width, and height', () => {
    const bgColor = 'red';
    const width = 100;
    const height = 200;
    const { getByTestId } = render(<Box bgColor={bgColor} width={width} height={height} />);

    const boxElement = getByTestId('Box');

    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveStyle({
        backgroundColor: bgColor,
        width: `${width}px`,
        height: `${height}px`,
    });
});

it('calls remove function with box ID when "Remove me" button is clicked', () => {
    const removeMock = jest.fn();
    const boxId = 'test';
    const { getByText } = render(<Box bgColor="#ff0000" width={100} height={200} remove={removeMock} id={boxId} />);

    const removeButton = getByText('Remove me');

    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledWith(boxId);
});