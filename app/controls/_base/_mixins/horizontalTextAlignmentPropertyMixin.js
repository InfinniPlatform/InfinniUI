//var horizontalTextAlignmentPropertyMixin = {
//
//    initHorizontalTextAlignment: function () {
//        this.listenTo(this.model, 'change:horizontalTextAlignment', this.updateHorizontalTextAlignment);
//    },
//
//    updateHorizontalTextAlignment: function () {
//        if (!this.wasRendered) {
//            return;
//        }
//        var value = this.model.get('horizontalTextAlignment');
//
//        if (InfinniUI.Metadata.HorizontalTextAlignment.indexOf(value) === -1) {
//            return;
//        }
//        this.switchClass('horizontalTextAlignment', value);
//    }
//
//};
