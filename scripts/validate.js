const config = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  errorClass: 'popup__form-item_error'
}

const checkInputValidity = function(formElement, inputElement, {errorClass, ...rest}) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass);
  }
}


const showInputError = function(formElement, inputElement, errorMessage, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(errorClass);
};


const hideInputError = function(formElement, inputElement, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(errorClass);
}

const setEventListeners = (fieldset, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
  const buttonElement = fieldset.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldset, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};


function hasInvalidInput(inputList) {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  })
}

const disableBtn = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableBtn = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}


function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonElement, inactiveButtonClass);
  } else {
    enableBtn(buttonElement, inactiveButtonClass);
  }
}

const enableValidation = ({formSelector, fieldsetSelector, inactiveButtonClass, submitButtonSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      disableBtn(evt.target.querySelector(submitButtonSelector), inactiveButtonClass)
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
    }
  )});
};

enableValidation(config);
