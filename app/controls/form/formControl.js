/**
 * @augments StackPanelControl
 * @param parent
 * @constructor
 */
function FormControl( parent ) {
    _.superClass( FormControl, this, parent );
}

_.inherit( FormControl, StackPanelControl );

_.extend( FormControl.prototype, {

    /**
     * @returns {FormModel}
     */
    createControlModel: function() {
        return new FormModel();
    },

    /**
     * @returns {FormView}
     * @param model
     */
    createControlView: function( model ) {
        return new FormView( { model: model } );
    },

    /**
     *
     * @param callback
     */
    onSubmit: function( callback ) {
        this.controlView.$el.on( 'submit', callback );
    },

    /**
     *
     * @param func
     */
    setSubmitFunction: function( func ) {
        this.controlModel.set( 'submitFunction', func );
    },

    /**
     * @returns {*}
     */
    getSubmitFunction: function() {
        return this.controlModel.get( 'submitFunction' );
    },

    /**
     *
     * @param method
     */
    setMethod: function( method ) {
        this.controlModel.set( 'method', method );
    },

    /**
     * @returns {*}
     */
    getMethod: function() {
        return this.controlModel.get( 'method' );
    },

    /**
     *
     * @param action
     */
    setAction: function( action ) {
        this.controlModel.set( 'action', action );
    },

    /**
     * @returns {*}
     */
    getAction: function() {
        return this.controlModel.get( 'action' );
    }

} );

InfinniUI.FormControl = FormControl;
