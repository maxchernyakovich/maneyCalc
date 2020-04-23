


const totalBalance = document.querySelector('.total__balance'),
     totalMoneyIncome = document.querySelector('.total__money-income'),
     totalMoneyExpenses = document.querySelector('.total__money-expenses'),
     historyList = document.querySelector('.history__list'),
     operationName = document.querySelector('.operation__name'),
     operationAmount = document.querySelector('.operation__amount'),
     form = document.getElementById('#form');

let dbOperation = [
     {
          id: '1',
          description: 'Получил зарплату',
          amount: 30000,
     },
     {
          id: '2',
          description: 'Долг',
          amount: -1000,
     },
     {
          id: '3',
          description: 'Купить продукты',
          amount: -3000,
     },
     {
          id: '4',
          description: 'Купить одежду',
          amount: -5000,
     },
     {
          id: '5',
          description: 'Заказ на фрилансе',
          amount: 5000,
     },
];

const renderOperation = () => {

     const listItem = document.createElement('li');
     listItem.classList.add('history__item');
     listItem.innerHTML = `
     <span class="history__money">+30000 ₽</span>
     <button class="history_delete">x</button>
     `;

     historyList.append(listItem);

};

renderOperation();