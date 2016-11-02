var TextEditorView = Backbone.View.extend({

    /**
     * @member {TextEditorModel} model
     */

    classNameError: 'has-error',

    events: {
        'focusin': 'onFocusinHandler',
        'focusout': 'onFocusoutHandler',
        'keydown': 'onKeydownHandler',
        'change': 'onChangeHandler',
        'input': 'onInputHandler',
        'keyup': 'onKeyupHandler',  //trigger OnKeyDown Event
        'click': 'onClickHandler',
        'drop': 'onDropHandler',
        'dragstart': 'OnDragstartHandler',
        'dragend': 'OnDragendHandler',
        'dragover': 'OnDragoverHandler',
        'dragleave': 'OnDragleaveHandler',
        'dragenter': 'OnDragenterHandler',
        'paste': 'onPasteHandler'
    },

    updateModelTextFromEditor: function () {
        var model = this.model,
            editMask = model.getEditMask();

        if (!editMask) {
            model.setText(this.$el.val(), true);
        }
    },

    onChangeHandler: function () {
        //Обработка для корректной обработки автозаполняемых полей
        this.updateModelTextFromEditor();
    },

    onInputHandler: function () {
        var editMask = this.model.getEditMask();
        if (!editMask) {
            this.updateModelTextFromEditor();
        }
    },

    onKeydownHandler: function (event) {
        if (event.ctrlKey || event.altKey) {
            return;
        }

        if (event.which === InfinniUI.Keyboard.KeyCode.ESCAPE) {
            //Отменить изменения и выйти из режима редактирования
            this.model.setDisplayMode(true, false);
            this.$el.blur();
            return;
        }

        var editMask = this.model.getEditMask();
        if (!editMask) {
            //model.text будет изменено в обработчике onInputHandler
            return;
        }

        var model = this.model;
        var position;

        switch (event.which) {
            case InfinniUI.Keyboard.KeyCode.TAB:
                break;
            case InfinniUI.Keyboard.KeyCode.HOME:
                if (!event.shiftKey) {
                    position = editMask.moveToPrevChar(0);
                    if (position !== false) {
                        event.preventDefault();
                        this.setCaretPosition(position);
                    }
                }

                break;

            case InfinniUI.Keyboard.KeyCode.LEFT_ARROW:
                if (!event.shiftKey) {
                    position = editMask.moveToPrevChar(this.getCaretPosition());
                    if (position !== false) {
                        event.preventDefault();
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.RIGHT_ARROW:
                if (!event.shiftKey) {
                    position = editMask.moveToNextChar(this.getCaretPosition());
                    if (position !== false) {
                        event.preventDefault();
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.END:
                if (!event.shiftKey) {
                    position = editMask.moveToNextChar(this.$el.val().length);
                    if (position !== false) {
                        event.preventDefault();
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.UP_ARROW:
                if (!event.shiftKey) {
                    position = editMask.setNextValue(this.getCaretPosition());
                    if (position !== false) {
                        event.preventDefault();
                        model.setText(editMask.getText());
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.DOWN_ARROW:
                if (!event.shiftKey) {
                    position = editMask.setPrevValue(this.getCaretPosition());
                    if (position !== false) {
                        event.preventDefault();
                        this.model.setText(editMask.getText());
                        this.setCaretPosition(position);
                    }
                }
                break;

            case InfinniUI.Keyboard.KeyCode.DELETE:
                event.preventDefault();
                position = editMask.deleteCharRight(this.getCaretPosition(), this.getSelectionLength());

                this.model.setText(editMask.getText());
                if (position !== false) {
                    this.setCaretPosition(position);
                }
                break;

            case InfinniUI.Keyboard.KeyCode.BACKSPACE:
                event.preventDefault();
                position = editMask.deleteCharLeft(this.getCaretPosition(), this.getSelectionLength());

                this.model.setText(editMask.getText());
                if (position !== false) {
                    this.setCaretPosition(position);
                }
                break;

            case InfinniUI.Keyboard.KeyCode.SPACE:
                if (editMask.value instanceof Date) {
                    event.preventDefault();
                    position = editMask.getNextItemMask(this.getCaretPosition());
                    if (position !== false) {
                        this.setCaretPosition(position);
                    }
                }
                break;

            default:
                //замена выделенного текста, по нажатию
                var char = InfinniUI.Keyboard.getCharByKeyCode(event.keyCode);

                event.preventDefault();

                if (this.getSelectionLength() > 0) {
                    position = editMask.deleteSelectedText(this.getCaretPosition(), this.getSelectionLength(), char);
                } else {
                    //Ввод символа
                    position = editMask.setCharAt(char, this.getCaretPosition(), this.getSelectionLength());
                }

                this.model.setText(editMask.getText());

                if (position !== false) {
                    this.setCaretPosition(position);
                }

                break;
        }
    },

    onKeyupHandler: function (event) {
        this.trigger('onKeyDown', {
            keyCode: event.which,
            value: this.model.getValue()
        });
    },

    onClickHandler: function (event) {
        this.checkCurrentPosition();
    },

    onPasteHandler: function (event) {
        var originalEvent = event.originalEvent;
        var text = originalEvent.clipboardData.getData('text/plain');
        var editMask = this.model.getEditMask();

        if (editMask) {
            event.preventDefault();
            this.textTyping(text);
        }
    },

    OnDragstartHandler: function (event) {
        var originalEvent = event.originalEvent;
        originalEvent.dataTransfer.effectAllowed = 'copy';
        this.$el.attr('data-dragged', true);
    },

    OnDragendHandler: function (/*event*/) {
        this.$el.removeAttr('data-dragged', false);
    },

    OnDragoverHandler: function (event) {
        event.preventDefault();
    },

    OnDragenterHandler: function (event) {
        var dragged = this.$el.attr('data-dragged');

        if (!dragged && this.getCanChange()) {
            this.model.setEditMode();
        }
    },

    OnDragleaveHandler: function (event) {
        var dragged = this.$el.attr('data-dragged');

        if (!dragged) {
            this.model.setDisplayMode();
        }
    },

    onDropHandler: function (event) {
        event.preventDefault();
        event.stopPropagation();
        var dragged = this.$el.attr('data-dragged');

        if (dragged) {  //prevent drop on self
            return;
        }

        if (!this.getCanChange()) {
            return;
        }

        var originalEvent = event.originalEvent;
        var text = originalEvent.dataTransfer.getData('text/plain');

        this.textTyping(text, 0);
        this.$el.focus();
    },

    getCanChange: function () {
        var disabled = this.$el.prop('disabled');

        return disabled === false;
    },

    /**
     * @description Заполняет поле ввода строкой text начиная с позиции position
     * @protected
     *
     * @param {string} text
     * @param {number} [position]
     */
    textTyping: function (text, position) {
        var editMask = this.model.getEditMask();
        var newText = text;

        if (editMask) {
            text.split('')
                .reduce(function (pos, char) {
                    return editMask.setCharAt(char, pos);
                }, _.isNumber(position) ? position : this.getCaretPosition());

            newText = editMask.getText();
        }

        this.model.setText(newText);
    },

    checkCurrentPosition: function (currentPosition) {

        if (!this.canCaretPosition()) {
            return;
        }
        var editMask = this.model.getEditMask();
        if (!editMask) {
            return;
        }

        if (typeof currentPosition === 'undefined') {
            currentPosition = this.getCaretPosition();
        }

        var position = currentPosition === 0 ? editMask.moveToPrevChar(0) : editMask.moveToNextChar(currentPosition - 1);
        if (position !== currentPosition) {
            this.setCaretPosition(position);
        }

    },

    getSelectionLength: function () {
        var el = this.el,
            len = 0;

        if (this.canCaretPosition()) {
            var startPos = parseInt(el.selectionStart, 10),
                endPos = parseInt(el.selectionEnd, 10);

            if (!isNaN(startPos) && !isNaN(endPos)) {
                len = endPos - startPos;
            }
        }

        return len;
    },

    canCaretPosition: function () {
        return (/text|password|search|tel|url/).test(this.el.type);
    },

    setCaretPosition: function (caretPosition) {

        if (_.isNumber(caretPosition) && this.canCaretPosition()) {
            var el = this.el;

            //IE9+
            if (typeof el.selectionStart !== 'undefined') {
                el.setSelectionRange(caretPosition, caretPosition);
            }
        }

    },

    /**
     * @private
     * Получение позиции курсора в поле редактирования
     * @returns {number}
     */
    getCaretPosition: function () {
        /** @var {HTMLInputElement} **/
        var el = this.el;

        var position = 0;

        if (this.canCaretPosition()) {
            position = el.selectionStart;
        }

        return position;
    },

    initialize: function () {
        this.applyAutocomplete();
        this.listenTo(this.model, 'change:mode', this.onChangeModeHandler);
        this.listenTo(this.model, 'change:text', this.onChangeTextHandler);
        this.listenTo(this.model, 'invalid', this.onInvalidHandler);
    },

    /**
     * @description Для элементов с маской ввода отключаем поддержку автозаполнения
     */
    applyAutocomplete: function () {
        var editMask = this.model.getEditMask();
        if (editMask) {
            this.$el.attr('autocomplete', 'off');
        }
    },

    onInvalidHandler: function (model, error) {
        this.$el.toggleClass(this.classNameError, true);
    },

    onFocusinHandler: function (/* event */) {
        this.model.setEditMode();
        setTimeout(this.setCaretPosition.bind(this, 0), 4);
    },

    onFocusoutHandler: function (/* event */) {
        this.model.setDisplayMode();
    },

    onChangeModeHandler: function (model, mode) {
        this.checkCurrentPosition();
    },

    onChangeTextHandler: function (model, text) {
        var $input = this.$el;
        var position = this.getCaretPosition();

        $input.toggleClass(this.classNameError, false);

        if($input.val() !== text) {
            $input.val(text);
        }

        var editMask = this.model.getEditMask();

        if (editMask) {
            if ($input.is(':focus')) {
                this.checkCurrentPosition(position);
            }
        }
    }
});