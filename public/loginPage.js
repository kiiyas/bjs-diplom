'use strict'

const userForm = new UserForm();

//при попытке авторизации
//data содержит логин и пароль, введённые в форму, будет передаваться внутри loginFormAction  /  registerFormAction()
userForm.loginFormCallback = function (data) {
  ApiConnector.login (data, callback => callback.success ? location.reload() : userForm.setLoginErrorMessage('Error!'));
}

//при попытке регистрации
userForm.registerFormCallback = function (data) {
  ApiConnector.register (data, callback => callback.success ? location.reload() : userForm.setRegisterErrorMessage('Error!'));
}

/*
login: oleg@demo.ru, password: demo
login: ivan@demo.ru, password: demo
login: petr@demo.ru, password: demo
login: galina@demo.ru, password: demo
login: vladimir@demo.ru, password: demo
*/