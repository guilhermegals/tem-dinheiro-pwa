let records = [];

onload = () => {
    const currentRecords = JSON.parse(localStorage.getItem('records'));
    if (currentRecords) {
        records = currentRecords;
    }

    document.querySelector('#addRecordButton').onclick = () => {
        show('screenAddRecord');
    };
};

const show = (comp) => {
    let listaDeTelas = document.querySelectorAll('body > .screen');
    listaDeTelas.forEach((c) => c.classList.add('hidden'));
    document.querySelector('#' + comp).classList.remove('hidden');
  };