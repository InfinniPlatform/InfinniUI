var LabelView = ControlView.extend({
    className: 'pl-label',

    template: InfinniUI.Template["controls/label/template/label.tpl.html"],

    UI: {
        control: 'label'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initHorizontalTextAlignment();
        this.initValue();
    },

    initHorizontalTextAlignment: function () {
        this.listenTo(this.model, 'change:horizontalTextAlignment', this.updateHorizontalTextAlignment);
        this.updateHorizontalTextAlignment();
    },

    initValue: function () {
        this.listenTo(this.model, 'change:value', this.updateValue);
        this.updateValue();
    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({}));

        this.bindUIElements();

        this.updateValue();

        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     * Устанавливает горизонтально выравние метки внутри контейнера элемента
     */
    updateHorizontalTextAlignment: function () {
        var $el = this.$el,
            value = this.model.get('horizontalTextAlignment');

        $el.toggleClass('text-left', value === 'Left');
        $el.toggleClass('text-right', value === 'Right');
        $el.toggleClass('text-center', value === 'Center');
        $el.toggleClass('text-justify', value === 'Justify');
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

        if(this.wasRendered){
            control = this.ui.control;
            text = this.getTextLabel();

            control.text(text);
            control.attr('title', text);
        }
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
    },

    /**
     * @private
     */
    updateText: function () {
        this.updateValue();
    }

});