var FormModel = StackPanelModel.extend( {

    defaults: _.defaults( {
        submitFunction: null,
        method: '',
        action: ''
    }, StackPanelModel.prototype.defaults )

} );
