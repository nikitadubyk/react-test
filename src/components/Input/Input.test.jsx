import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Input } from '.';

const placeholder = 'Test placeholder';

describe('Input', () => {
  it('should render the input', () => {
    render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should render the input with correct type', () => {
    render(<Input type="checkbox" placeholder={placeholder} />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render the input with correct class names', () => {
    const inputClassName = 'test-input-class-name';
    const containerClassName = 'test-container-class-name';

    render(
      <Input
        placeholder={placeholder}
        inputClassName={inputClassName}
        containerClassName={containerClassName}
      />,
    );

    const container = screen.getByTestId('inputContainer');
    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toHaveClass(inputClassName);
    expect(container).toHaveClass('formControl');
    expect(container).toHaveClass(containerClassName);
  });

  it('should render the input w/o label', () => {
    render(<Input />);

    const container = screen.getByTestId('inputContainer');

    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('should render the input with correct label', () => {
    const labelText = 'Some label';
    render(<Input label={labelText} />);

    const label = screen.getByText(labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render the input with correct value', () => {
    const value = 'Some value';
    render(<Input value={value} placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toHaveValue(value);
  });

  //   it('should render the input with correct value', () => {
  //     const value = 'Some value';
  //     render(<Input value={value} />);

  //     expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  //   });

  it.only('should invoke onChange callback', async () => {
    const onChange = jest.fn();
    render(<Input value="123" onChange={onChange} placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);

    await userEvent.type(input, '12345');

    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
