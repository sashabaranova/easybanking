import { render, screen } from '@testing-library/react';
import Footer from './index';

test('renders correctly', () => {
  render(<Footer />);
  const footer = screen.getAllByTestId('footer');
  expect(screen.getByTestId('footer_left')).toHaveTextContent('EasyBanking POC web app');
  expect(screen.getByTestId('footer_right')).toHaveTextContent('©Alex Baranova');
});