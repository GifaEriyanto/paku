import React, { useState, useEffect, forwardRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { IInput, TInputType } from './input.types';
import {
  InputStyled,
  InputWrapper,
  InputAddonBefore,
  InputAddonAfter,
  ShowPassword,
  NumberHandler,
  NumberHandlerButtonStyles,
} from './input.styles';
import Button from '../button';

const Input: React.FC<IInput> = forwardRef(
  (
    {
      customStyle,
      addonAfter,
      addonBefore,
      error,
      onFocus,
      onBlur,
      onChange,
      type = 'text',
      min,
      max,
      step = 1,
      value,
      noExtraControl,
      ...props
    },
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState<TInputType>(type);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
      if (value) {
        setInputValue(value);
      }
    }, [value]);

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true);
      onFocus && onFocus(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(false);
      onBlur && onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
      onChange && onChange(e);
    };

    const handleShowPassword = () => {
      if (inputType === 'password') {
        setInputType('text');
      } else {
        setInputType('password');
      }
    };

    const handleIncrement = () => {
      const number = Number(inputValue);
      setInputValue(String(number + step));
    };

    const handleDecrement = () => {
      const number = Number(inputValue);
      setInputValue(String(number - step));
    };

    const incrementDisabled = () => {
      if (max !== undefined && Number(inputValue) >= max - step) {
        return true;
      }
      return false;
    };

    const decrementDisabled = () => {
      if (min !== undefined && Number(inputValue) <= min + step) {
        return true;
      }
      return false;
    };

    const isAddonBefore = () => {
      if (addonBefore) {
        return (
          <InputAddonBefore
            className="paku-input-addon-before"
            data-testid="paku-input-addon-before"
          >
            {addonBefore}
          </InputAddonBefore>
        );
      }
      return null;
    };

    const isAddonAfter = () => {
      if (type === 'password' && !noExtraControl) {
        return (
          <ShowPassword
            className="paku-input-addon-show-password"
            onClick={handleShowPassword}
            data-testid="paku-input-show-password"
          >
            {inputType === 'password' ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </ShowPassword>
        );
      }

      if (type === 'number' && !noExtraControl) {
        return (
          <NumberHandler className="paku-input-addon-number-handler">
            <Button
              size="small"
              variant="neutral"
              outline
              customStyle={NumberHandlerButtonStyles}
              onClick={handleDecrement}
              disabled={decrementDisabled()}
              data-testid="paku-input-number-decrement"
            >
              <IoMdRemove />
            </Button>
            <Button
              size="small"
              variant="neutral"
              outline
              customStyle={NumberHandlerButtonStyles}
              onClick={handleIncrement}
              disabled={incrementDisabled()}
              data-testid="paku-input-number-increment"
            >
              <IoMdAdd />
            </Button>
          </NumberHandler>
        );
      }

      if (addonAfter) {
        return (
          <InputAddonAfter
            className="paku-input-addon-after"
            data-testid="paku-input-addon-after"
          >
            {addonAfter}
          </InputAddonAfter>
        );
      }

      return null;
    };

    return (
      <InputWrapper
        focus={focus}
        customStyle={customStyle}
        error={error}
        data-testid="paku-input-wrapper"
      >
        {isAddonBefore()}
        <InputStyled
          type={inputType}
          value={inputValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleChange}
          data-testid="paku-input"
          ref={ref}
          {...props}
        />
        {isAddonAfter()}
      </InputWrapper>
    );
  },
);

Input.displayName = 'Input';

export default Input;
