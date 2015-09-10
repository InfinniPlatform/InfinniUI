var LinkLabelView = ControlView.extend({
    className: 'pl-link-label TextWrapping',

    template: InfinniUI.Template["controls/linkLabel/template/linkLabel.tpl.html"],

    UI: {
        link: 'a',
        label: 'label',
        container: 'div'
    },

    events: {
        'click a': 'onClickHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.updateLinkText = _.debounce(this._updateLinkText, 50);
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
        if(href == null || href == undefined || href == ''){
            this.ui.link.prop('href', 'javascript:;');
        }else{
            this.ui.link.prop('href', href);
        }
    },

    initModelHandlers: function () {
        this.listenTo(this.model, 'change:value', this.updateLinkText);
        this.listenTo(this.model, 'change:reference', this.updateReferenceHandler);
        this.listenTo(this.model, 'change:textTrimming', this.updateLinkText);
        //this.listenTo(this.model, 'change:textWrapping', this.updateLinkText);
        this.initHorizontalAlignment();
        this.initHorizontalTextAlignment();
        this.initForeground();
        this.initBackground();
        this.initTextStyle();
        this.initUpdateLineCount();
        this.initTextWrapping();
    },

    render: function () {
        this.prerenderingActions();

        this.$el
            .html(this.template({}));

        this.bindUIElements();
        this.updateLineCount();
        this.updateTextWrapping();
        this.updateLinkText();
        this.updateHorizontalTextAlignment();
        this.updateBackground();
        this.updateForeground();
        this.updateTextStyle();

        this.updateReference();

        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     */
    _updateLinkText: function () {
        var text;

        if(!this.wasRendered){
            return;
        }

        var link = this.ui.link;
        var $container = this.ui.container;

        var model = this.model;
        var textTrimming = this.model.get('textTrimming');
        //var textWrapping = this.model.get('textWrapping');

        text = this.getTextLabel();

        //this.$el.toggleClass('TextWrapping', textWrapping);
        //this.$el.toggleClass('NoTextWrapping', !textWrapping);


        this.model.set('lineHeight', this.ui.label.innerHeight());

        /*
        @TODO Режим ellipsis не применяем т.к.
        setTimeout(function () {
            var txt = '';
            var txt2 = '';
            var ellipsis = ' ...';
            var lineCount = model.get('lineCount');

            if (textWrapping) {
                if (typeof lineCount === 'undefined' || lineCount === null) {
                    link.text(text);
                    return;
                }
            } else {
                if (!textTrimming) {
                    link.text(text);
                    return;
                }
            }

            var chars = [" ", "\n"];
            var fromPosition = 0;

            var maxWidth = $container.innerWidth();
            var lineHeight = model.get('lineHeight');

            var pos;
            while(fromPosition < text.length) {
                pos = Math.min.apply(Math, _.map(chars, function (char) {
                    var index = text.indexOf(char, fromPosition);
                    return index === -1 ? text.length : index;
                }));

                txt2 = text.substring(0, pos);

                if (textTrimming && pos < text.length) {
                    txt2 = txt2 + ellipsis;
                }
                link.text(txt2);

                if (textWrapping) {
                    if (link.innerHeight() > lineHeight * lineCount) {
                        break;
                    } else {
                        txt = txt2;
                    }
                } else {
                    if (link.innerWidth() > maxWidth) {
                        break;
                    } else {
                        txt = txt2;
                    }
                }
                fromPosition = pos + 1;
            }

            link.text(txt);
        }, 150);//Trimming применяется с задержкой
        */

        link.text(text);//Устанавливаем текст, Trimming примениться позже (см. setTimeOut выше)
        link.attr('title', text);

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
        //var cancel = false;
        //
        //var enabled = this.model.get('enabled');
        //
        //if (!enabled) {
        //    event.preventDefault();
        //    return;
        //}
        //
        //this.callEventHandler('OnClick', function (response) {
        //    if (response === false) {
        //        cancel = true;
        //    }
        //});
        //
        //if (cancel) {
            event.preventDefault();
        //}
    }

});

_.extend(LinkLabelView.prototype,
    foregroundPropertyMixin,
    backgroundPropertyMixin,
    textStylePropertyMixin,
    lineCountPropertyMixin,
    textWrappingPropertyMixin,
    horizontalTextAlignmentPropertyMixin
);
