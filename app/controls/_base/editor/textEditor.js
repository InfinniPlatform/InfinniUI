/**
 * Редактор значений, используемый при вводе текста с использованием масок ввода данных
 *
 * Активизируется при получении фокуса ввода элементом {@see textEditorMixin.onFocusControlHandler},
 * скрывая поле ввода элемента и отображая собственное поле редактирование с заданной маской ввода.
 *
 * Подключается к элементу ввода посредством миксина {@see textEditorMixin}.
 */
var TextEditor = Backbone.View.extend({

    templateTextBox: InfinniUI.Template["controls/_base/editor/template/editorTextBox.tpl.html"],
    templateTextArea: InfinniUI.Template["controls/_base/editor/template/editorTextArea.tpl.html"],

    UI: {
        editor: ".pl-control-editor",
        icon: "i"
    },

    events: {
        'blur .pl-control-editor': 'onBlurEditorHandler',
        'keydown .pl-control-editor': 'onKeyDownEditorHandler',
        'keypress .pl-control-editor': 'onKeyPressEditorHandler',
        'keyup .pl-control-editor': 'onKeyUpEditorHandler',
        'click .pl-control-editor': 'onClickEditorHandler',
        'focus .pl-control-editor': 'onFocusEditorHandler',
        'paste .pl-control-editor': 'onPasteEditorHandler',
        'contextmenu .pl-control-editor': 'onContextMenuEditorHandler',
        'mousewheel .pl-control-editor': 'onMouseWheelEditorHandler',
        'mouseleave .pl-control-editor': 'onMouseLeaveEditorHandler'
    },

    /**
     * options.parent {Backbone.View} ролительский элемент управления
     * options.el Элемент в который рендерить редактор
     * options.validate Коллбек для проверки введенного значения
     * options.done Коллбек для установки значения в контроле
     * @param options
     */
    initialize: function (options) {
        //Сразу скрываем редактор
        this.$el.hide();
        this.options = options;
        this.inFocus = false;
        this.on('editor:show', this.onShowEditorHandler);
        this.on('editor:hide', this.onHideEditorHandler);
        this.on('editor:update', this.onUpdateEditorHandler);
        this.isValid = true;

        return this.render();
    },

    render: function () {
        if (this.options.multiline) {
            this.$el.html(this.templateTextArea({lineCount: this.options.lineCount}));
        } else {
            this.$el.html(this.templateTextBox({inputType: this.options.inputType}));
        }
        this.bindUIElements();

        return this;
    },

    setIsValid: function (isValid) {
        if (isValid === this.isValid) return;
        this.isValid = isValid;
        this.toggleValidateState(isValid);
    },

    toggleValidateState: function (isValid) {
        var error;
        this.$el.toggleClass('input-icon right has-error', isValid !== true);
        this.ui.icon.toggle(isValid !== true);
    },

    setValue: function (value) {
        var editMask = this.getOptions('editMask');
        var displayValue;
        //Если указана маска ввода - форматируем значение, иначе выводим как есть.
        if (typeof editMask === 'undefined' || editMask === null) {
            displayValue = value;
        } else {
            editMask.reset(value);
            displayValue = editMask.getText();
        }
        this.ui.editor.val(displayValue);
        this.setIsValid(true);//По умолчанию считаем переданное значение валидно
    },

    getValue: function () {
        var editMask = this.getOptions('editMask');
        var convert = this.getOptions('convert');
        if (editMask) {
            return editMask.getValue();
        } else {
            return convert(this.ui.editor.val());
        }
    },

    isInFocus: function () {
        return this.inFocus;
    },

    /**
     * @description Обработчик события установки значения поля редактирования
     * @param {*} value
     */
    onUpdateEditorHandler: function (value) {
        this.setValue(value);
    },

    /**
     * Обработчик сообщения на отображение поля ввода
     * Показать поле редактирование и установить на нем фокус ввода
     * @param value
     */
    onShowEditorHandler: function (value, skipRefocus) {
        this.cancelled = false;
        this.setValue(value);
        this.$el.show();
        if (!skipRefocus) {
            this.ui.editor.focus();
        }
        this.checkCurrentPosition();
        this.inFocus = true;
    },

    onHideEditorHandler: function () {
        this.$el.hide();
    },
    onKeyDownEditorHandler: function (event) {

        if (event.ctrlKey || event.altKey) {
            return;
        }

        if (event.which === 27) {    //Escape
            //Отменить изменения и выйти из режима редактирования
            this.cancelled = true;
            this.trigger('editor:hide');
        }

        var maskEdit = this.getOptions('editMask');
        if (typeof maskEdit === 'undefined' || maskEdit === null) {
            return;
        }
        var editor = this.ui.editor;
        var elem = editor.get(0);
        var position;

        switch (event.which) {
            case 36:    //Home
                if(event.shiftKey) {
                    elem.selectionEnd = parseInt(elem.selectionEnd, 10);
                }else {
                    position = maskEdit.moveToPrevChar(0);
                    if (position !== false) {
                        this.setCaretPosition(position);
                        event.preventDefault();
                    }
                }
                break;
            case 37:    //Left arrow
                if(event.shiftKey) {
                    elem.selectionEnd = parseInt(elem.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(elem.selectionStart, 10));
                    }else {
                        position = maskEdit.moveToPrevChar(this.getCaretPosition());
                        if (position !== false) {
                            this.setCaretPosition(position);
                            event.preventDefault();
                        }
                    }
                }
                break;
            case 39:    //Right arrow
                if(event.shiftKey) {
                    elem.selectionEnd = parseInt(elem.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(elem.selectionEnd, 10));
                    }else {
                        position = maskEdit.moveToNextChar(this.getCaretPosition());
                        if (position !== false) {
                            this.setCaretPosition(position);
                            event.preventDefault();
                        }
                    }
                }
                break;
            case 35:    //End
                position = maskEdit.moveToNextChar(editor.val().length);
                if (position !== false) {
                    this.setCaretPosition(position);
                    event.preventDefault();
                }
                break;
            case 38:    //Up arrow
                if(event.shiftKey) {
                    elem.selectionEnd = parseInt(elem.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(elem.selectionStart, 10));
                    }else {
                        position = maskEdit.setNextValue(this.getCaretPosition());
                        if (position !== false) {
                            event.preventDefault();
                            editor.val(maskEdit.getText());
                            this.setCaretPosition(position);
                        }
                    }
                }
                break;
            case 40:    //Down arrow
                if(event.shiftKey) {
                    elem.selectionEnd = parseInt(elem.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(elem.selectionEnd, 10));
                    }else {
                        position = maskEdit.setPrevValue(this.getCaretPosition());
                        if (position !== false) {
                            event.preventDefault();
                            editor.val(maskEdit.getText());
                            this.setCaretPosition(position);
                        }
                    }
                }
                break;
            case 46:    //Delete
                // @TODO Если выделена вся строка - очистить поле редактирования
                //TODO: доделать SelectionLength
                if (this.getSelectionLength() > 0 && !(maskEdit.value instanceof Date)) {
                    event.preventDefault();
                    this.removeSelection(maskEdit);
                } else {
                    position = maskEdit.deleteCharRight(this.getCaretPosition(), this.getSelectionLength());
                    if (position !== false) {
                        event.preventDefault();
                        editor.val(maskEdit.getText());
                        this.setCaretPosition(position);
                    }
                }
                break;
            case 8:    //Backspace
                // @TODO Если выделена вся строка - очистить поле редактирования
                //TODO: доделать SelectionLength
                if (this.getSelectionLength() > 0 && !(maskEdit.value instanceof Date)) {
                    event.preventDefault();
                    this.removeSelection(maskEdit);
                } else {
                    position = maskEdit.deleteCharLeft(this.getCaretPosition(), this.getSelectionLength());
                    if (position !== false) {
                        event.preventDefault();
                        editor.val(maskEdit.getText());
                        this.setCaretPosition(position);
                    }
                }
                break;
            case 32:    //Space
                if (this.getSelectionLength() > 0 && !(maskEdit.value instanceof Date)) {
                    event.preventDefault();
                    this.removeSelection(maskEdit);
                }else {
                    position = maskEdit.getNextItemMask(this.getCaretPosition());
                    if (position !== false) {
                        event.preventDefault();
                        this.setCaretPosition(position);
                    }
                }
                break;

            default:
                //TODO: не работает для DateTimeFormat
                //TODO: доделать SelectionLength замена выделенного текста, по нажатию

                if((event.keyCode >= 96 && event.keyCode <= 105)){
                    event.keyCode = event.keyCode - 48; //hotfix for numpad keys
                }

                var inp = String.fromCharCode(event.keyCode);
                if (!isNaN(parseFloat(inp)) && isFinite(inp)){
                    if (this.getSelectionLength() > 0 && !(maskEdit.value instanceof Date)) {
                        event.preventDefault();
                        //Data
                        this.removeSelection(maskEdit, String.fromCharCode(event.keyCode));
                    }
                }
                break;
        }
    },

    removeSelection: function(mask, char){
        var res = mask.deleteSelectedText(this.getCaretPosition(), this.getSelectionLength(), char);
        mask.reset(res.result);

        this.ui.editor.val(mask.getText());

        if(!res.result){
            this.setCaretPosition(0);
        }else{
            this.setCaretPosition(res.position);
        }
    },

    checkCurrentPosition: function () {
        var maskEdit = this.getOptions('editMask');
        if (typeof maskEdit === 'undefined' || maskEdit === null) {
            return;
        }
        var currentPosition = this.getCaretPosition();
        var position = currentPosition === 0 ? maskEdit.moveToPrevChar(0) : maskEdit.moveToNextChar(currentPosition - 1);
        if (position !== currentPosition) {
            this.setCaretPosition(position);
        }

    },

    onClickEditorHandler: function (event) {
        this.checkCurrentPosition();
        event.preventDefault();
    },

    onFocusEditorHandler: function () {
        var maskEdit = this.getOptions('editMask');
        if (typeof maskEdit === 'undefined' || maskEdit === null) {
            return;
        }
        var position = maskEdit.moveToPrevChar(0);
        this.setCaretPosition(position);
        this.inFocus = true;
    },

    onKeyUpEditorHandler: function (event) {
        this.trigger('onKeyDown', {
            keyCode: event.which,
            value: this.parseInputValue()
        });
    },

    onKeyPressEditorHandler: function (event) {
        if (event.altKey || event.ctrlKey) {
            return;
        }

        var maskEdit = this.getOptions('editMask');
        if (typeof maskEdit === 'undefined' || maskEdit === null) {
            return;
        }

        var editor = this.ui.editor;
        var char = this.getCharFromKeypressEvent(event);
        var position;

        if (char === null) {
            return;
        }


        position = maskEdit.setCharAt(char, this.getCaretPosition(), this.getSelectionLength());
        if (position !== false) {
            event.preventDefault();
            editor.val(maskEdit.getText());
            this.setCaretPosition(position);
        }
    },

    onPasteEditorHandler: function (event) {
        var maskEdit = this.getOptions('editMask');
        var editor = this.ui.editor;

        if (typeof maskEdit === 'undefined' || maskEdit === null) {
            return;
        }

        var text = (event.originalEvent || event).clipboardData.getData('text/plain') || prompt('Paste something..');
        maskEdit.pasteStringToMask(text, this.getCaretPosition());

        event.preventDefault();
        editor.val(maskEdit.getText());
        //@TODO Реализовать обработку вставки значения из буфера обмена
    },

    onContextMenuEditorHandler: function (event) {
        event.preventDefault();
        this.checkCurrentPosition();
    },

    onMouseWheelEditorHandler: function (event) {
        var maskEdit = this.getOptions('editMask');
        if (typeof maskEdit === 'undefined' || maskEdit === null) {
            return;
        }

        event.preventDefault();
        //@TODO Реализовать изменение значений при прокретке колеса
    },

    onMouseLeaveEditorHandler: function (event) {
        var inFocus = event.currentTarget == document.activeElement;
        if (!inFocus && this.isValid) {
            this.$el.hide();
            this.onBlurEditorHandler();
        }
    },

    /**
     * @private
     * Получение нажатого символа в событии keypress
     * @see {@link http://learn.javascript.ru/keyboard-events#получение-символа-в-keypress}
     * @param event
     * @returns {String}
     */
    getCharFromKeypressEvent: function (event) {
        if (event.which == null) {  // IE
            if (event.keyCode < 32) return null; // спец. символ
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which < 32) return null; // спец. символ
            return String.fromCharCode(event.which); // остальные
        }

        return null; // спец. символ
    },

    /**
     * @private
     * Получение позиции курсора в поле редактирования
     * @see {@link http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field}
     * @returns {number}
     */
    getCaretPosition: function () {
        var elem = this.ui.editor.get(0);
        // Initialize
        var position = 0;

        // IE Support
        if (document.selection) {

            // Set focus on the element
            elem.focus();

            // To get cursor position, get empty selection range
            var selection = document.selection.createRange();

            // Move selection start to 0 position
            selection.moveStart('character', -elem.value.length);

            // The caret position is selection length
            position = selection.text.length;
        }

        // Firefox support
        else if (elem.selectionStart || elem.selectionStart == '0')
            position = elem.selectionStart;

        return position;
    },

    getSelectionLength: function () {
        var elem = this.ui.editor.get(0);
        var len = 0;
        var startPos = parseInt(elem.selectionStart, 10);
        var endPos = parseInt(elem.selectionEnd, 10);


        if (!isNaN(startPos) && !isNaN(endPos)) {
            len = endPos - startPos;
        }

        return len;
    },

    /**
     * @private
     * Установка позиции курсора в поле редактирования
     * @see {@link http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox}
     * @param {Integer} [position=0]
     */
    setCaretPosition: function (position) {
        var elem = this.ui.editor.get(0);

        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', position);
            range.select();
        }
        else {
            if (typeof elem.selectionStart !== 'undefined') {
                elem.setSelectionRange(position, position);
            }
        }
    },

    /**
     * Обработка ппотери фокуса полем ввода
     *
     * При потере фокуса надо проверить что введенное значение удовлетваряет контрол.
     * Если значение контрол принял - скрыть поле ввода, отобразить исходный контрол и вызвать setValue
     * Если контрол значение не принял - поле ввода не скрывать, установить ошибку
     */
    onBlurEditorHandler: function () {
        this.inFocus = false;

        if (this.cancelled) {
            //Выход из поля редактора с отменой изменений
            return;
        }
        var control = this.getOptions('parent');
        var done = this.getOptions('done');
        var validate = this.getOptions('validate');
        var convert = this.getOptions('convert');
        var value = convert(this.ui.editor.val());
        var editMask = this.getOptions('editMask');
        var complete = true;

        //Убираем маску при потере фокуса
        if (typeof editMask !== 'undefined' && editMask !== null) {
            if (!editMask.getIsComplete(this.ui.editor.val())) {
                value = null;
                editMask.reset(value);
                this.trigger('editor:hide');
            } else {
                complete = editMask.getIsComplete(value);
                value = editMask.getValue();
            }
        }

        if (typeof validate !== 'undefined' && validate !== null) {
            var isValid = complete && validate(value);
            this.setIsValid(isValid);

            if (!isValid) {
                //Если значение невалидно - редактор не закрываемю
                return;
            }
        }

        if (typeof done !== 'undefined' && done !== null) {
            //Если указан коллбек на установку значения - вызываем его
            done(editMask ? editMask.getData() : value);
        }
        //Триггерим событие для скрытия поля редактирования
        this.trigger('editor:hide');
    },

    parseInputValue: function () {
        var control = this.getOptions('parent');
        var done = this.getOptions('done');
        var validate = this.getOptions('validate');
        var convert = this.getOptions('convert');
        var value = convert(this.ui.editor.val());
        var editMask = this.getOptions('editMask');
        var complete = true;

        if (typeof editMask !== 'undefined' && editMask !== null) {
            if (!editMask.getIsComplete(this.ui.editor.val())) {
                return;
            } else {
                complete = editMask.getIsComplete(value);
                value = editMask.getValue();
            }
        }

        if (typeof validate !== 'undefined' && validate !== null) {
            var isValid = complete && validate(value);
            if (!isValid) {
                //Если значение невалидно
                return;
            }
        }

        return editMask ? editMask.getData() : value;
    },

    getOptions: function (name) {
        if (typeof name === 'undefined' || name === '' || name === null) {
            return;
        }
        return this.options[name];
    }

});

_.extend(TextEditor.prototype, bindUIElementsMixin);