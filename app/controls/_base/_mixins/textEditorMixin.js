/**
 * Миксин для контрола с использованием масок ввода.
 *
 * Для использования редактора маски ввода в контроле необходимо:
 *  - создать редактор методом {@see textEditorMixin.renderEditor} c указанием необходимых параметров
 *  - реализовать метод onEditorValidate(value) для проверки на допустимость введенного значения
 *
 * Для обработки дополнительной логике при показе/скрытии редактора масок
 * можно использовать события editor:show и editor:hide.
 *
 */
var textEditorMixin = {

    /**
     *
     * options.el Контейнер для редактора
     * options.validate Коллбек для проверки введеного в редакторе значения
     * options.done Коллбек для применения введеного в редакторе значения
     * options.show Функция для отображения поля ввода
     * options.hide Функция для скрытия поля ввода
     *
     * @param options
     */
    renderEditor: function (options) {

        var convert = function (value) {
            if (this.onEditorConvertValue) {
                return this.onEditorConvertValue(value);
            }
            return value;
        }.bind(this);

        var editor = new TextEditor({
            parent: this,
            el: options.el,
            validate: this.onEditorValidate.bind(this),
            convert: convert,
            done: this.onEditorDone.bind(this),
            editMask: this.model.get('editMask'),
            multiline: options.multiline,
            lineCount: options.lineCount,
            inputType: options.inputType
        });

        this.editor = editor;

        this.listenTo(editor, 'editor:show', function () {
            //При показе поля редактирование - скрытить поле ввода элемента
            this.onEditorHideControl();
            //Проброс события от редактора маски к контролу
            this.trigger('editor:show');
        });

        this.listenTo(editor, 'editor:hide', function () {
            //При скрытии поля редактирование - показать поле ввода элемента
            this.onEditorShowControl();
            //Проброс события от редактора маски к контролу
            this.trigger('editor:hide');
        });

        this.listenTo(editor, 'onKeyDown', function (data) {
            //Проброс события от редактора маски к контролу
            this.trigger('onKeyDown', data);
        });

        this.listenTo(this.model, 'change:value', function (model, value) {
            editor.trigger('editor:update', value);
        });

        //Метод для показа поля редактирования
        //Обычно необходимо вызывать при получении фокуса полем ввод а элемента управления
        this.showEditor = function (value, skipRefocus) {
            editor.trigger('editor:show', value, skipRefocus);
        };


    },


    /**
     * Обработчик получения фокуса ввода полем ввода элемента.
     * Показывает поле редактирования с маской ввода и скрывает исходное поле
     * @param event
     */
    onFocusControlHandler: function (event) {
        if(this.model.get('enabled')) {
            this.showEditor(this.model.get('value'), false);
            this.onEditorHideControl();
        }
    },

    onMouseenterControlHandler: function (event) {
        //TODO: при ховере показывается маска (UI-854: убрал) по просьбе TeamLead'a
        //При ховере Editor нужен, чтобы при клике по полю, курсор выставлялся в указаннкю позицию
        if(this.model.get('enabled')) {
            this.showEditor(this.model.get('value'), true);
            this.onEditorHideControl();
        }
    },

    /**
     * Обработчик проверки значения из поля ввода с маской
     * @param value
     * @returns {boolean}
     */
//    onEditorValidate: function (value) {
//        return true;
//    },

    /**
     * Обработчик применения значения из поля ввода с маской
     * @param value
     */
    onEditorDone: function (value) {
        if(!value.toString().length || value === null) {
            value = undefined;
        }
        this.model.set('value', value);
    },

    /**
     * Метод для восстановления видимости поля ввода элемента
     */
    onEditorShowControl: function () {
        this.ui.control.show();
    },

    /**
     * Метод для скрытия поля ввода элемента
     */
    onEditorHideControl: function () {
        this.ui.control.hide();
    },

    /**
     * Метод выполняющий синхронизацию значения из эдитора в элемент
     */
    synchValueHandler: function () {
        if(this.editor.isInFocus()){
            var val = this.editor.getValue();
            this.model.set('value', val);
        }
    }


};