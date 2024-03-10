async function fetchCurrencies() {
    try {
        const response = await axios.get('https://crowded-cyan-wildebeest.cyclic.app/students/available');
        const currencies = response.data;

        const currenciesDropdown = document.getElementById('currencies');
        currenciesDropdown.innerHTML = '';
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.text = `${currency.name} ${currency.symbol}`; 
            option.value = currency.code; 
            currenciesDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

document.getElementById('showPopup').addEventListener('click', function() {
    document.getElementById('pop-up-transaction').classList.add('show');
    fetchCurrencies();
  });

  document.getElementById('close-transaction').addEventListener('click', function() {
    document.getElementById('pop-up-transaction').classList.remove('show');
  });