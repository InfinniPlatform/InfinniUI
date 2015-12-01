var PdfViewerModel = ControlModel.extend({
    defaults: _.defaults({
        verticalAlignment: 'Stretch'
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this);
    }
});