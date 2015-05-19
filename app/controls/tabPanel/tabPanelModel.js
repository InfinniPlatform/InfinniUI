var TabPanelModel = ControlModel.extend({
    defaults: _.defaults({
        headerLocation: 'Top',
        headerOrientation: 'Horizontal',
        horizontalAlignment: 'Stretch',
        defaultPage: null,
        pages: []
    }, ControlModel.prototype.defaults),

    initialize: function(){
        ControlModel.prototype.initialize.apply(this);
        this.set('pages', []);
    },

    addPage: function (page) {
        var pages = this.getPages();
        pages.push(page);
        this.trigger('add:page', page);
    },

    /**
     * @param {TabPage} page
     */
    removePage: function (page) {
        var pages = this.getPages(),
            i = pages.indexOf(page);

        if (i !== -1) {
            pages.splice(i, 1);
            this.trigger('remove:page', page);
        }
    },

    /**
     * @params {String} name
     * @returns {TabPage}
     */
    getPage: function (name) {
        return _.find(this.getPages(), function (page) {
            return name === page.getName();
        });
    },

    /**
     * @returns {TabPage[]}
     */
    getPages: function () {
        return this.get('pages');
    },

    /**
     * @private
     * Возвращает порядковый номер активной вкладки
     * @returns {Number}
     */
    getActivePageIndex: function () {
        var defaultPage = this.get('defaultPage'),
            pages = this.get('pages'),
            active;
        if (defaultPage !== null) {
            _.find(pages, function (page, index) {
                if (page.getName() === defaultPage) {
                    active = index;
                    return true;
                }
                return false;
            });
        }

        return typeof active === 'undefined' ? 0 : active;
    },

    /**
     * Возвращает выделенную вкладку
     * @returns {TabPage}
     */
    getSelectedPage: function () {
        var index = this.getActivePageIndex(),
            pages = this.get('pages');

        return pages[index];
    },

    /**
     * Устанавливает выделенную вкладку
     * @param {TabPage} page
     */
    setSelectedPage: function (page) {
        var pages = this.get('pages'),
            index = _.indexOf(pages, page);

        if (index !== -1) {
            this.set('defaultPage', page.getName());
        }
    }

});