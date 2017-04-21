function BaseAction( parentView ) {
    this.parentView = parentView;
    this._properties = Object.create( null );
    _.defaults( this._properties, this.defaults );
    this.initDefaultValues();
}

window.InfinniUI.BaseAction = BaseAction;

_.extend( BaseAction.prototype, {

    defaults: {
        canExecute: null
    },

    setProperty: function( name, value ) {
        var props = this._properties;
        if ( props[ name ] !== value ) {
            props[ name ] = value;
            this.trigger( 'change:' + name, this, value );
        }
    },

    getProperty: function( name ) {
        return this._properties[ name ];
    },

    initDefaultValues: function() {
    },

    onExecutedHandler: function( args ) {
        var onExecutedHandler = this.getProperty( 'onExecutedHandler' );

        if( typeof onExecutedHandler === 'function' ) {
            onExecutedHandler( args );
        }
    },

    _isRootElementPath: function( path ) {
        return !path.includes( '.' );
    }

}, Backbone.Events );

InfinniUI.global.executeAction = function( context, executeActionMetadata, resultCallback ) {
    var builder = new ApplicationBuilder();

    var action = builder.build( executeActionMetadata, { parentView: context.view } );

    action.execute( resultCallback );
};
