function NumberEditMask () {
    this.mask = null;
    this.format = null;
}

window.InfinniUI.NumberEditMask = NumberEditMask;


_.extend(NumberEditMask.prototype, editMaskMixin);


_.extend(NumberEditMask.prototype, {

    placeholder: '_',

    /**
     * Получение десятичного разделителя для текущего формата
     * @returns {String}
     */
    getDecimalSeparator: function () {
        var itemTemplate = this.getItemTemplate();
        var item = itemTemplate.item;
        var regexp = /^[npc]/i;
        var matches = item.mask.match(regexp);
        var separator;
        if (matches && matches.length > 0) {
            switch (matches[0]) {
                case 'n':
                case 'N':
                    separator = localized.numberFormatInfo.numberDecimalSeparator;
                    break;
                case 'p':
                case 'P':
                    separator = localized.numberFormatInfo.percentDecimalSeparator;
                    break;
                case 'c':
                case 'C':
                    separator = localized.numberFormatInfo.currencyDecimalSeparator;
                    break;
            }
        }

        return separator;
    },

    getDecimalDigits: function () {
        var itemTemplate = this.getItemTemplate();
        var item = itemTemplate.item;
        var regexp = /^([npc])(\d*)$/i;
        var matches = item.mask.match(regexp);
        var decimalDigits = 0;
        if (matches && matches.length > 0) {

            if (matches[2] !== '') {
                decimalDigits = +matches[2];
            } else {
                switch (matches[0]) {
                    case 'n':
                    case 'N':
                        decimalDigits = localized.numberFormatInfo.numberDecimalDigits;
                        break;
                    case 'p':
                    case 'P':
                        decimalDigits = localized.numberFormatInfo.percentDecimalDigits;
                        break;
                    case 'c':
                    case 'C':
                        decimalDigits = localized.numberFormatInfo.currencyDecimalDigits;
                        break;
                }
            }
        }
        return decimalDigits;
    },

    /**
     * Установка начального значения
     * @param value
     */
    reset: function (value) {
        this.value = null;

        if (typeof value !== 'undefined' && value !== null && value !== '') {
            value = +value;
            if (isNaN(value)) {
                value = null;
            }
            this.value = value;
        }

        this.template = this.buildTemplate(value);
    },

    buildTemplate: function (value) {
        var r = /([npc])(\d*)/i;

        var mask = this.mask;

        var template = [];

        var that = this;

        mask.replace(r, function (mask, name, precision, position, text) {
            //Часть перед шаблоном
            template.push(text.slice(0, position));
            //Шаблон
            template.push({
                mask: mask,
                text: (value === null) ? "" : that.formatMask(value, mask),
                value: value
            });
            //Часть после шаблона
            template.push(text.substring(position + mask.length));
        });

        return this.template = template;
    },

    getText: function () {
        var result = [];
        var item;

        if (!Array.isArray(this.template)) {
            return;
        }

        for (var i = 0, ln = this.template.length; i < ln; i = i + 1) {
            item = this.template[i];
            if (typeof item === 'string') {
                result.push(item);
            } else {
                if (typeof item.value === 'undefined' || item.value === null) {
                    //Отдаем маску ввода
                    result.push(this.formatMask(0, item.mask).replace(/0/g, this.placeholder));
                } else {
                    //Отдаем форматированное значени
                    result.push(this.formatMask(item.value, item.mask));
                }
            }
        }

        return result.join('');
    },

    formatMask: function (value, mask) {
        return (value === null || typeof value === 'undefined') ? '' : this.format.format(value, undefined, mask);
    },

    /**
     * Переход к предыдущему символу в строке ввода
     * @param {number} position
     * @returns {number}
     */
    moveToPrevChar: function (position) {
        position = (position > 0) ? position - 1 : 0;
        var itemTemplate = this.getItemTemplate();
        var item = itemTemplate.item;
        var text = item.text;
        var index;
        var start;

        if (position < itemTemplate.left) {
            index = text.search(/\d/);
            position = (index === -1) ?  itemTemplate.left : itemTemplate.left + index;
        } else {
            start = position - itemTemplate.left + 1;
            //Переход к первой цифре слева от позиции
            var txt = text.substring(0, start);
            if (/\d/.test(txt)) {   //Слева есть цифры
                index = txt.length - txt.split('').reverse().join('').search(/\d/);
                if (index === start) {
                    index--;
                }
            } else {    //
                index = Math.max(0, text.search(/\d/));
            }

            position = itemTemplate.left + index;
        }

        return position;
    },

    /**
     * Переход к следущему символу в строке ввода
     * @param {number} position
     * @returns {number}
     */
    moveToNextChar: function (position) {
        position = (position < 0) ? 0 : position + 1;

        var itemTemplate = this.getItemTemplate();
        var item = itemTemplate.item;
        var text = item.text + " ";
        var start = Math.max(0, position - itemTemplate.left);
        var index;


        //Переход к первой цифре справа от позиции

        var r = /\d/;
        var last = 0;
        var char;
        for (var i = 0, ln = text.length; i < ln; i = i + 1) {
            if (r.test(text[i]) === false) {
                char =  text[i-1];
                if (typeof char !== 'undefined' && !r.test(char)) {
                    continue;
                }
            }
            if (i < start) {
                last = i;
            } else {
                index = i;
                break;
            }
        }
        if (typeof index === 'undefined') {
            index = last;
        }

        position = itemTemplate.left + index;
        return position;
    },

    /**
     * Обработка нажатия символа в указанной позиции
     * @param char
     * @param position
     */
    setCharAt: function (char, position) {
        var itemTemplate = this.getItemTemplate();
        var left = itemTemplate.left;
        var item = itemTemplate.item;
        var text = item.text;
        var decimalSeparator = this.getDecimalSeparator();
        var index;

        if (char === '-' && item.value !== null) {  //Смена знака
            item.value = -item.value;
            item.text = this.formatMask(item.value, item.mask);
            position += item.text.length - text.length;
        } else if (position >= itemTemplate.left && position <= itemTemplate.left + text.length) {
            //Позиция попадает в маску ввода
            index = position - left;

            if (char == decimalSeparator) { //Нажат разделитель
                if (item.value === null){
                    item.value = 0;
                    item.text = this.formatMask(item.value, item.mask);
                }
                //Переход на первую цифру дробной части
                if (item.text.indexOf(decimalSeparator) !== -1) {
                    position = left + item.text.indexOf(decimalSeparator) + decimalSeparator.length;
                }

            } else if (/\d/.test(char)) {  //Нажата цифра
                var fractional;

                fractional = text.indexOf(decimalSeparator) > -1 && index > text.indexOf(decimalSeparator);
                item.value = this.parseText([text.slice(0, index), char, text.slice(index)].join(''), item.value);
                item.text = this.formatMask(item.value, item.mask);

                if (text === '') {
                    position = this.moveToNextChar(left);
                } else {
                    position = (fractional) ?  position + 1: position + item.text.length - text.length;
                    position = Math.min(position, left + this.getIndexOfEndDigit(item.text));
                }
            }
        }

        return position;
    },

    /**
     * @private
     * @description увеличивает или уменьшает на 1 значение цифры слева от каретки.
     * @param position
     * @param delta
     * @returns {*}
     */
    updateDigitValue: function (position, delta) {
        var itemTemplate = this.getItemTemplate();
        var left = itemTemplate.left;
        var item = itemTemplate.item;
        var text = item.text;
        var index;


        if (position < itemTemplate.left || position > itemTemplate.left + text.length) {
            //Позиция не попадает в маску ввода
            return this.moveToNextChar(position);
        }

        index = position - left;

        if (index > 0) {
            var digit = text.substr(index - 1, 1);
            if (/\d/.test(digit)) {
                digit = parseInt(digit,10) + delta;
                if (digit > 9) digit = 9;
                if (digit < 0) digit = 0;
                item.value = this.parseText([text.slice(0, index - 1), digit, text.slice(index)].join(''), item.value);
                item.text = this.formatMask(item.value, item.mask);
            }

        }
        return position;
    },

    setNextValue: function (position) {
       return this.updateDigitValue(position, 1);
    },

    setPrevValue: function (position) {
        return this.updateDigitValue(position, -1);
    },

    /**
     * Удаление выделенного текста
     * @param position
     * @param len
     * @param char
     * @returns {*}
     */
    deleteSelectedText: function(position, len, char){
        var itemTemplate = this.getItemTemplate();
        var item = itemTemplate.item;
        var text = item.text;
        var val = (item.value === null || typeof item.value === 'undefined') ? '' : item.value.toString();
        var endLength = len + position;
        if(!char)char = "";

        var preventPosition = text.slice(0, position);
        var preventLength = text.slice(0, endLength);

        var spacePreventPosition = (preventPosition.split(" ").length - 1);
        var spacePreventLength = (preventLength.split(" ").length - 1);

        position = position - spacePreventPosition;
        endLength = endLength - spacePreventLength;

        var res = val.slice(0, position) + char + val.slice(endLength, val.length);
        var masktext = this.formatMask(res, item.mask);

        if(char){
            position += char.length+spacePreventPosition;
            position += formatSpace(masktext, position);
        }else{
            position += formatSpace(masktext, position);
        }

        function formatSpace(text, position){
            return text.slice(0, position).split(" ").length - 1;
        }

        if(_.isEmpty(res)){
            res = null;
        }

        this.reset(res);

        return res ? position : 0;
    },

    /**
     * Удаление символов справа от позиции курсора
     * @param position
     * @param len
     * @returns {*}
     */
    deleteCharRight: function (position, len) {

        if (len > 0) {
            return this.deleteSelectedText(position, len);
        }
        var itemTemplate = this.getItemTemplate();
        var left = itemTemplate.left;
        var item = itemTemplate.item;
        var text = item.text;
        var decimalSeparator = this.getDecimalSeparator();
        var index;

        if (position < itemTemplate.left || position > itemTemplate.left + text.length) {
            //Не попадаем в маску
            return this.moveToNextChar(0);
        }

        if (text.length === len) {
            return this.clearValue(item);
        }
        //Позиция попадает в маску ввода
        index = position - left;

        var decimalSeparatorIndex = text.indexOf(decimalSeparator);

        var i = text.substr(index).search(/\d/);
        if (item.value === 0) {
            item.value = null;
            item.text = this.formatMask(item.value, item.mask);
            position = left;
        } else if (i > -1){
            i += index;
            var parts = text.split(decimalSeparator);
            if (index === parts[0].length) { //Находимся в целой части, на границе с дробно - удаляем всю дробную
                item.value = this.parseText(parts[0], item.value);
            } else {
                item.value = this.parseText([text.substr(0, i), text.substr(i + 1)].join(''), item.value);
            }

            //item.value = this.parseText([text.substr(0, i), text.substr(i + 1)].join(''), item.value);
            item.text = this.formatMask(item.value, item.mask);
            if (i < decimalSeparatorIndex) {
                //Находились в целой части, должны в ней и остаться
                //position = left + Math.min(i, item.text.indexOf(decimalSeparator));
                position = left + Math.min(i - (text.length - 1 - item.text.length ), item.text.indexOf(decimalSeparator));
            }
        }

        return position;
    },

    clearValue: function (item) {
        item.value = null;
        item.text = this.formatMask(item.value, item.mask);

        return 0;
    },

    deleteCharLeft: function (position, len) {
        var itemTemplate = this.getItemTemplate();
        var left = itemTemplate.left;
        var item = itemTemplate.item;
        var text = item.text;
        var decimalSeparator = this.getDecimalSeparator();
        var decimalSeparatorIndex = text.indexOf(decimalSeparator);
        var index;
        if (position < itemTemplate.left || position > itemTemplate.left + text.length) {
            //Не попадаем в маску
            return this.moveToNextChar(0);
        }
        //Позиция попадает в маску ввода
        var decimalDigits = this.getDecimalDigits();
        index = position - left;

        if (text.length === len) {
            return this.clearValue(item);
        }

        var fractional = false;
        if (index <= 0) {
            return position;
        }

        if (decimalSeparatorIndex > -1) {
            fractional = index > decimalSeparatorIndex;
            if ((index === text.length - decimalDigits)) {
                //Позиция сразу справа от разделителя - переносим ее в целую часть
                index -= decimalSeparator.length;
                position -= decimalSeparator.length;
            }
        }

        var txt = text.slice(0, index);

        var i = (/\d/.test(txt)) ? txt.length - txt.split('').reverse().join('').search(/\d/) - 1 : 0;
        
        item.value = this.parseText(text.slice(0, i) + text.slice(i + 1), item.value);
        item.text = this.formatMask(item.value, item.mask);

        position = fractional ? position - 1 : position + item.text.length - text.length;

        if (item.value === 0 && position <= 1) {
            item.value = null;
            item.text = this.formatMask(item.value, item.mask);
            position = left;
        }

        return position;
    },

    getValue: function () {
        var value;
        var itemTemplate = this.getItemTemplate();

        if (itemTemplate) {
            value = itemTemplate.item.value;
        }
        return value;
    },

    /**
     * Возвращает позицию указывающую за последнюю цифку м строке
     * @param text
     * @returns {Number}
     */
    getIndexOfEndDigit: function (text) {
        var index = text.split('').reverse().join('').search(/\d/);
        return (index === -1) ? index : text.length - index;
    },

    /**
     * Переводит форматированное представление в числовое
     * @param text
     * @param {number} oldValue
     * @returns {number}
     */
    parseText: function (text, oldValue) {
        var itemTemplate = this.getItemTemplate();
        var item = itemTemplate.item;
        var mask = item.mask;

        var decimalSeparator = this.getDecimalSeparator();
        var decimalDigits = this.getDecimalDigits();
        var parts = text.split(decimalSeparator);
        var value;

        parts = parts.map(function (item, index) {
            var txt = item.replace(/[^\d]/g, '');
            return (index === 1) ? txt.substr(0, decimalDigits) : txt;
        });


        text = parts.join('.');

        if (text === '') {
            value = null;
        } else {
            value = +text;

            if (oldValue < 0) {
                value = -value;
            }

            if (/^p/.test(mask)) {
                value = value / 100;
            }
        }
        return value;
    },

    /**
     * Возвращает часть шаблона для ввода значения
     * @returns {*}
     */
    getItemTemplate: function () {
        var template = this.template;
        var item;
        var left = 0;
        var result = null;

        if (typeof  template === 'undefined') {
            this.reset();
            template = this.template;
        }

        if (!Array.isArray(template)) {
            return null;
        }
        for (var i = 0, ln = template.length; i < ln; i = i + 1) {
            item = template[i];
            if (typeof item === 'string') {
                left += item.length;
            } else {
                result = {
                    item: item,
                    left: left
                };
                break;
            }
        }

        return result;
    },

    /**
     * Проверка что маска была полностью заполнена
     */
    getIsComplete: function () {

        return true;
    }
});

