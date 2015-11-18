var ComboBoxModel = ListEditorBaseModel.extend({

    defaults: _.defaults({
        valueTemplate: function(context, args){
            return {
                render: function(){
                    return args.value;
                }
            };
        }
    }, ListEditorBaseModel.prototype.defaults),

    initialize: function () {
        ListEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
    },

    toggleItem: function (item, toggle) {
        var value = this.valueByItem(item);
        this.toggleValue(value, toggle);
        this.trigger('toggle');
    }
});