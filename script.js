let records = [];

onload = () => {
    const currentRecords = JSON.parse(localStorage.getItem('records'));
    if (currentRecords) {
        records = currentRecords;
    }
    updateBalance();

    document.querySelector('#addRecordButton').onclick = () => {
        clearFields();
        show('screenAddRecord');
    };

    document.querySelector('#addRecordBackButton').onclick = () => {
        show('screenHome');
    };

    document.querySelector('#addRecordSaveButton').onclick = () => {
        addRecord()
    };
};

const show = (comp) => {
    document.querySelectorAll('body > .screen').forEach((c) => c.classList.add('hidden'));
    document.querySelector('#' + comp).classList.remove('hidden');
};

const addRecord = () => {
    let title = window.document.getElementById('inputTitle').value;
    let date = window.document.getElementById('inputDate').value;
    let type = window.document.getElementById('inputType').value;
    let quantity = window.document.getElementById('inputValue').value;

    if (title && date && type && quantity) {
        records.push({
            id: Math.random().toString().replace('0.', ''),
            title: title,
            date: date,
            type: type,
            quantity: quantity
        });

        sortRecords();
        saveRecords();
        clearFields();
        updateBalance();
        show('screenHome');
    } else {
        alert('Verifique se preencheu os campos corretamente')
    }
};

const clearFields = () => {
    window.document.getElementById('inputTitle').value = '';
    window.document.getElementById('inputDate').value = '';
    window.document.getElementById('inputType').value = '';
    window.document.getElementById('inputValue').value = '';
};

const sortRecords = () => {
    records.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
};

const saveRecords = () => {
    localStorage.setItem('records', JSON.stringify(records));
};

const updateBalance = () => {
    let totalExpenses = 0;
    let expenses = records.filter(function (record) {
        return record.type == '1';
    });
    expenses.forEach((record) => {
        totalExpenses += +record.quantity;
    });

    let totalIncomes = 0;
    let incomes = records.filter(function (record) {
        return record.type == '2';
    });
    incomes.forEach((record) => {
        totalIncomes += +record.quantity;
    });

    window.document.getElementById('totalExpenses').innerText = 'R$ ' + totalExpenses.toFixed(2);
    window.document.getElementById('totalIncomes').innerText = 'R$ ' + totalIncomes.toFixed(2);
    window.document.getElementById('balanceValue').innerText = 'R$ ' + (totalIncomes - totalExpenses).toFixed(2);

    if(records.length > 0){
        window.document.getElementById('noRecordsContent').classList.add('hidden');
    } else {
        window.document.getElementById('noRecordsContent').classList.remove('hidden');
    }
};