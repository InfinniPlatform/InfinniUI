/**
 * @class
 * @augments TextEditorBaseView
 */
var NumericBoxView = TextEditorBaseView.extend(/** @lends TextBoxView.prototype */{

    className: "pl-numericbox form-group",

    template: InfinniUI.Template["new/controls/numericBox/template/numericBox.tpl.html"],

    UI: _.extend({}, TextEditorBaseView.prototype.UI, {
        min: '.pl-numeric-box-min',
        max: '.pl-numeric-box-max'
    }),

    events: _.extend({}, TextEditorBaseView.prototype.events, {
        'focus .pl-numeric-box-input': 'onFocusControlHandler',
        'mouseenter .pl-numeric-box-input': 'onMouseenterControlHandler',
        'click .pl-numeric-box-min': 'onClickMinControlHandler',
        'click .pl-numeric-box-max': 'onClickMaxControlHandler',
        'mousedown .pl-numeric-box-min': 'onMousedownMinControlHandler',
        'mousedown .pl-numeric-box-max': 'onMousedownMaxControlHandler'
    }),

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.renderNumericBoxEditor();
        this.updateProperties();
        this.trigger('render');
        this.postrenderingActions();
        return this;
    },

    getData: function () {
        var
            model = this.model;

        return _.extend({},
            TextEditorBaseView.prototype.getData.call(this), {
                minValue: model.get('minValue'),
                maxValue: model.get('maxValue'),
                increment: model.get('increment')
            });
    },

    renderNumericBoxEditor: function () {
        var model = this.model;

        this.renderControlEditor({
            el: this.ui.editor,
            multiline: false,
            lineCount: 1,
            inputType: model.get('inputType')
        });

        return this;
    },

    onChangeEnabledHandler: function (model, value) {
        this.ui.control.prop('disabled', !value);
        this.ui.min.prop('disabled', !value);
        this.ui.max.prop('disabled', !value);
    },

    onClickMinControlHandler: function () {
        var increment = this.model.get('increment');
        this.addToValue(increment * -1);
    },

    onClickMaxControlHandler: function () {
        var increment = this.model.get('increment');
        this.addToValue(increment);
    },

    onMousedownMinControlHandler: function (event) {
        var el = event.target,
            increment = this.model.get('increment');

        this.repeatAddToValue(el, increment * -1);
    },

    onMousedownMaxControlHandler: function (event) {
        var el = event.target,
            increment = this.model.get('increment');

        this.repeatAddToValue(el, increment);
    },

    repeatAddToValue: function (el, delta) {
        var
            numericBox = this,
            intervalId;

        window.document.addEventListener('mouseup', stopRepeat);

        intervalId = setInterval(function () {
            numericBox.addToValue(delta);
        }, 200);

        function stopRepeat() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            window.document.removeEventListener('mouseup', stopRepeat);
        }
    },

    addToValue: function (delta) {
        var value = this.model.get('value');

        value = (value === null || typeof value === 'undefined') ? 0 : parseInt(value, 10);

        if (!isFinite(value)) {
            return;
        }

        value = value + delta;
        this.model.set('value', value, {validate: true});
    },

    /**
     * Используется миксином textEditorMixin
     * @param value
     * @returns {boolean}
     */
    onEditorValidate: function (value) {
        return true;
    }

});
