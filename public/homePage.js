'use strict';

//Выход из личного кабинета
const logoutBtn = new LogoutButton;
logoutBtn.action = function () {
    ApiConnector.logout( callback => {        
        if (callback.success) {
            location.reload();
        } 
    })
}

//Получение информации о пользователе
ApiConnector.current(callback => {
    //console.log(callback);
    if (callback.success) {
        ProfileWidget.showProfile(callback.data);
    }
});


//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getValuteCurses() {
  ApiConnector.getStocks(callback => {
    //console.log(callback);
    if (callback.success) {      
      ratesBoard.clearTable();
      ratesBoard.fillTable(callback.data);
    }
  });
}
getValuteCurses();
setInterval(getValuteCurses, 60000);



//             ОПЕРАЦИИ С ДЕНЬГАМИ           

const moneyManager = new MoneyManager();

//Пополнение баланса
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, callback => {
        //console.log(callback);
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Баланс пополнен!');
        } else {
            moneyManager.setMessage(callback.error, 'Введите сумму!');
          }
    });
}

//Конвертирование валюты
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, callback => {
        //console.log(callback);
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Конвертация выполнена!')
        } else {
            moneyManager.setMessage(callback.error, 'Введите суммы!');
        }
    });       
}

//Перевод валюты
moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, callback => {  
        //console.log(callback);      
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, 'Перевод выполнен!')
        } else {
            moneyManager.setMessage(callback.error, 'Не введена сумма или получатель не найден!');
          };
    });       
}


//            РАБОТА С ИЗБРАННЫМ

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => { //начальный список избранного
    //console.log(callback);
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data); //выпадающий список для перевода денег
    }   
  });
  
  //добавления пользователя в список избранных
  favoritesWidget.addUserCallback = function (data) {
      ApiConnector.addUserToFavorites(data, callback => {
        //console.log(callback);
        if (callback.success) {
          favoritesWidget.setMessage(callback.success, 'Пользователь добавлен в список избраннных!');
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(callback.data);
          moneyManager.updateUsersList(callback.data);
        } else {
          favoritesWidget.setMessage(callback.error, 'Заполните все поля информации!');
        }
      });
    }
  
  //удаление пользователя из избранного
  favoritesWidget.removeUserCallback = function (data) {
      ApiConnector.removeUserFromFavorites(data, callback => {
        //console.log(callback);
        if (callback.success) {
          favoritesWidget.setMessage(callback.success, 'Пользователь удален из списка избранного!');
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(callback.data);
          moneyManager.updateUsersList(callback.data);
        } else {
          favoritesWidget.setMessage(callback.error, 'эээ!');
        }
      });
    }