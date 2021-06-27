import { fireEvent, render, screen } from '@testing-library/react';
import Header from './index';

jest.mock('react-router-dom', () => ({
  useHistory: () => {
    const push = mockPush;
    return { push };
  },
}));

const mockPush = jest.fn();

test('renders Header content correctly', () => {
  render(<Header />);

  const title = screen.getByTestId('nav_heading');
  expect(title).toHaveTextContent('EasyBanking');

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
  expect(links[0]).toHaveTextContent('Banking');
  expect(links[1]).toHaveTextContent('Investments');
  expect(links[2]).toHaveTextContent('Insurance');
});

test('Navigates to home page on clicking title', () => {
  render(<Header />);

  const title = screen.getByTestId('nav_heading');
  fireEvent.click(title);
  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith('/');
});