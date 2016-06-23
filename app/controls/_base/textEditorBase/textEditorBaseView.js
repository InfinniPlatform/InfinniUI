/**
 * @class TextEditorBaseView
 * @augments ControlView
 * @mixed editorBaseViewMixin
 */


var TextEditorBaseView = ControlView.extend(/** @lends TextEditorBaseView.prototype */ _.extend({}, editorBaseViewMixin, {

    UI: _.extend({}, editorBaseViewMixin.UI, {
        control: '.pl-control',
        //editor: '.pl-control-editor',
        editor: '.pl-editor',
        label: '.pl-control-label',
        textbox: '.pl-text-box-input'
    }),

    events: {

    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        editorBaseViewMixin.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
        this.listenTo(this.model, 'change:labelFloating', this.updateLabelFloating);
        this.listenTo(this.model, 'change:displayFormat', this.updateDisplayFormat);
        this.listenTo(this.model, 'change:editMask', this.updateEditMask);
        this.listenTo(this.model, 'change:inputType', this.updateInputType);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);

        this.updateLabelText();
        this.updateInputType();
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (!focusable) {
            this.ui.editor.attr('tabindex', -1);
        } else {
            this.ui.editor.removeAttr('tabindex');
        }
    },

    updateInputType: function () {
        var inputType = this.model.get('inputType');
        var $editor = this.ui.editor;
        var tagName = $editor.prop('tagName');
        if (inputType && tagName.toLowerCase() === 'input') {
            $editor.attr('type', inputType);
        }
    },

    updateEditMask: function(){
        this.updateValue();
    },

    setFocus: function () {
        this.ui.editor.focus();
    },

    updateValue: function(){
        editorBaseViewMixin.updateValueState.call(this);
        this.ui.control.val(this.getDisplayValue());
    },

    updateLabelText: function(){
        var labelText = this.model.get('labelText');
        if(labelText){
            this.ui.label
                .text(labelText)
                .removeClass('hidden');
        }else{
            this.ui.label
                .text('')
                .addClass('hidden');
        }

    },

    updateDisplayFormat: function(){
        this.updateValue();
    },

    /**
     * Рендеринг редактора значений
     *
     */
    renderControlEditor: function () {
        var model = this.model;
        var editor = model.get('editor');
        if (editor) {
            editor.render(this.ui.editor);
        }
    },

    getData: function () {
        var model = this.model;

        return _.extend({},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this), {
                labelText: model.get('labelText'),
                labelFloating: model.get('labelFloating'),
                value: this.getDisplayValue()
            });
    },

    getDisplayValue: function () {
        var
            model = this.model,
            value = model.get('value'),
            displayFormat = model.get('displayFormat');

        return displayFormat ? displayFormat(null, {value: value}) : value;
    }

}));
