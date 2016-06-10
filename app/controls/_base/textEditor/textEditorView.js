var TextEditorView = Backbone.View.extend({

    /**
     * @member {TextEditorModel} model
     */

    classNameError: 'has-error',

    events: {
        'focusin': 'onFocusinHandler',
        'focusout': 'onFocusoutHandler',
        'keydown': 'onKeydownHandler',
        'keyup': 'onKeyupHandler',
        'keypress': 'onKeypressHandler',
        'click': 'onClickHandler',
        'drop': 'onDropHandler',
        'dragstart': 'OnDragstartHandler',
        'dragend': 'OnDragendHandler',
        'dragover': 'OnDragoverHandler',
        'dragleave': 'OnDragleaveHandler',
        'dragenter': 'OnDragenterHandler',
        'paste': 'onPasteHandler',
        'input': 'onInputHandler'
    },

    onInputHandler: function () {
        var editMask = this.model.getEditMask();
        if (editMask) {
            return;
        }

        this.model.setText(this.$el.val());
    },

    onKeydownHandler: function (event) {
        if (event.ctrlKey || event.altKey) {
            return;
        }


        if (event.which === InfinniUI.Keyboard.KeyCode.ESCAPE) {
            //Отменить изменения и выйти из режима редактирования
            this.model.setDisplayMode(true, false);
            return;
        }

        var editMask = this.model.getEditMask();
        if (!editMask) {
            return;
        }

        var model = this.model;
        var position;

        switch (event.which) {
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

                if (this.getSelectionLength() > 0) {
                    event.preventDefault();
                    position = editMask.deleteSelectedText(this.getCaretPosition(), this.getSelectionLength(), char);
                    this.model.setText(editMask.getText());
                    if (position !== false) {
                        this.setCaretPosition(position);
                    }
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

    onKeypressHandler: function (event) {
        if (event.altKey || event.ctrlKey) {
            return;
        }

        var editMask = this.model.getEditMask();
        if (!editMask) {
            return;
        }

        var char = InfinniUI.Keyboard.getCharByKeyCode(event.which);

        var position;

        if (char === null) {
            return;
        }

        position = editMask.setCharAt(char, this.getCaretPosition(), this.getSelectionLength());
        event.preventDefault();
        this.model.setText(editMask.getText());

        if (position !== false) {
            this.setCaretPosition(position);
        }
    },

    onClickHandler: function (event) {
        this.checkCurrentPosition();
        event.preventDefault();
    },

    onPasteHandler: function (event) {
        var originalEvent = event.originalEvent;
        var text = originalEvent.clipboardData.getData('text/plain');
        var editMask = this.model.getEditMask();

        event.preventDefault();

        if (editMask) {
            this.textTyping(text);
        } else {
            this.model.setText(text);
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

        if (!dragged) {
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

        var originalEvent = event.originalEvent;
        var text = originalEvent.dataTransfer.getData('text/plain');


        //@TODO disabled = "disabled"
        this.textTyping(text, 0);
        this.$el.focus();
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
        var el = this.el;
        var len = 0,
            startPos = parseInt(el.selectionStart, 10),
            endPos = parseInt(el.selectionEnd, 10);

        if (!isNaN(startPos) && !isNaN(endPos)) {
            len = endPos - startPos;
        }

        return len;
    },

    setCaretPosition: function (caretPosition) {

        if (_.isNumber(caretPosition)) {
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

        //IE9+
        if (el.selectionStart || el.selectionStart == '0') {
            position = el.selectionStart;
        }

        return position;
    },

    initialize: function () {
        this.listenTo(this.model, 'change:mode', this.onChangeModeHandler);
        this.listenTo(this.model, 'change:text', this.onChangeTextHandler);
        this.listenTo(this.model, 'invalid', this.onInvalidHandler);
    },

    onInvalidHandler: function (model, error) {
        this.$el.toggleClass(this.classNameError, true);
    },

    onFocusinHandler: function (/* event */) {
        this.model.setEditMode();
    },

    onFocusoutHandler: function (/* event */) {
        this.model.setDisplayMode();
    },

    onChangeModeHandler: function (model, mode) {
        this.checkCurrentPosition();
        console.log(mode);
    },

    onChangeTextHandler: function (model, text) {
        var $input = this.$el;

        $input.toggleClass(this.classNameError, false);
        $input.val(text);

        var editMask = this.model.getEditMask();

        if (editMask) {
            //$input.val(text);
            if ($input.is(':focus')) {
                this.checkCurrentPosition();
            }
        }

    }

});