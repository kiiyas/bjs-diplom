'use strict';

//Выход из личного кабинета
const logoutBtn = new LogoutButton;
logoutBtn.action = function () {
    ApiConnector.logout( callback => { 
        if (callback.success) location.reload() 
    })
}

//Получение информации о пользователе
ApiConnector.current(callback => {
    if (callback.success) {ProfileWidget.showProfile(callback.data)}
});


//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getValuteCurses() {
  ApiConnector.getStocks(callback => {
    if (callback.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(callback.data);
    }
  });
}
getValuteCurses();
setInterval(getValuteCurses, 60000);



//             ОПЕРАЦИИ С ДЕНЬГАМИ           

//Пополнение баланса
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (this.data) {
    ApiConnector.addMoney(this.data, callback) {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(isSuccess, 'Баланс пополнен!')
        }
    }
}

//Конвертирование валюты
moneyManager.conversionMoneyCallback = function (this.data) {
    ApiConnector.convertMoney(this.data, callback) {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(isSuccess, 'Конвертация выполнена!')
        }
    }        
}

//Перевод валюты
moneyManager.sendMoneyCallback = function (this.data) {
    ApiConnector.transferMoney(this.data, callback) {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(isSuccess, 'Перевод выполнен!')
        }
    }        
}
