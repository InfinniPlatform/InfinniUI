var TabPanelView = ControlView.extend({

    className: 'pl-tab-panel',

    template: {
        //Шаблонов для различных вариантов расположения кнопок панели
        Top: InfinniUI.Template["controls/tabPanel/template/top.tpl.html"],
        Right: InfinniUI.Template["controls/tabPanel/template/right.tpl.html"],
        Bottom: InfinniUI.Template["controls/tabPanel/template/bottom.tpl.html"],
        Left: InfinniUI.Template["controls/tabPanel/template/left.tpl.html"],
        None: InfinniUI.Template["controls/tabPanel/template/none.tpl.html"],
        //Шаблон кнопок навигации панели
        nav: InfinniUI.Template["controls/tabPanel/template/nav.tpl.html"]
    },

    events: {
        'click .pl-tab-close': 'onClickTabCloseHandler'
    },

    UI: {
        content: '.tab-content',
        nav: '.nav-tabs'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.initLayoutPanelViewMixin();

        this.listenTo(this.model, 'add:page', this.onAddPageHandler);
        this.listenTo(this.model, 'remove:page', this.onRemovePageHandler);
        this.listenTo(this.model, 'change:headerLocation', this.onChangeHeaderLocationHandler);
        this.listenTo(this.model, 'change:defaultPage', this.onChangeDefaultPageHandler);
    },

    render: function () {
        var template = this.template[this.model.get('headerLocation')];

        this.prerenderingActions();

        this.$el.empty();

        this.$el.html(template());

        this.bindUIElements();

        this.applyHeaderLocation();

        this.renderPages();

        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     * Рендеринг вкладок
     */
    renderPages: function () {
        var pages = this.model.get('pages'),
            $nav = this.ui.nav;

        if (typeof pages !== 'undefined') {
            var contentFragment = document.createDocumentFragment(),
                activePageIndex = this.model.getActivePageIndex();

            if(this.model.get('headerLocation') == 'Top'){
                var percentWidth = 100/pages.length;
            }

            _.each(pages, function (page, index) {
                //Рендеринг содержимого вкладки
                var $page = page.render();
                $page.toggleClass('active', activePageIndex === index);
                contentFragment.appendChild($page[0]);
                //Рендеринг кнопки для навигации

                $nav.append(this.template.nav({
                    id: page.getId(),
                    text: page.getText(),
                    active: activePageIndex === index,
                    canClose: page.getCanClose(),
                    name: page.getName(),

                    width: percentWidth,
                    location: this.model.get('headerLocation')
                }));
            }, this);
            this.bindNavEvents();
            this.ui.content.append(contentFragment);
        }
    },

    /**
     * @private
     * Установка обработчиков для отслеживания переключения вкладок
     */
    bindNavEvents: function () {
        var model = this.model;
        var view = this;

        $('a[data-toggle="tab"]', this.ui.nav)
            .off('shown.bs.tab')
            .on('shown.bs.tab', function (event) {
                var el = event.target;
                //Запоминаем имя выделенной вкладки
                model.set('defaultPage', $(el).attr('data-pageName'), {silent: true});
                view.trigger('onSelectionChanged')
            });
    },

    /**
     * @private
     * Применение стиля расположения закладок
     */
    applyHeaderLocation: function () {
        var headerLocation = this.model.get('headerLocation');
        var cssClasses = {
            Bottom: "tabs-below",
            Left: "tabs-left",
            Right: "tabs-right"
        };

        this.$el.toggleClass('row', headerLocation === 'Left' || headerLocation === 'Right');

        for (var i in cssClasses) {
            if (!cssClasses.hasOwnProperty(i)) continue;
            this.$el.toggleClass(cssClasses[i], i === headerLocation);
            this.ui.nav.toggleClass(cssClasses[i], i === headerLocation);
        }
    },

    /**
     * @private
     * Обработчик события при добавлении страницы
     */
    onAddPageHandler: function () {
        //@TODO Переделать на рендеринг новой вкладки
        this.rerender();
    },

    /**
     * @private
     * Обработчик события при удалении страницы
     */
    onRemovePageHandler: function (page) {
        //@TODO Переделать на удаление нужной вкладки
        this.rerender();
    },

    /**
     * @private
     * Обработчик изменения положения панели навигации вкладок
     */
    onChangeHeaderLocationHandler: function () {
        this.rerender();
    },

    /**
     * @private
     * Обрабочик изменения выделенной вкладки
     */
    onChangeDefaultPageHandler: function () {
        if (this.wasRendered) {
            var index = this.model.getActivePageIndex(),
                selector = "li:eq(index) a".replace('index', index);
            $(selector, this.ui.nav).tab('show');
        }
    },

    onClickTabCloseHandler: function (event) {
        var $el = $(event.target).prev();

        var page = this.model.getPage($el.attr('data-pageName'));
        page.close();
        //this.model.removePage(page);
    }


});

_.extend(TabPanelView.prototype, layoutPanelViewMixin);