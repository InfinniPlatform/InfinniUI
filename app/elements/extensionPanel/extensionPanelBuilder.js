﻿/**
 * @augments ContainerBuilder
 * @constructor
 */
function ExtensionPanelBuilder() {
}

InfinniUI.ExtensionPanelBuilder = ExtensionPanelBuilder;

_.inherit( ExtensionPanelBuilder, ContainerBuilder );

_.extend( ExtensionPanelBuilder.prototype, {

    /**
     *
     * @param params
     */
    applyMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;
        var parentView = params.parentView;
        var builder = params.builder;

        ContainerBuilder.prototype.applyMetadata.call( this, params );

        element.setExtensionName( metadata[ 'ExtensionName' ] );

        var parameters = {};
        _.each( metadata.Parameters, function( parameterMetadata ) {
            var param = builder.buildType( 'Parameter', parameterMetadata, {
                parentView: parentView,
                basePathOfProperty: params.basePathOfProperty
            } );
            parameters[ param.getName() ] = param;
        } );

        element.setParameters( parameters );
        element.setContext( parentView.getContext() );
        element.setBuilder( builder );
    },

    /**
     *
     * @param params
     * @returns {ExtensionPanel}
     */
    createElement: function( params ) {
        var element = new ExtensionPanel( params.parent );

        return element;
    }

} );
