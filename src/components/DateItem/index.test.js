import { render, screen } from '@testing-library/react';
import DateItem from './index';

const date = '2021-04-20T10:00:00.000Z';

test('Handles date prop correctly', () => {
  render(<DateItem date={date} />);
  expect(screen.getByTestId('date')).toHaveTextContent('Tuesday, 20 Apr, 2021');
});