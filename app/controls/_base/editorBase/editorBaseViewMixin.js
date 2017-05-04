/**
 *
 * @mixin
 */
var editorBaseViewMixin = {

    UI: {
        hintText: '.pl-control-hint-text',
        warningText: '.pl-control-warning-text',
        errorText: '.pl-control-error-text'
    },

    /**
     *
     * @returns {{guid}}
     */
    getData: function() {
        return {
            guid: this.model.get( 'guid' )
        };
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        this.listenTo( this.model, 'onValueChanged', this.updateValue );
        this.listenTo( this.model, 'change:hintText', this.updateHintText );
        this.listenTo( this.model, 'change:errorText', this.updateErrorText );
        this.listenTo( this.model, 'change:warningText', this.updateWarningText );
        this.listenTo( this.model, 'change:labelFloating', this.updateLabelFloating );
    },

    /**
     *
     */
    updateProperties: function() {
        this.updateValue();
        this.updateLabelFloating();
        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
    },

    /**
     *
     */
    updateValue: function() {
        throw 'editorBaseViewMixin.updateValue В потомке editorBaseViewMixin не реализовано обновление данных.';
    },

    updateValueState: function() {
        var value = this.model.get( 'value' );
        var isEmpty = _.isEmpty( value ) && !( _.isNumber( value ) );

        this.$el.toggleClass( 'pl-empty-text-editor', isEmpty );
    },

    /**
     *
     */
    updateLabelFloating: function() {
        var labelFloating = this.model.get( 'labelFloating' );
        this.$el.toggleClass( 'pl-label-floating', labelFloating === true );
    },

    /**
     *
     */
    updateHintText: function() {
        this.toggleHintText(this.ui.hintText, this.model.get( 'hintText' ));
    },

    /**
     *
     */
    updateErrorText: function() {
        this.toggleHintText(this.ui.errorText, this.model.get( 'errorText' ), InfinniUI.Theme.default.classes.inputError);
    },

    /**
     *
     */
    updateWarningText: function() {
        this.toggleHintText(this.ui.warningText, this.model.get( 'warningText' ), InfinniUI.Theme.default.classes.inputWarning);
    },

    /**
     *
     */
    updateEnabled: function() {
        ControlView.prototype.updateEnabled.call( this );

        if( this.ui.control ) {
            var isEnabled = this.model.get( 'enabled' );
            this.ui.control.prop( 'disabled', !isEnabled );
        }
    },

    /**
     *
     * @param model
     * @param error
     */
    onInvalidHandler: function( model, error ) {
        // что ита???
        // вот ето -  @see {@link http://backbonejs.org/#Model-validate} !!!
        //@TODO Можно ли использовать поля из API или реализовывать вывод ошибок отдельно?
        //this.model.set('errorText', error);
    },

    /**
     * @protected
     * @param {jQuery} $element
     * @param {string} text
     * @param {string} [inputClass]
     */
    toggleHintText: function( $element, text, inputClass ) {
        var hideText = !text;
        $element
            .text(hideText ? '' : text)
            .toggleClass(InfinniUI.Theme.default.classes.hidden, hideText);

        if (inputClass) {
            this.$el.toggleClass(inputClass, !hideText);
        }
    }

};

InfinniUI.editorBaseViewMixin = editorBaseViewMixin;
