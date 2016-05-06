/**
 *
 * @mixin dataSourceFileProviderMixin
 */
var dataSourceFileProviderMixin = {

    setFileProvider: function (fileProvider) {
        this.set('fileProvider', fileProvider);
    },

    getFileProvider: function () {
        return this.get('fileProvider');
    }
};