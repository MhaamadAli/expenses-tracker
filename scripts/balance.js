function calculateTotalBalance() {
    let totalBalance = 0;
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalBalance += parseFloat(transaction.amount);
        } else {
            totalBalance -= parseFloat(transaction.amount);
        }
    });
    return totalBalance;
}

function displayTotalBalance() {
    const totalBalance = calculateTotalBalance();
    console.log(totalBalance)
    const balanceElement = document.getElementById('totalBalance');
    balanceElement.textContent = `Total Balance: $${totalBalance.toFixed(2)} USD`;
}