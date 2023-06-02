import { render, screen } from '@testing-library/react';
import App from './App';

test('App component exists', () => {
  const {getByTestId} = render(<App />);
  const app = getByTestId('App');
  expect(app).toBeInTheDocument();
});

it("renders without crashing", function() {
  render(<App />)
});
