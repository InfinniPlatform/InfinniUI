var TextEditorView = Backbone.View.extend({

    /**
     * @member {TextEditorModel} model
     */
    events: {
        'focusin': 'onFocusinHandler',
        'focusout': 'onFocusoutHandler',
        'keydown': 'onKeydownHandler',
        'keyup': 'onKeyupHandler',
        'keypress': 'onKeypressHandler',
        'click': 'onClickHandler',
        //'mousewheel': 'onMousewheelHandler',
        'paste': 'onPasteHandler'
    },

    /**
     *
     * @param {jQuery.Event} event
     */
    onKeydownHandler: function (event) {
        if (event.ctrlKey || event.altKey) {
            return;
        }

        var editMask = this.model.getEditMask();
        if (!editMask) {
            return;
        }


        var $input = this.ui.input;
        /** @var {HTMLInputElement} */
        var input = this.ui.input.get(0);
        var position;

        switch (event.which) {
            case InfinniUI.Keyboard.KeyCode.ESCAPE:
                //Отменить изменения и выйти из режима редактирования
                this.setDisplayMode(true);
                break;

            case InfinniUI.Keyboard.KeyCode.HOME:
                if(event.shiftKey) {
                    //@TODO WTF?
                    input.selectionEnd = parseInt(input.selectionEnd, 10);
                } else {
                    position = editMask.moveToPrevChar(0);
                    if (position !== false) {
                        this.setCaretPosition(position);
                        event.preventDefault();
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.LEFT_ARROW:
                if(event.shiftKey) {
                    //@TODO WTF?
                    input.selectionEnd = parseInt(input.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(input.selectionStart, 10));
                    }else {
                        position = editMask.moveToPrevChar(this.getCaretPosition());
                        if (position !== false) {
                            this.setCaretPosition(position);
                            event.preventDefault();
                        }
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.RIGHT_ARROW:
                if (event.shiftKey) {
                    //@TODO WTF?
                    input.selectionEnd = parseInt(input.selectionEnd, 10);
                } else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(input.selectionEnd, 10));
                    }else {
                        position = editMask.moveToNextChar(this.getCaretPosition());
                        if (position !== false) {
                            this.setCaretPosition(position);
                            event.preventDefault();
                        }
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.END:
                position = editMask.moveToNextChar($input.val().length);
                if (position !== false) {
                    this.setCaretPosition(position);
                    event.preventDefault();
                }
                break;

            case InfinniUI.Keyboard.KeyCode.UP_ARROW:
                if(event.shiftKey) {
                    //@TODO WTF?
                    input.selectionEnd = parseInt(input.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(input.selectionStart, 10));
                    }else {
                        position = editMask.setNextValue(this.getCaretPosition());
                        if (position !== false) {
                            event.preventDefault();
                            $input.val(editMask.getText());
                            this.setCaretPosition(position);
                        }
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.DOWN_ARROW:
                if(event.shiftKey) {
                    //@TODO WTF?
                    input.selectionEnd = parseInt(input.selectionEnd, 10);
                }else {
                    if (this.getSelectionLength() > 0){
                        event.preventDefault();
                        this.setCaretPosition(parseInt(input.selectionEnd, 10));
                    }else {
                        position = editMask.setPrevValue(this.getCaretPosition());
                        if (position !== false) {
                            event.preventDefault();
                            $input.val(editMask.getText());
                            this.setCaretPosition(position);
                        }
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.DELETE:
                // @TODO Если выделена вся строка - очистить поле редактирования
                //TODO: доделать SelectionLength
                //@TODO Зачем проверка "instanceof Date"??
                if (this.getSelectionLength() > 0 && !(editMask.value instanceof Date)) {
                    event.preventDefault();
                    this.removeSelection(editMask);
                } else {
                    position = editMask.deleteCharRight(this.getCaretPosition(), this.getSelectionLength());
                    if (position !== false) {
                        event.preventDefault();
                        $input.val(editMask.getText());
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.BACKSPACE:
                // @TODO Если выделена вся строка - очистить поле редактирования
                //TODO: доделать SelectionLength
                //@TODO Зачем проверка "instanceof Date"??
                if (this.getSelectionLength() > 0 && !(editMask.value instanceof Date)) {
                    event.preventDefault();
                    this.removeSelection(editMask);
                } else {
                    position = editMask.deleteCharLeft(this.getCaretPosition(), this.getSelectionLength());
                    if (position !== false) {
                        event.preventDefault();
                        $input.val(editMask.getText());
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.SPACE:
                //@TODO Зачем проверка "instanceof Date"??
                if (this.getSelectionLength() > 0 && !(editMask.value instanceof Date)) {
                    event.preventDefault();
                    this.removeSelection(editMask);
                }else {
                    position = editMask.getNextItemMask(this.getCaretPosition());
                    if (position !== false) {
                        event.preventDefault();
                        this.setCaretPosition(position);
                    }
                }
                break;

            default:

                //@TODO Зачем это все

                //TODO: не работает для DateTimeFormat
                //замена выделенного текста, по нажатию

                var inp = InfinniUI.Keyboard.getCharByKeyCode(event.keyCode);

                //@TODO Зачем проверка "instanceof Date"??
                if (this.getSelectionLength() > 0 && !(editMask.value instanceof Date)) {
                    event.preventDefault();
                    //Data
                    this.removeSelection(editMask, String.fromCharCode(event.keyCode));
                }

                break;
        }


    },

    /**
     *
     * @param {jQuery.Event} event
     */
    onKeyupHandler: function (event) {
        //@TODO this.parseInputValue()

        //this.trigger('onKeyDown', {
        //    keyCode: event.which,
        //    value: this.parseInputValue()
        //});
    },

    /**
     *
     * @param {jQuery.Event} event
     */
    onKeypressHandler: function (event) {
        if (event.altKey || event.ctrlKey) {
            return;
        }

        var editMask = this.model.getEditMask();
        if (!editMask) {
            return;
        }

        var char = InfinniUI.Keyboard.getCharByKeyCode(event.keyCode);

        var position;
        var $input = this.ui.input;

        if (char === null) {
            return;
        }


        position = editMask.setCharAt(char, this.getCaretPosition(), this.getSelectionLength());
        if (position !== false) {
            event.preventDefault();
            $input.val(editMask.getText());
            this.setCaretPosition(position);
        }
    },

    /**
     *
     * @param {jQuery.Event} event
     */
    onClickHandler: function (event) {
        this.checkCurrentPosition();
        event.preventDefault();
    },

    /**
     *
     * @param {jQuery.Event} event
     */
    onPasteHandler: function (event) {
        var editMask = this.model.getEditMask();
        var $input = this.ui.input;

        if (!editMask) {
            //Use default behavior
            return;
        }

        /** @var {ClipboardEvent} **/
        var originalEvent = event.originalEvent;

        var text = originalEvent.clipboardData.getData('text/plain') || prompt('Введите текст для вставки');
        if (text) {
            var chars = text.split('');

            for (var i = 0, position = this.getCaretPosition(); i < chars.length; i = i + 1) {
                position = editMask.setCharAt(chars[i], position);
            }

            event.preventDefault();
            $input.val(editMask.getText());
        }
    },

    checkCurrentPosition: function () {
        var editMask = this.model.getEditMask();
        if (!editMask) {
            return;
        }
        var currentPosition = this.getCaretPosition();
        var position = currentPosition === 0 ? editMask.moveToPrevChar(0) : editMask.moveToNextChar(currentPosition - 1);
        if (position !== currentPosition) {
            this.setCaretPosition(position);
        }

    },

    getSelectionLength: function () {
        /** @var HTMLInputElement **/
        var elem = this.ui.input.get(0);
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
     * @param {Integer} [position=0]
     */
    setCaretPosition: function (position) {
        /** @var HTMLInputElement **/
        var elem = this.ui.input.get(0);

        //IE9+
        if (typeof elem.selectionStart !== 'undefined') {
            elem.setSelectionRange(position, position);
        }

    },

    /**
     * @private
     * Получение позиции курсора в поле редактирования
     * @returns {number}
     */
    getCaretPosition: function () {
        /** @var {HTMLInputElement} **/
        var elem = this.ui.input.get(0);

        var position = 0;

        //IE9+
        if (elem.selectionStart || elem.selectionStart == '0') {
            position = elem.selectionStart;
        }

        return position;
    },

    initialize: function () {
        this.listenTo(this.model, 'change:mode', this.onChangeModeHandler);
        this.listenTo(this.model, 'change:text', this.onChangeTextHandler);
    },

    render: function () {

        var inputTemplate = this.model.get('inputTemplate');

        var $input = _.isString(inputTemplate) ? $(inputTemplate) : $(inputTemplate.call(null));

        this.ui = {
            input: $input
        };

        this.$el.append($input);

        return this.$el;
    },

    onFocusinHandler: function (event) {
        this.model.setEditMode();
    },

    onFocusoutHandler: function (event) {
        this.model.setDisplayMode();
    },

    onChangeModeHandler: function (model, mode) {
        console.log(mode);
    },

    onChangeTextHandler: function (model, text) {
        this.ui.input.val(text);
    }

});


/**
 *
 * @constructor
 */
function EditorModeStrategy() {}

/**
 * @abstract
 * @param {TextEditorModel} model
 */
EditorModeStrategy.prototype.updateText = function (model) {};

/**
 * @augments EditorModeStrategy
 * @constructor
 */
function EditorDisplayModeStrategy() {
    EditorModeStrategy.call(this);
}

EditorDisplayModeStrategy.prototype = Object.create(EditorModeStrategy.prototype);
EditorDisplayModeStrategy.prototype.constructor = EditorDisplayModeStrategy;
EditorDisplayModeStrategy.prototype.updateText = function (model) {
    var displayFormat = model.get('displayFormat');
    var value = model.get('value');

    var text;

    if (_.isFunction(displayFormat)) {
        text = displayFormat.call(null, null, {value: value});
    } else {
        text = value;
    }

    model.set('text', text);
};

/**
 * @augments EditorModeStrategy
 * @constructor
 */
function EditorEditModeStrategy() {
    EditorModeStrategy.call(this);
}

EditorEditModeStrategy.prototype = Object.create(EditorModeStrategy.prototype);
EditorEditModeStrategy.prototype.constructor = EditorEditModeStrategy;
EditorEditModeStrategy.prototype.updateText = function (model) {
    var editMask = model.get('editMask');
    var value = model.get('value');
    var text;

    if (!editMask) {
        text = value;
    } else {
        editMask.reset(value);
        text = editMask.getText();
    }

    model.set('text', text);
};

var TextEditorModel = Backbone.Model.extend({

    Mode: {
        Edit: 'edit',
        Display: 'display'
    },

    initialize: function () {

        this.initEditMode();

        this.on('change:originalValue', this.onChangeOriginalValueHandler);
        this.on('change:value', this.onChangeValueHandler);
        this.on('change:mode', this.onChangeModeHandler);
    },

    initEditMode: function () {
        this.modeStrategies = {};
        this.modeStrategies[this.Mode.Edit] = new EditorEditModeStrategy();
        this.modeStrategies[this.Mode.Display] = new EditorDisplayModeStrategy();

        this.updateEditModeStrategy();
    },

    defaults: function () {
        return {
            mode: this.Mode.Display
        };
    },

    updateEditModeStrategy: function () {
        var mode = this.get('mode');
        this.set('modeStrategy', this.modeStrategies[mode]);
    },

    onChangeModeHandler: function () {
        this.updateEditModeStrategy();
        this.updateText();
    },

    /**
     *
     * @param {boolean} [cancel = false]
     */
    setDisplayMode: function (cancel) {
        cancel = !!cancel;

        this.set('mode', this.Mode.Display, {
            validate: !cancel
        });

    },

    getEditMask: function () {
        return this.get('editMask');
    },

    setEditMode: function () {
        this.set('mode', this.Mode.Edit);
    },

    validate: function (attrs, options) {

        //@TODO Если меняется Mode Edit => Display, проверить введенное значение!!!
        var validateValue = this.get('validateValue');
        var value = this.get('value');

        if (_.isFunction(validateValue)) {
            return validateValue.call(null, value);
        }
    },

    updateText: function () {
        var modeStrategy = this.get('modeStrategy');
        modeStrategy.updateText(this);
    },

    onChangeValueHandler: function (model, value) {
        this.updateText();
    },

    onChangeOriginalValueHandler: function (model, originalValue) {
        model.set('value', originalValue);
    }

});


/**
 *
 * @param {TextEditorBase} element
 * @constructor
 */
var TextEditor2 = function (element) {
    var displayFormat = element.getDisplayFormat();
    var editMask = element.getEditMask();

    var model = new TextEditorModel({
        displayFormat: displayFormat,
        editMask: editMask,
        validateValue: element.validateValue.bind(element)
    });

    model.on('change:value', function (model, value) {
        element.setValue(value);
    });

    var view = new TextEditorView({
        model: model
    });

    model.on('invalid', function (model, error) {
        console.log('error', error);
    });

    //@TODO Handle ReadOnly & Enabled state

    this._model = model;
    this._view = view;

};


TextEditor2.prototype.setInputTemplate = function (inputTemplate) {
    this._model.set('inputTemplate', inputTemplate);
};

/**
 *
 * @param {function|string} inputTemplate
 * @returns {*}
 */
TextEditor2.prototype.render = function (inputTemplate) {
    this.setInputTemplate(inputTemplate);

    return this._view.render();
};

TextEditor2.prototype.setValue = function (value) {
    this._model.set('originalValue', value);
};