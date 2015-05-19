var TabPanelControl = function(){
    _.superClass(TabPanelControl, this);
};

_.inherit(TabPanelControl, Control);

_.extend(TabPanelControl.prototype, {

    createControlModel: function(){
        return new TabPanelModel();
    },

    createControlView: function(model){
        return new TabPanelView({model: model});
    },

    /**
     * @param {TabPage} page
     */
    addPage: function (page) {
        this.controlModel.addPage(page);
    },

    /**
     * @param {TabPage} page
     */
    removePage: function (page) {
        this.controlModel.removePage(page);
    },

    /**
     * @param {String} name
     * @return {TabPage}
     */
    getPage: function (name) {
        return this.controlModel.getPage(name);
    },

    /**
     * @return {TabPage[]}
     */
    getPages: function () {
        return this.controlModel.getPages();
    },

    /**
     * @returns {TabPage}
     */
    getSelectedPage: function () {
        return this.controlModel.getSelectedPage()
    },

    /**
     *
     * @param {TabPage} page
     */
    setSelectedPage: function (page) {
        this.controlModel.setSelectedPage(page);
    },

    onSelectionChanged: function (handler) {
        this.controlView.on('onSelectionChanged', handler);
    }

});