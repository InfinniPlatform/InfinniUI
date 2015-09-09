var LabelView = ControlView.extend({
    className: 'pl-label',

    template: InfinniUI.Template["controls/label/template/label.tpl.html"],

    UI: {
        control: 'label',
        container: 'div'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initHorizontalTextAlignment();
        this.initUpdateLineCount();
        this.initTextWrapping();
        this.initForeground();
        this.initBackground();
        this.initTextStyle();
        this.initValue();
    },

    initValue: function () {
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:lineCount', this.updateValue);
        this.listenTo(this.model, 'change:text', this.updateValue);
        this.updateValue();
    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({}));

        this.bindUIElements();
        this.updateBackground();
        this.updateForeground();
        this.updateTextStyle();
        this.updateValue();
        this.updateLineCount();
        this.updateTextWrapping();
        this.updateHorizontalAlignment();
        this.updateHorizontalTextAlignment();
        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     * Установка значение Name у контейнера элемента
     */
    applyName: function () {
        this.$el.attr('data-name', this.model.get('name'));
    },

    /**
     * @private
     */
    updateValue: function () {
        var control, text;

        if(!this.wasRendered) {
            return;
        }

        control = this.ui.control;
        text = this.getTextLabel();

        //var lineCount = this.model.get('lineCount');

        control.attr('title', text);
        //this.$el.toggleClass('pl-label-oneline', lineCount === 1);

        //Сохраняем форматирование пробелами и экранируем <>
        //text = text.replace(/</g, '&lt;')
        //    .replace(/>/g, '&gt;');
        //
        //
        //
        //var line = 0;
        //if (typeof lineCount === 'undefined' || lineCount === null) {
        //    text = text.replace(/\n/g, '<br>');
        //} else {
        //    text = text.replace(/\n/g, function (char) {
        //        line++;
        //        return line < lineCount ? '<br>' : char;
        //    });
        //}
        //text = text.replace(/\s/g, '&nbsp;');
        control.text(text);
    },

    /**
     * @private
     * Возвращает текст для контрола.
     * @returns {String}
     */
    getTextLabel: function () {
        var text = this.model.get('value');
        var format = this.model.get('format');

        if (typeof text !== 'undefined' && text !== null) {
            if (typeof format !== 'undefined' && format !== null) {
                text = format.format(text);
            }
        }else{
            text = this.model.get('text');
            if (typeof text === 'undefined' || text == null) {
                text = '';
            }
        }

        return text;
    }
});

_.extend(LabelView.prototype,
    horizontalTextAlignmentPropertyMixin,
    foregroundPropertyMixin,
    backgroundPropertyMixin,
    textStylePropertyMixin,
    lineCountPropertyMixin,
    textWrappingPropertyMixin
);