function createNewTransaction(transactionData) {
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
