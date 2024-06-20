import { render, fireEvent, waitFor } from '@testing-library/react';

import { Form } from './Form';

describe('Form', () => {
  it('should render Form with children', () => {
    const { container, getByTestId } = render(
      <Form>
        <div data-testid="children"></div>
      </Form>,
    );

    expect(getByTestId('children')).toBeInTheDocument();
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('should invoke onSubmit', () => {
    const onSubmit = jest.fn();
    const { container } = render(<Form onSubmit={onSubmit} />);

    fireEvent.submit(container.querySelector('form'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should invoke onSuccess', async () => {
    const onSuccess = jest.fn();
    const { container } = render(
      <Form onSubmit={jest.fn()} onSuccess={onSuccess} />,
    );

    await fireEvent.submit(container.querySelector('form'));

    waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should invoke onError', async () => {
    const onError = jest.fn();
    const { container } = render(
      <Form onSubmit={() => Promise.reject('Test error')} onError={onError} />,
    );

    await fireEvent.submit(container.querySelector('form'));

    waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
