async function fetchCurrencies() {
    try {
        const response = await axios.get('https://rich-erin-angler-hem.cyclic.app/students/available');
        const currencies = response.data;
        const currenciesDropdown = document.getElementById('currencies');
        currenciesDropdown.innerHTML = '';
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.text = `${currency.name} ${currency.symbol}`; 
            option.setAttribute('data-symbol', currency.symbol);
            option.value = currency.code; 
            currenciesDropdown.appendChild(option);
        });

        loadTransactions(currencies);
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function init() {
    try {
        await fetchCurrencies();
        loadTransactions();
        displayTotalBalance();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}