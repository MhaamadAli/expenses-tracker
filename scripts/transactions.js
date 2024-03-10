const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const transactionsList = document.querySelector('.transactions-list');


function loadTransactions(currencies) {
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const card = document.createElement('div');
        card.classList.add('card', 'mono-regular', 'rounded', 'p1');
        
        const nameElement = document.createElement('div');
        nameElement.classList.add('transaction-name', 'm-left');
        nameElement.textContent = transaction.name;
        card.appendChild(nameElement);

        const typeElement = document.createElement('div');
        typeElement.classList.add('type', 'm-left');
        typeElement.textContent = `Type: ${transaction.type}`;
        card.appendChild(typeElement);
        
        const amountElement = document.createElement('div');
        amountElement.classList.add('amount', 'm-left');
        amountElement.textContent = `Amount: ${transaction.amount} ${transaction.symbol}`;
        card.appendChild(amountElement);

        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons', 'flex-row');

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid', 'fa-pen-to-square');
        editIcon.setAttribute('data-id', transaction.id);
        iconsContainer.appendChild(editIcon);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
        deleteIcon.setAttribute('data-id', transaction.id);
        iconsContainer.appendChild(deleteIcon);

        card.appendChild(iconsContainer);
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
