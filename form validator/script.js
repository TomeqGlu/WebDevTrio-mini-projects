const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message) {
  const wrapper = input.parentNode;
  const errorNode = wrapper.querySelector('.error-message');
  input.classList.add('error');
  input.classList.remove('success');
  errorNode.innerHTML = message;
  console.log(message);
}

// Show succes outline
function showSuccess(input) {
  const wrapper = input.parentNode;
  const errorNode = wrapper.querySelector('.error-message');

  input.classList.remove('error');
  input.classList.add('success');
  errorNode.innerText = '';
}

//Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
  if(re.test(input.value.trim())) {
    showSuccess(input);    
  } else {
    showError(input, 'Email is not valid');
    
  }
}

// Check input length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be less then ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check password match
function chcekPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords dont match');
  }
}

// Check required fields
function ValidateForm (inputArr) {
  inputArr.forEach( function (input) {
    if(input.value.trim() === '') {
      showError(input, `${input.id} is required`);
    } else {
      checkLength(username, 3, 15);
      checkLength(password, 6, 25);
      checkLength(password2, 6, 25);
      checkEmail(email);
      chcekPasswordMatch(password, password2);
    }
  }) 
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  ValidateForm ([username, email, password, password2]); 
  
});