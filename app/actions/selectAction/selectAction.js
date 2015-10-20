function SelectAction(parentView){
    _.superClass(SelectAction, this, parentView);
}

_.inherit(SelectAction, BaseAction);


_.extend(SelectAction.prototype, {
    execute: function(callback){
        var linkView = this.getProperty('linkView');
        var srcBinding = this.getProperty('srcBinding');
        var dstBinding = this.getProperty('dstBinding');

        linkView.createView(function(createdView){

            createdView.onClosed(function () {
                var dialogResult = createdView.getDialogResult();

                if (dialogResult == DialogResult.accepted) {
                    var value = srcBinding.getPropertyValue();
                    dstBinding.setPropertyValue(value);

                    if (callback) {
                        callback(value);
                    }
                }
            });

            createdView.open();
        });
    }
});