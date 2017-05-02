/**
 *
 * @param viewMode
 * @constructor
 */
function ContainerControl( viewMode ) {
    _.superClass( ContainerControl, this, viewMode );
}

_.inherit( ContainerControl, Control );

_.extend( ContainerControl.prototype, {} );

InfinniUI.ContainerControl = ContainerControl;
