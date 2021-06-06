import React, { useEffect, useRef, useState } from 'react';

export type TAsyncInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

/**
 * Use this when `value` prop is updated asynchronously.
 * Acts as a drop-in replacement for the regular `<input>` element.
 */
// https://github.com/mlaursen/react-md/issues/572
// TODO: Understand how long the timeout _must_ be and why.
// TODO: Add support for ref.
export const AsyncInput: React.FC<TAsyncInputProps> = function({onChange: onChangeProp, value: valueProp, ...props}) {
  const [value, setValue] = useState<typeof valueProp>(valueProp);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clearTimeoutCallback();

    const inputHasFocus = document.activeElement === inputRef.current;

    timeoutId.current = setTimeout(() => {
      console.log('AsyncInput: Update `value` based on Redux change');
      setValue(valueProp);
    }, inputHasFocus ? 500 : 0);
  }, [valueProp]);

  function clearTimeoutCallback() {
    timeoutId.current && clearTimeout(timeoutId.current);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeoutCallback();

    setValue(e.target.value);
    onChangeProp && onChangeProp(e);
  }

  return (
    <input
      {...props} 
      onChange={handleChange}
      value={value} 
      ref={inputRef}
    />
  );
}
