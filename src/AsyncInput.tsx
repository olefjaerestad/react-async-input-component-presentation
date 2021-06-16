import React, { useEffect, useRef, useState } from 'react';

type TAsyncInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

/**
 * Use this when `value` prop is updated asynchronously.
 * Acts as a drop-in replacement for the regular `<input>` element.
 * 
 * Motivations:
 * Avoid cursor jumping to the end while typing.
 * Display value immediately while typing.
 * Display all characters typed, not just the last one.
 * 
 * Todo:
 * Add forwardRef. 
 * Optimizations (useMemo, useCallback, etc).
 * Edge case when multiple `<AsyncInput>`s are using same value and you type in one 
 * then quickly move cursor to next. Cursor is then moved automatically to end 
 * due to mismatch between local state and Redux state.
 */
export const AsyncInput: React.FC<TAsyncInputProps> = function({value: valueProp, onChange: onChangeProp, ...props}) {
  const [value, setValue] = useState<typeof valueProp>(valueProp);
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clearTimeoutCallback();

    const inputHasFocus = document.activeElement === inputRef.current;

    timeoutId.current = setTimeout(() => {
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
      value={value}
      onChange={handleChange}
      ref={inputRef}
    />
  );
}
