/**
 * @class
 * @augments Backbone.View
 */
var ControlView = Backbone.View.extend(/** @lends ControlView.prototype */{

    initialize: function () {
        this.wasRendered = false;
        this.once('render', this.initHandlersForProperties, this);
        this._initDomHandlers();

    },

    classNameFocused: 'pl-focused',

    _initDomHandlers: function () {
        var
            view = this,
            $el = this.$el;

        $el[0].addEventListener('click', function (event) {
            view.trigger('beforeClick', null, {value: event});
        }, true);
    },

    initHandlersForProperties: function () {
        this.listenTo(this.model, 'change:visible', this.updateVisible);
        this.listenTo(this.model, 'change:horizontalAlignment', this.updateHorizontalAlignment);
        this.listenTo(this.model, 'change:textHorizontalAlignment', this.updateTextHorizontalAlignment);
        this.listenTo(this.model, 'change:verticalAlignment', this.updateVerticalAlignment);
        this.listenTo(this.model, 'change:enabled', this.updateEnabled);
        this.listenTo(this.model, 'change:name', this.updateName);
        this.listenTo(this.model, 'change:style', this.updateStyle);
        this.listenTo(this.model, 'change:text', this.updateText);

        this.listenTo(this.model, 'change:textStyle', this.updateTextStyle);
        this.listenTo(this.model, 'change:background', this.updateBackground);
        this.listenTo(this.model, 'change:foreground', this.updateForeground);
        this.listenTo(this.model, 'change:texture', this.updateTexture);

        this.listenTo(this.model, 'change:validationState', this.updateValidationState);


        this.listenTo(this.model, 'change:focusable', this.updateFocusable);
        this.listenTo(this.model, 'change:focused', this.updateFocused);

        this.initFocusHandlers();
        this.initTooltipHandlers();
    },

    initFocusHandlers: function () {
        var
            $el = this.$el,
            el = this.el,
            model = this.model;

        $el
            .on('focusin', onFocusIn)
            .on('focusout', onFocusOut);

        function onFocusIn(event) {
            model.set('focused', true);
        }

        function onFocusOut(event) {
            if ($.contains(el, event.relatedTarget)) {
                //focus out to element inside control
            } else {
                //focus out
                model.set('focused', false);
            }
        }
    },

    initTooltipHandlers: function () {
        var
            view = this,
            $el = this.$el,
            el = this.el,
            model = this.model;

        $el
            .on('mouseover', onMouseOver)
            .on('mouseout', onMouseOut);

        function onMouseOver(event) {
            model.set('showToolTip', true);
        }

        function onMouseOut(event) {
            if ($.contains(el, event.relatedTarget)) {
                //mouse out to element inside control
            } else {
                model.set('showToolTip', false);
            }
        }
    },

    updateProperties: function () {
        this.updateVisible();
        this.updateTextHorizontalAlignment();
        this.updateHorizontalAlignment();
        this.updateVerticalAlignment();
        this.updateEnabled();
        this.updateName();
        this.updateText();
        this.updateStyle();

        this.updateTextStyle();
        this.updateBackground();
        this.updateForeground();
        this.updateTexture();

        this.updateValidationState();

        this.updateFocusable();
        this.updateFocused();
    },

    /**
     * @description Изменяет контрол в соответсвии со значением focusable. Напр. добавить tabindex="0"
     */
    updateFocusable: function () {

    },

    /**
     * @description Возвращает элемент, который должен получить фокус
     */
    getElementForFocus: function () {
        return this.$el;
    },

    updateFocused: function () {
        var focused = this.model.get('focused');

        if (focused) {
            var $el = this.getElementForFocus();
            if ($el && $el.length) {
                $el.focus();
            }
        }
        this.$el.toggleClass(this.classNameFocused, focused);
    },


    onFocusHandler: function (event) {
        console.log('onFocus');
    },


    updateVisible: function () {
        var isVisible = this.model.get('visible');
        this.$el
            .toggleClass('hidden', !isVisible);

        this.onUpdateVisible();
    },

    onUpdateVisible: function () {
        var exchange = window.InfinniUI.global.messageBus;
        exchange.send('OnChangeLayout', {});
    },

    updateEnabled: function () {
        var isEnabled = this.model.get('enabled');
        this.$el
            .toggleClass('pl-disabled', !isEnabled);
    },

    updateVerticalAlignment: function () {
        var verticalAlignment = this.model.get('verticalAlignment');
        var prefix = 'verticalAlignment';
        var regexp = new RegExp('(^|\\s)' + prefix + '\\S+', 'ig');

        this.$el.removeClass(function (i, name) {
                return (name.match(regexp) || []).join(' ');
            })
            .addClass(prefix + verticalAlignment);
    },

    updateTextHorizontalAlignment: function () {
        this.switchClass('pl-text-horizontal', this.model.get('textHorizontalAlignment'));
    },

    updateHorizontalAlignment: function () {
        var horizontalAlignment = this.model.get('horizontalAlignment');
        switch (horizontalAlignment) {
            case 'Left':
            {
                this.$el
                    .removeClass('center-block pull-right')
                    .addClass('pull-left');
                break;
            }
            case 'Right':
            {
                this.$el
                    .removeClass('pull-left center-block')
                    .addClass('pull-right');
                break;
            }
            case 'Center':
            {
                this.$el
                    .removeClass('pull-left pull-right')
                    .addClass('center-block');
                break;
            }
            case 'Stretch':
            {
                this.$el
                    .removeClass('pull-left pull-right center-block')
                    .addClass('full-width');
                break;
            }
        }
    },

    updateName: function () {
        var newName = this.model.get('name'),
            currentName = this.$el.attr('data-pl-name');
        if (newName != currentName && typeof newName == 'string') {
            this.$el.attr('data-pl-name', newName);
        }
    },

    updateText: function () {

    },

    updateTextStyle: function () {
        var customStyle = this.model.get('textStyle');

        if (this.currentTextStyle) {
            this.$el
                .removeClass(this.valueToTextClassName(this.currentTextStyle));
        }

        if (customStyle) {
            this.$el
                .addClass(this.valueToTextClassName(customStyle));
        }

        this.currentTextStyle = customStyle;
    },

    updateBackground: function () {
        var customStyle = this.model.get('background');

        if (this.currentBackground) {
            this.$el
                .removeClass(this.valueToBackgroundClassName(this.currentBackground));
        }

        if (customStyle) {
            this.$el
                .addClass(this.valueToBackgroundClassName(customStyle));
        }

        this.currentBackground = customStyle;
    },

    updateForeground: function () {
        var customStyle = this.model.get('foreground');

        if (this.currentForeground) {
            this.$el
                .removeClass(this.valueToForegroundClassName(this.currentForeground));
        }

        if (customStyle) {
            this.$el
                .addClass(this.valueToForegroundClassName(customStyle));
        }

        this.currentForeground = customStyle;
    },

    updateTexture: function () {
        var customStyle = this.model.get('texture');

        if (this.currentTexture) {
            this.$el
                .removeClass(this.valueToTextureClassName(this.currentTexture));
        }

        if (customStyle) {
            this.$el
                .addClass(this.valueToTextureClassName(customStyle));
        }

        this.currentTexture = customStyle;
    },

    updateStyle: function () {
        var customStyle = this.model.get('style');

        if (this.currentStyle) {
            this.$el
                .removeClass(this.currentStyle);
        }

        if (customStyle) {
            this.$el
                .addClass(customStyle);
        }

        this.currentStyle = customStyle;
    },

    updateValidationState: function () {
        var newState = this.model.get('validationState'),
            message = this.model.get('validationMessage');
        switch (newState) {

            case 'success':
            {
                this.$el
                    .removeClass('has-warning has-error');
                this.hideErrorMessage();
            }
                break;

            case 'warning':
            {
                this.$el
                    .removeClass('has-error')
                    .addClass('has-warning');
                this.showErrorMessage(message);
            }
                break;

            case 'error':
            {
                this.$el
                    .removeClass('has-warning')
                    .addClass('has-error');
                this.showErrorMessage(message);
            }
                break;

        }

    },

    showErrorMessage: function (message) {
        var $errorIcn = $(_.template('<i class="2 error-icn fa fa-warning" data-placement="left" title="<%-message%>"></i>')({message: message}));

        this.hideErrorMessage();
        this.$el.find('.form-control:first')
            .before($errorIcn);

        $errorIcn.tooltip({'container': 'body'});
    },

    hideErrorMessage: function () {
        this.$el.find('.error-icn')
            .remove();
    },

    rerender: function () {
        if (this.wasRendered) {
            this.render();
        }
    },

    prerenderingActions: function () {
        this.wasRendered = true;
    },

    /**
     *
     * @param {Boolean} [onLoaded=true]
     */
    postrenderingActions: function (triggeringOnLoaded) {
        this.delegateEvents();

        triggeringOnLoaded = triggeringOnLoaded === undefined ? true : triggeringOnLoaded;

        if (triggeringOnLoaded) {
            this.trigger('onLoaded');
        }
    },

    switchClass: function (name, value, $el) {

        var startWith = name + '-';
        var regexp = new RegExp('(^|\\s)' + startWith + '\\S+', 'ig');
        var $element = $el || this.$el;
        $element.removeClass(function (i, name) {
                return (name.match(regexp) || []).join(' ');
            })
            .addClass(startWith + value);
    },

    valueToBackgroundClassName: function (value) {
        return 'pl-' + value.toLowerCase() + '-bg';
    },

    valueToForegroundClassName: function (value) {
        return 'pl-' + value.toLowerCase() + '-fg';
    },

    valueToTextClassName: function (value) {
        return 'pl-' + value.toLowerCase();
    },

    valueToTextureClassName: function (value) {
        return 'pl-' + value.toLowerCase();
    },

    renderTemplate: function (template) {
        var data = this.getData();
        this.$el.html(template(data));
        this.bindUIElements();
    },

    getData: function () {
        var model = this.model;
        return {
            name: model.get('name'),
            text: model.get('text'),
            focusable: model.get('focusable'),
            focused: model.get('focused'),
            enabled: model.get('enabled'),
            visible: model.get('visible'),
            horizontalAlignment: model.get('horizontalAlignment'),
            verticalAlignment: model.get('verticalAlignment'),
            textHorizontalAlignment: model.get('textHorizontalAlignment'),
            textVerticalAlignment: model.get('textVerticalAlignment'),
            textStyle: model.get('textStyle'),
            foreground: model.get('foreground'),
            background: model.get('background'),
            texture: model.get('texture')
        }
    }

});

_.extend(ControlView.prototype, bindUIElementsMixin, eventHandlerMixin);