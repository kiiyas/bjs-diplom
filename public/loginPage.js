'use strict'

const userForm = new UserForm();

//при попытке авторизации
//data содержит логин и пароль, введённые в форму, будет передаваться внутри loginFormAction  /  registerFormAction()
userForm.loginFormCallback = function (data) {
  ApiConnector.login (data, callback => {callback.success ? location.reload() : userForm.setLoginErrorMessage(callback.error)}); //пробовал вписывать месседж, но все равно выдается стандартная форма эррора
}

//при попытке регистрации
userForm.registerFormCallback = function (data) {
  ApiConnector.register (data, callback => {callback.success ? location.reload() : userForm.setRegisterErrorMessage(callback.error)}); // та же ситуация.)))
}

/*
login: oleg@demo.ru, password: demo
login: ivan@demo.ru, password: demo
login: petr@demo.ru, password: demo
login: galina@demo.ru, password: demo
login: vladimir@demo.ru, password: demo
*/