var DataNavigationView = ControlView.extend({
    className: 'pl-data-navigation',

    template: _.template(''+
        '<div class="navigation-bar">' +
            '<div class="navigation"></div>' +
        '</div>'),

    events: {
        'click .update': 'updateHandler'
        //TODO: 'click .refresh': 'updateItems'
    },

    //TODO: AvailablePageSize [20, 40, 60] (Визуальный элемент, с количеством элементов на странице)
    //TODO: PageCount - количество страниц (приходит с сервера)

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:enabled', this.onChangeEnabledHandler);
//        this.listenTo(this.model, 'change:pageSize', this.onSetPageSize);
//        this.listenTo(this.model, 'change:pageNumber', this.onSetPageNumber);
//        this.listenTo(this.model, 'change:availablePageSizes', this.onAvailablePageSizes)
    },

    render: function () {
        this.prerenderingActions();
        this.$el.html(this.template({}));

        var self = this;
        this.$el.find('.navigation').bootpag({
            total: 50,
            page: this.model.get('pageNumber'),
            maxVisible: 10,
            leaps: false,
            next: 'Вперед ››',
            prev: '‹‹ Назад'
        }).on("page", function (event, num) {
            self.model.set('pageNumber', num-1);
        });

        this.onChangeEnabledHandler(this.model, this.model.get('enabled'));
        this.postrenderingActions();
        return this;
    },

    onPageSizeHandler: function(){
        this.trigger('onSetPageSize', this.model.get('pageSize'));
    },

    onPageNumberHandler: function(){
        this.trigger('onSetPageNumber', this.model.get('pageNumber'));
    },

    onChangeEnabledHandler: function (model, value) {
        if (!this.wasRendered) return;

        if(value) {
            this.$el.find('.bootpag').removeClass('disabled');
//            this.$el.find('.bootpag').find('a').bind('click', true);
        }else{
            this.$el.find('.bootpag').addClass('disabled');
            this.$el.find('.bootpag.disabled').find('a').bind('click', false);
        }
    }
});