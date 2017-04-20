var ViewPanelModel = ControlModel.extend( {
    defaults: _.defaults( {
        layout: null
    }, ControlModel.prototype.defaults ),

    initialize: function() {
        var that = this;

        ControlModel.prototype.initialize.apply( this );

        this.once( 'change:layout', function( model, layout ) {
            if( layout && layout.onLoaded ) {
                that.subscribeOnLoaded();
            }
        } );
    },

    subscribeOnLoaded: function() {
        var that = this;
        var layout = this.get( 'layout' );

        layout.onLoaded( function() {
            that.set( 'isLoaded', true );
        } );
    }
} );