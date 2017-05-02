var IndeterminateCheckBoxModel = CheckBoxModel.extend( {

    defaults: _.defaults( {
        value: 'unchecked'
    }, CheckBoxModel.prototype.defaults )

} );

InfinniUI.IndeterminateCheckBoxModel = IndeterminateCheckBoxModel;
