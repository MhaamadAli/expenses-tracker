const transactions = getTransactions() || [];
const transactionsList = document.querySelector('.transactions-list');

function deleteTransaction(transactionId) {
    // Find the index of the transaction with the given ID
    const index = transactions.findIndex(transaction => transaction.id === transactionId);
    // If the transaction is found
    if (index !== -1) {
        // Remove the transaction from the array
        transactions.splice(index, 1);
        // Update the local storage with the modified array
        saveTransactions(transactions);
        // Reload the list of transactions
        loadTransactions();
    }
}

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
          <i class="fa-solid fa-pen-to-square update-icon" data-id="${transaction.id}"></i>
          <i class="fa-solid fa-trash-can delete-icon" data-id="${transaction.id}"></i>
        </div>`;
        transactionsList.appendChild(card);
    });

    const updateIcons = document.querySelectorAll('.update-icon');
    updateIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const transactionId = icon.getAttribute('data-id');
            updateTransaction(transactionId);
        });
    });
    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const transactionId = icon.getAttribute('data-id');
            deleteTransaction(transactionId);
        });
    });
}


function updateTransaction(transactionId) {
    const index = transactions.findIndex(transaction => transaction.id === transactionId);
    if (index !== -1) {
        const transaction = transactions[index];
        const newDescription = prompt('Enter new description:', transaction.name);
        const newAmount = parseFloat(prompt('Enter new amount:', transaction.amount));
        const newCurrency = prompt('Enter new currency:', transaction.symbol);
        if (newDescription && !isNaN(newAmount) && newCurrency) {
            transaction.name = newDescription;
            transaction.amount = newAmount;
            transaction.symbol = newCurrency;
            transactions[index] = transaction;
            saveTransactions(transactions);
            loadTransactions();
        } else {
            alert('Please fill out all fields correctly.');
        }
    }
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