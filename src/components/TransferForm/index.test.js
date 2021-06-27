import { render, screen } from '@testing-library/react';
import TransferForm from './index';

const accounts = [
  { name: 'Account 1', balance: 1000.00, currency: 'USD', id: 1 },
  { name: 'Account 2', balance: 5000.00, currency: 'USD', id: 2 },
];

test('handles accounts prop correctly', () => {
  render(<TransferForm accounts={accounts} />);

  const form = screen.getByTestId('form');
  expect(form).toHaveTextContent('Account 1');
  expect(form).toHaveTextContent('Account 2');
});