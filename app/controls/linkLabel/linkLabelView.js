var LinkLabelView = ControlView.extend({
    className: 'pl-link-label',

    template: InfinniUI.Template["controls/linkLabel/template/linkLabel.tpl.html"],

    UI: {
        link: 'a'
    },

    events: {
        'click a': 'onClickHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);

        this.initModelHandlers();
    },

    updateReferenceHandler: function (model, value) {
        this.updateReference();
    },

    updateReference: function () {
        if(!this.wasRendered){
            return;
        }
        var href = this.model.get('reference');
        this.ui.link.prop('href', href);
    },

    initModelHandlers: function () {
        this.listenTo(this.model, 'change:value', this.updateLinkText);
        this.listenTo(this.model, 'change:reference', this.updateReferenceHandler);
    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({}));

        this.bindUIElements();

        this.updateLinkText();
        this.updateReference();

        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     */
    updateLinkText: function () {
        var control, text;

        if(this.wasRendered){
            var link = this.ui.link;
            text = this.getTextLabel();

            link.text(text);
            link.attr('title', text);
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
     * @description Обработчик щелчка. Если один из обработчиков вернул false - переход по ссылке отменяется
     * @private
     * @param event
     */
    onClickHandler: function (event) {
        var cancel = false;

        this.callEventHandler('OnClick', function (response) {
            if (response === false) {
                cancel = true;
            }
        });

        if (cancel) {
            event.preventDefault();
        }
    }

});
