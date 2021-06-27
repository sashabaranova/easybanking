import { fireEvent, render, screen } from '@testing-library/react';
import Button from './index';

test('handles name prop correctly', () => {
  render(<Button name="My Button"/>);
  expect(screen.getByRole('button')).toHaveTextContent('My Button');
});

test('has .btn_gray class if prop secondary is passed', () => {
  render(<Button name="My Button" secondary/>);
  expect(screen.getByRole('button')).toHaveClass('btn_gray');
});


test('calls onPressBtn function (props) on button click', () => {
  const onPressBtn = jest.fn();
  render(<Button name="My Button" onPressBtn={onPressBtn} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(onPressBtn).toHaveBeenCalledTimes(1);
});