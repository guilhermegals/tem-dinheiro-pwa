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

    document.querySelector('#updateRecordBackButton').onclick = () => {
        show('screenHome');
    };

    document.querySelector('#updateRecordSaveButton').onclick = () => {
        updateRecord()
    };

    document.querySelector('#updateRecordDeleteButton').onclick = () => {
        deleteRecord();
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

const updateRecord = () => {
    let title = window.document.getElementById('inputUpdateTitle').value;
    let date = window.document.getElementById('inputUpdateDate').value;
    let type = window.document.getElementById('inputUpdateType').value;
    let quantity = window.document.getElementById('inputUpdateValue').value;

    if (title && date && type && quantity) {
        let id = window.document.getElementById('recordId').innerText;
        records = records.filter((record) => record.id != id);

        records.push({
            id: id,
            title: title,
            date: date,
            type: type,
            quantity: quantity
        });

        sortRecords();
        saveRecords();
        clearFieldsUpdate();
        updateBalance();
        show('screenHome');
    } else {
        alert('Verifique se preencheu os campos corretamente')
    }
};

const deleteRecord = () => {
    let id = window.document.getElementById('recordId').innerText;
    records = records.filter((record) => record.id != id);

    sortRecords();
    saveRecords();
    updateBalance();
    clearFieldsUpdate();
    show('screenHome');
};

const clearFields = () => {
    window.document.getElementById('inputTitle').value = '';
    window.document.getElementById('inputDate').value = '';
    window.document.getElementById('inputType').value = '';
    window.document.getElementById('inputValue').value = '';
};

const clearFieldsUpdate = () => {
    window.document.getElementById('inputUpdateTitle').value = '';
    window.document.getElementById('inputUpdateDate').value = '';
    window.document.getElementById('inputUpdateType').value = '';
    window.document.getElementById('inputUpdateValue').value = '';
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

    let balance = totalIncomes - totalExpenses;
    window.document.getElementById('totalExpenses').innerText = 'R$ ' + totalExpenses.toFixed(2);
    window.document.getElementById('totalIncomes').innerText = 'R$ ' + totalIncomes.toFixed(2);
    window.document.getElementById('balanceValue').innerText = 'R$ ' + (balance).toFixed(2);

    if(balance > 0){
        window.document.getElementById('balanceValue').classList.remove('expenses');
        window.document.getElementById('balanceValue').classList.add('incomes');
    } else if (balance < 0) { 
        window.document.getElementById('balanceValue').classList.remove('incomes');
        window.document.getElementById('balanceValue').classList.add('expenses');
    } else {
        window.document.getElementById('balanceValue').classList.remove('expenses');
        window.document.getElementById('balanceValue').classList.remove('incomes');
    }

    if(records.length > 0){
        window.document.getElementById('noRecordsContent').classList.add('hidden');
    } else {
        window.document.getElementById('noRecordsContent').classList.remove('hidden');
    }

    showRecords();
};

const showRecords = () => {
    const list = window.document.getElementById('records');
    list.innerHTML = '';

    records.forEach((record) => {
        let template = window.document.getElementById('recordTemplate').cloneNode(true);
        template.classList.remove('hidden');
        template.querySelector('.recordTitle').innerText = record.title;
        template.querySelector('.recordDate').innerText = record.date;
        let ammount = parseFloat(record.quantity, 10);
        template.querySelector('.recordValue').innerText = 'R$ ' + ammount.toFixed(2);


        if(record.type == '1') {
            template.classList.add('expensesLight')
        } else {
            template.classList.add('incomesLight')
        }

        template.setAttribute('id', record.id);

        template.onclick = () => {
            window.document.getElementById('recordId').innerText = record.id;
            window.document.getElementById('inputUpdateTitle').value = record.title;
            window.document.getElementById('inputUpdateDate').value = record.date;
            window.document.getElementById('inputUpdateType').value = record.type;
            window.document.getElementById('inputUpdateValue').value = record.quantity;
            show('screenUpdateRecord');
        };

        list.appendChild(template);
    });
}