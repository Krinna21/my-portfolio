// Validation Config
export const validationConfig = {
  formSelector: ".modal__form", // Select forms in modals
  inputSelector: ".modal__input", // Select inputs inside modals
  submitButtonSelector: ".modal__submit-btn", // Select the submit button
  inactiveButtonClass: "modal__submit-btn_disabled", // Class for disabled submit button
  inputErrorClass: "modal__input_type_error", // Class for input error state
  errorClass: "modal__error_visible", // Class for showing error messages
};

// Form Validation Functions
// Show error message
const showInputError = (formEl, inputEl, errorMsg, options) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(options.inputErrorClass);
};

// Hide error message
const hideInputError = (formEl, inputEl, options) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(options.inputErrorClass);
};

// Check input validity
const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
};

// Check if any input is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

// Toggle submit button state
export const toggleButtonState = (inputList, buttonEl, options) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(options.inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(options.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

// Set event listeners for the form
const setEventListeners = (formEl, options) => {
  const inputList = Array.from(formEl.querySelectorAll(options.inputSelector));
  const buttonElement = formEl.querySelector(options.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
  toggleButtonState(inputList, buttonElement, options);
};

// Enable validation on the forms
export const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formEl) => {
    setEventListeners(formEl, options);
  });
};

// Reset validation errors and button state
export const resetValidation = (formEl, options) => {
  const inputList = Array.from(formEl.querySelectorAll(options.inputSelector));
  const buttonEl = formEl.querySelector(options.submitButtonSelector);
  inputList.forEach((input) => {
    hideInputError(formEl, input, options);
  });
  toggleButtonState(inputList, buttonEl, options);
};
