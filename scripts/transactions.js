const transactions = getTransactions() || [];
const transactionsList = document.querySelector('.transactions-list');


function loadTransactions(currencies) {
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const card = document.createElement('div');
        card.classList.add('card', 'mono-regular', 'rounded', 'p1');
        card.innerHTML = `
        <div class="transaction-name m-left">${transaction.name}</div>
        <div class="type m-left">Type: ${transaction.type}</div>
        <div class="amount m-left">Amount: ${transaction.amount} ${transaction.symbol}</div>
        <div class="icons flex-row">
          <i class="fa-solid fa-pen-to-square" data-id="${transaction.id}"></i>
          <i class="fa-solid fa-trash-can" data-id="${transaction.id}"></i>
        </div>`;
        transactionsList.appendChild(card);
    });
}

function createNewTransaction(transactionData) {
    
    transactionData.type = document.getElementById('type').value;

    
    const currencySelect = document.getElementById('currencies');
    
    transactionData.symbol = currencySelect.options[currencySelect.selectedIndex].getAttribute('data-symbol');

    transactionData.id = Date.now().toString();
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transactionData);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



document.getElementById('addTransactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const transactionData = {};
    formData.forEach((value, key) => {
        transactionData[key] = value;
    });
    createNewTransaction(transactionData);
    document.getElementById('pop-up-transaction').classList.remove('show');
});
