
const generateId = () => `maxProId${Math.round(Math.random() * 1e8).toString(16)}`;

const totalBalance = document.querySelector('.total__balance'),
     totalMoneyIncome = document.querySelector('.total__money-income'),
     totalMoneyExpenses = document.querySelector('.total__money-expenses'),
     historyList = document.querySelector('.history__list'),
     operationName = document.querySelector('.operation__name'),
     operationAmount = document.querySelector('.operation__amount'),
     //form = document.getElementById('#form');
     form = document.querySelector('.form__submit');

let dbOperation = JSON.parse(localStorage.getItem('calc')) || [];

const renderOperation = (operation) => {

     const className = operation.amount < 0 ?
          'history__item-minus' :
          'history__item-plus';

     const listItem = document.createElement('li');
     listItem.classList.add('history__item');
     listItem.classList.add(className);
     listItem.innerHTML = `${operation.description}
     <span class="history__money">${operation.amount}</span>
     <button class="history_delete" data-id= "${operation.id}">x</button>
     `;

     historyList.append(listItem);

};

// деление элементов массива dbOperation на 2 разных массива и вывод их на страницу
const updateBalance = () => {

     const resultIncome = dbOperation
     .filter((item) => item.amount > 0)
     .reduce((result, item) => result + item.amount, 0);


     const resultExpenses = dbOperation
     .filter((item) => item.amount < 0)
     .reduce((result, item) => result + item.amount, 0);

     totalMoneyIncome.textContent = resultIncome + '₽';
     totalMoneyExpenses.textContent = resultExpenses + '₽';
     totalBalance.textContent = (resultIncome + resultExpenses) + '₽'; 

}

const addOperation = (event) => {
     event.preventDefault();

     const operationNameValue = operationName.value,
          operationAmountValue = operationAmount.value;

     operationName.style.borderColor = '';
     operationAmount.style.borderColor = '';

     if (operationNameValue !== '' && operationAmountValue !== '') {

          const operation = {
               id: generateId(),
               description: operationNameValue,
               amount: +operationAmountValue,
          };

          dbOperation.push(operation);
          init();
     } else {
          if (!operationNameValue) operationName.style.borderColor = 'red';
          if (!operationAmountValue) operationAmount.style.borderColor = 'red';
     }

     operationName.value = '';
     operationAmount.value = '';
};

// удаляет элементы
const deleteOperation = (event) => {

     const target = event.target;

     if (target.classList.contains('history_delete')) {
          dbOperation = dbOperation
               .filter((operation) => operation.id !== target.dataset.id);
          init();
     }


};

const init = () => {

     historyList.textContent = '';

     dbOperation.forEach(renderOperation);
     // тоже самое что
     /* dbOperation.forEach((item, i, arr) => {
          renderOperation(item);
     });*/
     // и тоже самое что
     /* for (let i = o; i < dbOperation.length; i++) {
          renderOperation(dbOperation[i]);
     }; */

     updateBalance();

     localStorage.setItem('calc', JSON.stringify(dbOperation));

};

form.addEventListener('submit', addOperation);
historyList.addEventListener('click', deleteOperation);

init();