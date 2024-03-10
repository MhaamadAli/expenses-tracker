document.getElementById('showPopup').addEventListener('click', function() {
    document.getElementById('pop-up-transaction').classList.add('show');
});

document.getElementById('close-transaction').addEventListener('click', function() {
    document.getElementById('pop-up-transaction').classList.remove('show');
});

document.addEventListener('DOMContentLoaded', init);
