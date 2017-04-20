function FormControl( parent ) {
    _.superClass( FormControl, this, parent );
}

_.inherit( FormControl, StackPanelControl );

_.extend( FormControl.prototype, {

    createControlModel: function() {
        return new FormModel();
    },

    createControlView: function( model ) {
        return new FormView( { model: model } );
    },

    onSubmit: function( callback ) {
        this.controlView.$el.on( 'submit', callback );
    },

    setSubmitFunction: function( func ) {
        this.controlModel.set( 'submitFunction', func );
    },

    getSubmitFunction: function() {
        return this.controlModel.get( 'submitFunction' );
    },

    setMethod: function( method ) {
        this.controlModel.set( 'method', method );
    },

    getMethod: function() {
        return this.controlModel.get( 'method' );
    },

    setAction: function( action ) {
        this.controlModel.set( 'action', action );
    },

    getAction: function() {
        return this.controlModel.get( 'action' );
    }

} );
