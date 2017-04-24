/**
 *
 * @constructor
 * @augments TextBoxBuilder
 */
function ButtonEditBuilder() {
    _.superClass( ButtonEditBuilder, this );
}

InfinniUI.ButtonEditBuilder = ButtonEditBuilder;

_.inherit( ButtonEditBuilder, TextBoxBuilder );

ButtonEditBuilder.prototype.createElement = function( params ) {
    return new ButtonEdit( params.parent );
};

ButtonEditBuilder.prototype.applyMetadata = function( params ) {
    TextBoxBuilder.prototype.applyMetadata.call( this, params );

    this.initBindingToProperty( params, 'Icon' );
    this.initBindingToProperty( params, 'ReadOnly', true );
    this.initBindingToProperty( params, 'ShowClear', true );

    this.buildOnButtonClick( params );
    this.buildButtonAction( params );
};


/**
 * @protected
 * @param params
 */
ButtonEditBuilder.prototype.buildButtonAction = function( params ) {
    /** @type {ButtonEdit} **/
    var element = params.element;
    var metadata = params.metadata;
    var builder = params.builder;

    if( !metadata.Action ) {
        return;
    }

    var args = {
        parentView: params.parentView,
        parent: element,
        basePathOfProperty: params.basePathOfProperty
    };
    var action = builder.build( metadata.Action, args );
    element.onButtonClick( function() {
        action.execute();
    } );
};

/**
 * @protected
 * @param params
 */
ButtonEditBuilder.prototype.buildOnButtonClick = function( params ) {
    var element = params.element;
    var metadata = params.metadata;

    var onButtonClick = metadata.OnButtonClick;
    if( !onButtonClick ) {
        return;
    }

    var executorBuilderParams = {
        parentView: params.parentView,
        parent: element,
        basePathOfProperty: params.basePathOfProperty
    };

    var executor = Executor( onButtonClick, params.builder, executorBuilderParams );

    element.onButtonClick( executor );
};


