var FileBinding = function(view, dataSource, property){
    _.superClass(FileBinding, this, view, dataSource, property);

    this.file = null;
    this.fileUrl = null;
};

_.inherit(FileBinding, PropertyBinding);

_.extend(FileBinding.prototype, {

    setFile: function (file) {
        this.file = file;
    },

    getFile: function () {
        return this.file;
    },

    setFileUrl: function (fileUrl) {
        this.fileUrl = fileUrl;
    },

    //getPropertyValue: function () {
    //    var value = PropertyBinding.prototype.getPropertyValue.call(this);
    //
    //    return (typeof value === 'undefined' || value === null) ? null : this.fileUrl;
    //},

    getFileUrl: function () {
        var value = this.getPropertyValue();
        var fileUrl = null;
        if (typeof value !== 'undefined' && value !== null) {
            fileUrl = this.fileUrl;
            if (value.Info.ContentId && false === _.isEmpty(this.fileUrl)) {
                var hash = md5(JSON.stringify(value));
                fileUrl += '&hash=' + hash;
            }
        }
        return  fileUrl;
    }

});
