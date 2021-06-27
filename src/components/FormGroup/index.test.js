import { fireEvent, render, screen } from '@testing-library/react';
import FormGroup from './index';

test('renders component based on type prop', () => {
  const { rerender } = render(<FormGroup />);
  expect(screen.getAllByRole('combobox').length).toEqual(1);

  rerender(<FormGroup type="text" />);
  expect(screen.getAllByRole('textbox').length).toEqual(1);

  rerender(<FormGroup type="submit" />);
  expect(screen.getByTestId('form_group')).toHaveTextContent('Confirm');
});

// SELECT

test('calls onSelectChange prop when selecting an option', () => {
  const onSelectChange = jest.fn();

  render(<FormGroup onSelectChange={onSelectChange} />);

  const select = screen.getByRole('combobox');
  fireEvent.change(select);
  expect(onSelectChange).toHaveBeenCalledTimes(1);
});

test('renders children correctly', () => {
  const child = <option>Account</option>;
  render(<FormGroup children={child} />);

  const select = screen.getByRole('combobox');
  expect(select).toHaveTextContent('Account');
});

// TEXT INPUT

test('calls onTextInputChange and onTextInputBlur correctly', () => {
  const onTextInputChange = jest.fn();
  const onTextInputBlur = jest.fn();

  render(
    <FormGroup
      type="text"
      onTextInputChange={onTextInputChange}
      onTextInputBlur={onTextInputBlur}
    />
  );

  const input = screen.getByRole('textbox');

  fireEvent.focus(input);
  fireEvent.blur(input);
  expect(onTextInputBlur).toHaveBeenCalledTimes(1);
  fireEvent.change(input, { target: { value: '1' } });
  expect(onTextInputChange).toHaveBeenCalledTimes(1);
});

test('handles placeholder prop correctly', () => {
  render(
    <FormGroup
      type="text"
      placeholder="Amount"
    />
  );

  expect(screen.getAllByPlaceholderText('Amount').length).toEqual(1);
});

test('handles hasError and errorMessage props correctly', () => {
  render(
    <FormGroup
      type="text"
      hasError
      errorMessage="Error"
    />
  );

  expect(screen.getByRole('textbox')).toHaveClass('formGroup__input_invalid');
  expect(screen.getByTestId('form_group')).toHaveTextContent('Error');
});
