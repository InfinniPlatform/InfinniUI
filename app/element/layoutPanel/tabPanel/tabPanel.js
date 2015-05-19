function TabPanel(parentView) {
    _.superClass(TabPanel, this, parentView);
}

_.inherit(TabPanel, Element);

_.extend(TabPanel.prototype, {

    createControl: function(){
        return new TabPanelControl();
    },

    getHeaderLocation: function () {
        return this.control.get('headerLocation');
    },

    setHeaderLocation: function (value) {
        this.control.set('headerLocation', value);
    },

    getHeaderOrientation: function () {
        return this.control.get('headerOrientation');
    },

    setHeaderOrientation: function (value) {
        this.control.set('headerOrientation', value);
    },

    /**
     * Возвращает выделенную страницу.
     * @returns {TabPage}
     */
    getSelectedPage: function () {
        return this.control.getSelectedPage();
    },

    /**
     * Устанавливает выделенную страницу.
     * @param {TabPage} page
     */
    setSelectedPage: function (page) {
        this.control.setSelectedPage(page);
    },

    /**
     * Добавляет указанную страницу
     * @param {TabPage} page
     */
    addPage: function (page) {
        this.control.addPage(page);
    },

    /**
     * Удаляет указанную страницу
     * @param {TabPage} page
     */
    removePage: function (page) {
        this.control.removePage(page);
    },

    /**
     * Возвращает страницу с указанным именем.
     * @param {String} name
     * @returns {TabPage}
     */
    getPage: function (name) {
        return this.control.getPage(name);
    },

    /**
     * Возвращает список страниц.
     * @return {TabPage[]}
     */
    getPages: function () {
        return this.control.getPages();
    },


    setDefaultPage: function (value) {
        this.control.set('defaultPage', value);
    },

    getDefaultPage: function () {
        return this.control.get('defaultPage');
    },

    onSelectionChanged: function (handler) {
        this.control.onSelectionChanged(handler);
    }

});