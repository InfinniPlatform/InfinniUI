/**
 * @class
 * @augments ControlView
 */
var TextEditorBaseView = ControlView.extend(/** @lends TextEditorBaseView.prototype */{

    UI: {
        control: '.pl-control',
        editor: '.pl-control-editor'
    },

    events: {
        'focus .pl-control': 'onFocusControlHandler',
        'mouseenter .pl-control': 'onMouseenterControlHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.call(this, options);
    },

    initOnChangeHandler: function () {
        this
            .listenTo(this.model, 'change:labelText', this.onChangeLabelTextHandler)
            .listenTo(this.model, 'change:labelFloating', this.onChangeLabelFloatingHandler)
            .listenTo(this.model, 'change:displayFormat', this.onChangeDisplayFormatHandler)
            .listenTo(this.model, 'change:editMask', this.onChangeEditMaskHandler);
    },

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
    }

});