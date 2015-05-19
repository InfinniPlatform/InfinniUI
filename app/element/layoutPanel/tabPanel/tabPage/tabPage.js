function TabPage(parentView) {
    _.superClass(TabPage, this, parentView);
}

_.inherit(TabPage, Element);

_.extend(TabPage.prototype, {

    createControl: function(){
        return new TabPageControl();
    },

    getId: function () {
        return this.control.getId();
    },

    //TabPage API:

    /**
     * Возвращает изображение заголовка страницы.
     * @returns {String}
     */
    getImage: function () {

    },

    /**
     * Устанавливает изображение заголовка страницы.
     * @param {String} value
     */
    setImage: function (value) {

    },

    /**
     * Возвращает значение, определяющее, разрешено ли закрытие страницы.
     * @returns {Boolean}
     */
    getCanClose: function () {
        return this.control.get('canClose');
    },

    /**
     * Устанавливает значение, определяющее, разрешено ли закрытие страницы.
     * @param {Boolean} value
     */
    setCanClose: function (value) {
        this.control.set('canClose', value);
    },

    /**
     * Возвращает контейнер элементов страницы.
     * @return {Object}
     */
    getLayoutPanel: function () {
        return this.control.get('layoutPanel');
    },

    /**
     * Устанавливает контейнер элементов страницы.
     * @param {Object} layoutPanel
     */
    setLayoutPanel: function (layoutPanel) {
        this.control.set('layoutPanel', layoutPanel);
    },

    /**
     * Закрывает страницу
     * @return {Boolean}
     */
    close: function () {

    },

    /**
     * Возвращает или устанавливает обработчик события о том, что страница закрывается.
     * @param context
     * @param args
     */
    onClosing: function (context, args) {

    },

    /**
     * Возвращает или устанавливает обработчик события о том, что страница закрыта.
     * @param context
     * @param args
     */
    onClosed: function (context, args) {

    }

});