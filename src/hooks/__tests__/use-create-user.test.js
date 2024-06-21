import { act, renderHook } from '@testing-library/react';

import { useCreateUser } from '../use-create-user';
import { passwordValidationErrors } from '../../constants/validation';

describe('useCreateUser', () => {
  it('should return an object with correct properties', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current).toHaveProperty('onError');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('onSuccess');
    expect(result.current).toHaveProperty('errorMessage');
    expect(result.current).toHaveProperty('successMessage');
  });

  it('should set success message', () => {
    const name = 'John';
    const password = 'Qwerty1234%';

    const { result } = renderHook(useCreateUser);

    expect(result.current.successMessage).toBe('');

    act(() => {
      result.current.onSuccess({ name, password });
    });

    expect(result.current.successMessage).toBe(
      `User ${name} created with password ${password}`,
    );
  });

  it('should set error message', () => {
    const error = 'Some error';

    const { result } = renderHook(useCreateUser);

    expect(result.current.errorMessage).toBe('');

    act(() => {
      result.current.onError({ message: error });
    });

    expect(result.current.errorMessage).toBe(error);
  });

  it('should throw an error', async () => {
    const { result } = renderHook(useCreateUser);

    await expect(result.current.onSubmit({ password: '1234' })).rejects.toThrow(
      passwordValidationErrors.length,
    );
  });

  it('should not throw an error', async () => {
    const { result } = renderHook(useCreateUser);

    await expect(
      result.current.onSubmit({ password: 'Qwerty12345^$' }),
    ).resolves.toBe();
  });
});
