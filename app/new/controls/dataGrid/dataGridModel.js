/**
 * @constructor
 * @augments ListEditorBaseModel
 */
var DataGridModel = ListEditorBaseModel.extend({
    initialize: function () {
        ListEditorBaseModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
        this.initColumns();
    },

    /**
     * @protected
     */
    initColumns: function () {
        this.set('columns', new Collection());
    }
});