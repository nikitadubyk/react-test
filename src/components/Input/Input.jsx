import cn from 'clsx';
import { useId } from 'react';

import style from './Input.module.css';

const Input = ({
  name,
  value,
  label,
  onChange,
  placeholder,
  type = 'text',
  inputClassName,
  containerClassName,
}) => {
  const id = useId();

  return (
    <div
      data-testid="inputContainer"
      className={cn(style.formControl, containerClassName)}
    >
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(style.input, inputClassName)}
      />
    </div>
  );
};

export { Input };
