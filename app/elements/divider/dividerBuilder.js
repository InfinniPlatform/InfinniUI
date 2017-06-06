/**
 *
 * @constructor
 * @arguments ElementBuilder
 */
function DividerBuilder() {
    _.superClass( DividerBuilder, this );
}

InfinniUI.DividerBuilder = DividerBuilder;

_.inherit( DividerBuilder, ElementBuilder );

/**
 *
 * @param params
 * @returns {Divider}
 */
DividerBuilder.prototype.createElement = function( params ) {
    return new Divider( params.parent );
};

/**
 *
 * @param params
 */
DividerBuilder.prototype.applyMetadata = function( params ) {
    ElementBuilder.prototype.applyMetadata.call( this, params );
};

