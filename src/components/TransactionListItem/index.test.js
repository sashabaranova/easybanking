import { render, screen } from '@testing-library/react';
import TransactionListItem from './index';

const date = '2021-04-20T10:00:00.000Z';

test('handles props correctly', () => {
  render(
    <TransactionListItem
      amount={0}
      desc="Transaction"
      timestamp={date}
      amount={1}
      currency={'SGD'}
    />);

  const item = screen.getByTestId('transaction');

  expect(item).toHaveTextContent('Transaction');
  expect(item).toHaveTextContent('20 Apr, 2021 at 06:00 PM');
  expect(item).toHaveTextContent('1.00');
  expect(item).toHaveTextContent('SGD');
});