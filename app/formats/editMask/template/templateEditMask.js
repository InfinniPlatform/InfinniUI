function TemplateEditMask () {
    this.mask = null;
    this.maskSaveLiteral = true;
    this.maskPlaceHolder = '_';
}

_.extend(TemplateEditMask.prototype, editMaskMixin);

_.extend(TemplateEditMask.prototype, {
    /**
     * @private
     * @description Построение объекта для форматирования значения
     * @param {string} [text] Значение
     * @returns {Array}
     */
    buildTemplate: function (text) {
        var template = [];
        var mask = this.mask;

        var i = 0, ln = mask.length, char, prevChar = '';

        while(i < mask.length) {
            char = mask.substr(i, 1);
            if (char === '\\') {
                char = mask.substr(i + 1, 1);

                if (typeof this.masks[char] !== 'undefined') {  //Экранипрованная маска
                    template.push(char);
                    mask = [mask.substring(0, i), mask.substr(i + 1)].join('');
                    i = i + 1;
                } else {
                    template.push('\\');
                }
                continue;
            }

            if (typeof this.masks[char] !== 'undefined') {
                    template.push({
                        mask: char,
                        text: "",
                        position: i
                    });
            } else {
                template.push(char);
            }
            i = i + 1;
        }
        this.template = template;
        this.setValue(text);
        return template;
    },

    /**
     * @private
     * @description Получение регулярного выражения для разбора значения согласно шаблона маски ввода
     * @returns {RegExp}
     */
    getRegExpForMask: function () {
        var i = 0;
        var ln = this.mask.length;
        var char, next;
        var result = [];
        var decorator = ['(', ')'];
        var r = /([\+\^\*\(\)\|\{\}\[\]\.])/; //Маска для экранирования спец символов

        var store = function (pattern, skip) {
            skip = !!skip;
            result.push(skip ? pattern : decorator.join(pattern));
        };

        while(i < ln) {
            char = this.mask.substr(i, 1);
            if (typeof this.masks[char] !== 'undefined') {
                //Метасимвол маски ввода
                store(this.masks[char].regexp);
            } else if (char === '\\') {
                next = this.mask.substr(i + 1, 1);
                if (typeof this.masks[next] !== 'undefined') {   //Экранированный метасимвол маски ввода
                    if (this.maskSaveLiteral) {
                        store(next, true);
                        i = i + 1;
                    }
                } else {
                    if (this.maskSaveLiteral) {
                        store('\\\\', true);
                    }
                }
            } else {    //Не экранирующий символ и не менасимвол
                if (this.maskSaveLiteral) {
                    store( r.test(char) ? char.replace(r, '\\$1') : char, true);
                }
            }
            i = i + 1;
        }

        return new RegExp('^' + result.join('') + '$');
    },

    /**
     * Установка значения
     * @param value
     */
    setValue: function (value) {

        if (value === null || typeof value === 'undefined') {
            value = '';
        }

        value = value + '';
        var regexp = this.getRegExpForMask();
        var parts;
        var part;
        var i, ln;
        var template;

        parts = (regexp.test(value)) ? value.match(regexp).slice(1) : [];

        for (i = 0, ln = this.template.length; i < ln; i = i + 1) {
            template = this.template[i];
            if (typeof template === 'string') continue;
            part = parts.shift();
            template.text = (typeof part === 'undefined') ? '' : part[0];
        }
    },

    /**
     * Получение введенного значения
     * @returns {string|*}
     */
    getValue: function () {
        var template = this.template;
        var result = [];
        var text;

        if (!Array.isArray(template)) {
            return;
        }
        for (var i = 0, ln = template.length; i < ln; i = i + 1) {
            if (typeof template[i] === 'string' && this.maskSaveLiteral) {
                result.push(template[i]);
            } else {
                text = template[i].text;
                if (text !== null && text !== '' && typeof text !== 'undefined') {
                    result.push(text);
                }
            }
        }

        return result.join('');
    },

    moveToNextChar: function (position) {
        position = Math.max(position, 0);
        var template = this.template;

        var test = template.slice(position);

        var i, ln, index = null;

        var start = false;
        for (i = 0, ln = test.length; i < ln; i = i + 1) {
            if (typeof test[i] === 'string') {
                start = true;
                continue;
            }
            index = test[i].position - (start ? 1 : 0);
            break;
        }

        if (index === null) {
            test = template.slice(0, position);
            for (i = test.length - 1; i >= 0; i = i - 1) {
                if (typeof test[i] === 'string') {
                    continue;
                }
                index = test[i].position;
                break;
            }
        }

        return (index === null) ? 0 : index + 1;
    },

    moveToPrevChar: function (position) {
        position = Math.max(position, 0);
        var template = this.template;

        var test = template.slice(0, position);

        var i, ln, index = null;

        var end = false;
        for (i = test.length - 1; i >= 0; i = i - 1) {
            if (typeof test[i] === 'string'){
                end = true;
                continue;
            }
            index = test[i].position + (end ? 1 : 0);
            break;
        }

        if (index === null) {
            test = template.slice(position);
            for (i = 0, ln = test.length; i < ln; i = i + 1) {
                if (typeof test[i] === 'string') continue;
                index = test[i].position;
                break;
            }
        }

        return (index === null) ? 0 : index;
    },

    /**
     * @private
     * @description Получить элемент шаблона в заданной позиции
     * @param {Integer} position
     * @returns {*}
     */
    getItemTemplate: function (position) {
        var template = this.template;
        var item;
        var left = 0;
        var width;
        var index;
        var result = null;

        if (!Array.isArray(template)) {
            return null;
        }

        for (var i = 0, ln = template.length; i < ln; i = i + 1) {
            item = template[i];
            if (typeof item === 'string') {
                left += item.length;
            } else {
                width = Math.max(this.masks[item.mask].width, item.text.length);
                if (position < left || position >= left && position <= left + width) {
                    index = position - left;
                    result = {
                        item: item,
                        left: left,
                        width: width,
                        index: position - left
                    };
                    break;
                }
                left += width;
            }
        }
        return result;
    },

    deleteCharRight: function (position, len) {
        var template;
        var i, ln;
        var left;

        if (len > 0) {
            return this.deleteSelectedText(position, len);
        }

        for (i = 0, ln = this.template.length; i < ln; i = i + 1) {
            template = this.template[i];

            if (typeof template === 'string' || template.position < position) {
                continue;
            }
            position = template.position + 1; // Перенос каретки на 1 символ вправо для корректной работы DEL
            template.text = '';
            break;
        }

        return position;
    },

    deleteCharLeft: function (position, len) {
        var template;
        var i, ln;
        var left;

        if (len > 0) {
            return this.deleteSelectedText(position, len);
        }

        for (i = this.template.length - 1; i >= 0; i = i - 1) {
            template = this.template[i];

            if (typeof template === 'string' || template.position >= position) {
                continue;
            }
            position = template.position;
            template.text = '';
            break;
        }

        return position;
    },

    /**
     * Вставка в маску
     * @param clipboardText
     * @param position
     */
    pasteStringToMask: function(clipboardText, position){
        clipboardText = clipboardText.replace(/\D/gi, '');

        var arraySymbols = clipboardText.split('');

        var firstItem = this.getItemTemplate(position);
        var firstIndexItem = this.template.indexOf(firstItem.item), lastIndexItem = 0;

        var lastItem = getLastTemplate(this.template);
        if(lastItem) {
            lastIndexItem = this.template.indexOf(lastItem);
        }else{
            lastIndexItem = firstIndexItem;
        }

        var tLength = 0, maxLength = 0;

        for(var i = firstIndexItem; i < lastIndexItem+1; i++) {
            if (typeof this.template[i] == "object") {
                if (i == firstIndexItem) {
                    maxLength = maxTemplateLength(this.template[i]);
                    tLength = maxLength - (position-this.template[i].position);

                    var first = this.template[i].text.slice(0, position - this.template[i].position);

                    //TODO: вставка 0, если предыдущих значений нет
//                    var zero = '';
//                    if(!first) {
//                        for (var d = 0; d < position - this.template[i].position; d++) {
//                            zero = zero + '0';
//                        }
//                    }

                    this.template[i].text = first + clipboardText.slice(0, tLength);
                    arraySymbols.splice(0, tLength)
                }else{
                    if(i != lastIndexItem){
                        maxLength = maxTemplateLength(this.template[i]);

                        this.template[i].text = arraySymbols.join('').slice(0, maxLength);
                        arraySymbols.splice(0, maxLength);
                    }else{
                        maxLength = maxTemplateLength(this.template[i]);

                        if(arraySymbols.length > maxLength) arraySymbols.splice(maxLength, arraySymbols.length);
                        this.template[i].text = arraySymbols.join('') + this.template[i].text.slice(arraySymbols.length, maxLength);
                    }
                }
            }
        }

        function maxTemplateLength(template){
            return Math.max(template.mask.length, template.text.length)
        }

        function getLastTemplate(template) {
            var dotLength = 0;
            var arr = [];
            for (var i = firstIndexItem; i < template.length; i++) {
                if (typeof template[i] == "object") {
                    if (clipboardText.length > template[i].position - dotLength - position) {
                        arr.push(template[i]);
                    }
                } else {
                    dotLength = dotLength + template[i].length;
                }
            }
            return arr[arr.length-1];
        }
    },

    clearText: function (position, len) {
        var tmpl;
        var startFrom;

        for (var i = 0, ln = this.template.length; i < ln; i = i + 1) {
            tmpl = this.template[i];

            if (typeof tmpl === 'string') {
                continue;
            }

            if (tmpl.position >= position && tmpl.position < position + len) {
                if (typeof startFrom === 'undefined') {
                    startFrom = tmpl.position;
                }
                tmpl.text = '';
            }
        }

        return startFrom;
    },

    /**
     * Обработка нажатия символа в указанной позиции
     * @param char
     * @param position
     */
    setCharAt: function (char, position, len) {
        var template;
        var mask;
        var text;

        if (typeof len === 'undefined') {
            len = 0;
        }

        if (len > 0) {
            this.clearText(position, len);
        }

        for (var i = 0, ln = this.template.length; i < ln; i = i + 1) {
            template = this.template[i];
            if (typeof template === 'string') { //Статический текст
                continue;
            }
            if (template.position === position) {    //Маска ввода
                mask = this.masks[template.mask];
                text = char.substr(0,1);
                if (mask.validate(text)) {
                    template.text = text;
                    position = this.getNextItemMask(position);
                }
                break;
            }
            if (template.position > position) {
                break;
            }
        }
        return position;
    },

    deleteSelectedText: function(position, len, char){
        var startFrom = this.clearText(position, len);

        if (typeof char !== 'undefined') {
            startFrom = this.setCharAt(char, position);
        }

        return startFrom;
    },

    getNextItemMask: function (position) {
        var template;
        var i, ln;
        var last;
        var index;

        for (i = this.template.length - 1; i >= 0; i = i - 1) {
            template = this.template[i];
            if (typeof template === 'string') {
                continue;
            }
            if (template.position <= position) {
                position = typeof last === 'undefined' ? this.moveToNextChar(position) : last;
                break;
            }
            last = template.position;
        }

        return position;
    },

    getText: function () {
        var template = this.template;
        var result = [];
        var text;

        for (var i = 0, ln = template.length; i < ln; i = i + 1) {
            if (typeof template[i] === 'string') {
                result.push(this.parseSpecialChars(template[i]));
            } else {
                text = template[i].text;
                if (typeof text === 'undefined' || text === '' || text === null) {
                    result.push(this.maskPlaceHolder);
                } else {
                    result.push(text);
                }
            }
        }
        return result.join('');
    },

    /**
     * Проверка что маска была полностью заполнена
     * @returns {boolean}
     */
    getIsComplete: function () {
        var i, ln;
        var template;
        var mask;
        var complete = true;

        for (i = 0, ln = this.template.length; i < ln; i = i + 1) {
            template = this.template[i];
            if (typeof template === 'string') {
                continue;
            }
            mask = this.masks[template.mask];
            complete = mask.getIsComplete(template.text);
            if (!complete) {
                break;
            }
        }

        return complete;
    },

    /**
     * Установка начального значения
     * @param value
     */
    reset: function (value) {
        this.value = null;

        if (typeof value !== 'undefined' && value !== null) {
            this.value = value;
        }

        this.buildTemplate(value);
    },

    /**
     * @private
     * @description Трансляция специальных символом в шаблоне маски ввода в соотвествующие установленной локали
     * @param {string} text
     * @returns {string}
     */
    parseSpecialChars: function (text) {
        var localization = InfinniUI.localizations[InfinniUI.config.lang];
        var map = {
            '/': localization.dateTimeFormatInfo.dateSeparator,
            ':': localization.dateTimeFormatInfo.timeSeparator,
            '%': localization.numberFormatInfo.percentSymbol,
            '$': localization.numberFormatInfo.currencySymbol
        };

        var i, ln, data = [];

        for (var char in map) {
            if (!map.hasOwnProperty(char)) {
                continue;
            }

            data = text.split('');
            for (i = 0, ln = data.length; i < ln; i = i + 1) {
                if (data[i] === char) {
                    data[i] = map[char];
                }
            }

            text = data.join('');
        }

        return text;
    },

    masks: {
        'c': new TemplateMaskPart('c'),
        'C': new TemplateMaskPart('C'),
        'l': new TemplateMaskPart('l'),
        'L': new TemplateMaskPart('L'),
        'a': new TemplateMaskPart('a'),
        'A': new TemplateMaskPart('A'),
        '#': new TemplateMaskPart('#'),
        '9': new TemplateMaskPart('9'),
        '0': new TemplateMaskPart('0')
    }

});
