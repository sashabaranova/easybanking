import { act, render, screen, waitFor } from '@testing-library/react';
import Home from './index';

test('renders loader if isLoading is true', () => {
  render(<Home />);
  screen.debug();

  expect(screen.getByTestId('home')).toHaveTextContent('Loading...');
});
