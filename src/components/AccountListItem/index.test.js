import { fireEvent, render, screen } from '@testing-library/react';
import AccountListItem from './index';

test('clicking on item calls onClick function', () => {
  const onClick = jest.fn();
  render(<AccountListItem onClick={onClick} />);

  fireEvent.click(screen.getByTestId('account_item'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('handles currency, balance and name props correctly', () => {
  render(<AccountListItem balance={1} name="Account" currency="EUR" />);

  const item = screen.getByTestId('account_item');
  expect(item).toHaveTextContent('1.00');
  expect(item).toHaveTextContent('Account');
  expect(item).toHaveTextContent('EUR');
});