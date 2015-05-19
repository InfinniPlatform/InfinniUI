function ActionBar(parent) {
    _.superClass(ActionBar, this, parent);
}

_.inherit(ActionBar, Element);

_.extend(ActionBar.prototype, {

    createControl: function () {
        return new ActionBarControl();
    },

    //setApplicationView: function (applicationView) {
    //    this.control.set('applicationView', applicationView);
    //},
    //
    //getApplicationView: function () {
    //    return this.control.get('applicationView');
    //},

    setPages: function (pages) {
        this.control.set('pages', pages);
    },

    getPages: function () {
        return this.control.get('pages');
    },

    refresh: function (pages) {
        //var view = this.getApplicationView();

        //console.log('ApplicationView', view);

        //var pages = InfinniUI.global.openMode.getPageViews(view);
        for (var i = 0, ln = pages.length; i < ln; i = i + 1) {
            console.log(pages[i]);
        }
    }

});