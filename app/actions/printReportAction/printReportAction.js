function PrintReportAction(parentView){
    _.superClass(PrintReportAction, this, parentView);
}

_.inherit(PrintReportAction, BaseAction);


_.extend(PrintReportAction.prototype, {
    execute: function(callback){
        var $submitForm = this.getProperty('$submitForm');

        $submitForm.submit(callback);
    }
});