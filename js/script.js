document.addEventListener('DOMContentLoaded', () => {
    const numberInput  = document.getElementById('numberInput');
    const fromBase     = document.getElementById('fromBase');
    const toBase       = document.getElementById('toBase');
    const convertBtn   = document.getElementById('convertBtn');
    const swapBtn      = document.getElementById('swapBtn');
    const resultValue  = document.getElementById('resultValue');
    const errorMessage = document.getElementById('errorMessage');

    const resBin = document.getElementById('resBin');
    const resOct = document.getElementById('resOct');
    const resDec = document.getElementById('resDec');
    const resHex = document.getElementById('resHex');

    // Допустимые символы для каждой системы
    const validChars = {
        2:  /^[01]+$/,
        8:  /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-fA-F]+$/
    };

    /**
     * Конвертация числа из одной системы счисления в другую
     * @param {string} num   — строка с числом
     * @param {number} from  — исходная система (2, 8, 10, 16)
     * @param {number} to    — целевая система (2, 8, 10, 16)
     * @returns {string}     — результат или сообщение об ошибке
     */
    function convert(num, from, to) {
        // Убираем пробелы
        num = num.trim().replace(/\s/g, '');

        if (num === '') {
            return { error: 'Введите число для конвертации.' };
        }

        // Проверка валидности
        if (!validChars[from].test(num)) {
            const names = { 2: 'двоичной', 8: 'восьмеричной', 10: 'десятичной', 16: 'шестнадцатеричной' };
            return { error: `Число содержит недопустимые символы для ${names[from]} системы счисления.` };
        }

        // Перевод в десятичную
        const decimal = parseInt(num, from);

        if (isNaN(decimal)) {
            return { error: 'Не удалось распознать число.' };
        }

        // Перевод из десятичной в целевую
        const result = decimal.toString(to).toUpperCase();

        return { result, decimal };
    }

    /**
     * Обновление всех четырёх представлений числа
     */
    function updateAllResults(decimal) {
        resBin.textContent = decimal.toString(2);
        resOct.textContent = decimal.toString(8);
        resDec.textContent = decimal.toString(10);
        resHex.textContent = decimal.toString(16).toUpperCase();
    }

    /**
     * Основная функция конвертации
     */
    function doConvert() {
        const num  = numberInput.value;
        const from = parseInt(fromBase.value);
        const to   = parseInt(toBase.value);

        const output = convert(num, from, to);

        if (output.error) {
            resultValue.textContent = '—';
            errorMessage.textContent = output.error;
            return;
        }

        errorMessage.textContent = '';
        resultValue.textContent = output.result;
        updateAllResults(output.decimal);
    }

    // Обработчик кнопки конвертации
    convertBtn.addEventListener('click', doConvert);

    // Конвертация по нажатию Enter
    numberInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            doConvert();
        }
    });

    // Кнопка swap — поменять системы местами
    swapBtn.addEventListener('click', () => {
        const temp = fromBase.value;
        fromBase.value = toBase.value;
        toBase.value = temp;

        // Если уже есть результат — пересчитать
        if (numberInput.value.trim() !== '') {
            doConvert();
        }
    });

    // Авто-конвертация при смене системы счисления
    fromBase.addEventListener('change', () => {
        if (numberInput.value.trim() !== '') {
            doConvert();
        }
    });

    toBase.addEventListener('change', () => {
        if (numberInput.value.trim() !== '') {
            doConvert();
        }
    });
});