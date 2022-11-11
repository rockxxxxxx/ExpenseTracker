import { useState } from "react";

export default function useFormValidator(valueIsValid) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = valueIsValid(enteredValue);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const onBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched("");
  };

  return {
    value: enteredValue,
    isValid: isValid,
    hasError,
    inputChangeHandler,
    onBlurHandler,
    setEnteredValue,
    reset,
  };
}
