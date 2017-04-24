function RadioGroupBuilder() {
    _.superClass( RadioGroupBuilder, this );
}

InfinniUI.RadioGroupBuilder = RadioGroupBuilder;

_.inherit( RadioGroupBuilder, ListBoxBuilder );

_.extend( RadioGroupBuilder.prototype, {

    createElement: function( params ) {
        var viewMode = params.metadata[ 'ViewMode' ] || 'checking';

        return new ListBox( params.parent, viewMode );
    },

    applyMetadata: function( params ) {
        var element = params.element;
        ListBoxBuilder.prototype.applyMetadata.call( this, params );

        element.setMultiSelect( false );
    }

} );
