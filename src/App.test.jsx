import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';

import App from './App';
import { passwordValidationErrors } from './constants/validation';

describe('App', () => {
  it('should render App with form elements and title', () => {
    const { container, getByTestId } = render(<App />);

    const userName = screen.getByLabelText('User name');
    const password = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Create user' });

    expect(userName).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(getByTestId('app')).toBeInTheDocument();
    expect(container.querySelector('h1')).toBeInTheDocument();
  });
  it('should render error message', async () => {
    render(<App />);

    const userName = screen.getByLabelText('User name');
    const password = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Create user' });

    const errorMessage = screen.queryByText(passwordValidationErrors.length);

    act(() => {
      fireEvent.change(userName, { target: { value: 'Test' } });
      fireEvent.change(password, { target: { value: 'Test5^' } });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it('should render success message', async () => {
    render(<App />);

    const userName = screen.getByLabelText('User name');
    const password = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Create user' });

    const successMessage = screen.queryByText(/created with password/);

    act(() => {
      fireEvent.change(userName, { target: { value: 'Test' } });
      fireEvent.change(password, { target: { value: 'Password12345^' } });
      fireEvent.click(submitButton);
    });

    waitFor(() => {
      expect(successMessage).toBeInTheDocument();
    });
  });
});
