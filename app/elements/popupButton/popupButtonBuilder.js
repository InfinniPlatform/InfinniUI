/**
 * @constructor
 * @augments ContainerBuilder
 * @mixes buttonBuilderMixin
 */
function PopupButtonBuilder() {
    _.superClass( PopupButtonBuilder, this );
}

InfinniUI.PopupButtonBuilder = PopupButtonBuilder;

_.inherit( PopupButtonBuilder, ContainerBuilder );

_.extend( PopupButtonBuilder.prototype, {

    /**
     *
     * @param params
     * @returns {PopupButton}
     */
    createElement: function( params ) {
        var viewMode = this.detectViewMode( params );
        return new PopupButton( params.parent, viewMode );
    },

    /**
     *
     * @param params
     */
    detectViewMode: function( params ) {
        var viewMode = params.metadata[ 'ViewMode' ];
        var el = params.parent;
        var exit = false;

        if( !viewMode ) {
            while( !exit ) {
                if( el ) {
                    if( el instanceof MenuBar ) {
                        viewMode = 'forMenu';
                        exit = true;
                    } else {
                        el = el.parent;
                    }
                } else {
                    exit = true;
                }
            }

        }

        return viewMode;
    },

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        ContainerBuilder.prototype.applyMetadata.call( this, params );
        this.applyButtonMetadata.call( this, params );
    }

}, buttonBuilderMixin );
