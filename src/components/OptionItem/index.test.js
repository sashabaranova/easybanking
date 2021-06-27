import { fireEvent, render, screen } from '@testing-library/react';
import OptionItem from './index';

test('clicking on item calls onOptionClick function', () => {
  const onOptionClick = jest.fn();
  render(<OptionItem onOptionClick={onOptionClick} />);
  screen.debug();

  fireEvent.click(screen.getByRole('button'));
  expect(onOptionClick).toHaveBeenCalledTimes(1);
});

test('handles name prop correctly', () => {
  render(<OptionItem name="Account" />);

  const item = screen.getByRole('button');
  expect(item).toHaveTextContent('Account');
});