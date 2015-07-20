var DataNavigationView = ControlView.extend({
    className: 'pl-data-navigation',

    template: _.template('' +
    '<div class="navigation-bar">' +
    '<div class="navigation"></div>' +
    '</div>'),

    events: {
        'click .update': 'updateHandler'
    },

    //TODO: AvailablePageSize [20, 40, 60] (Визуальный элемент, с количеством элементов на странице)

    initialize: function() {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:enabled', this.onChangeEnabledHandler);
    },

    render: function() {
        this.prerenderingActions();
        this.$el.html(this.template({}));

        var dataSource = this.model.get('view').getDataSource(this.model.get('dataSource'));
        var self = this;

        this.initNumberOfPage(dataSource, function(num) {
            self.numberOfPage = num;
        });

        //if filter change dataNavigation rerender
        if (typeof this.onDataSourceItemsUpdated !== 'undefined') {
            this.onDataSourceItemsUpdated.unsubscribe();
        }

        this.onDataSourceItemsUpdated = dataSource.onItemsUpdated(function () {
            self.initNumberOfPage(dataSource, function (num) {
                self.numberOfPage = num;
                self.initPlugin();
            });
        });

        this.renderAvaliablePageSize();

        this.initPlugin();

        this.onChangeEnabledHandler(this.model, this.model.get('enabled'));
        this.postrenderingActions();
        return this;
    },

    initPlugin: function() {
        var self = this;

        //reset pageNumber if filter change
        var maxCountPage = Math.ceil(this.numberOfPage / this.model.get('pageSize'));
        if (maxCountPage < this.model.get('pageNumber') || (!maxCountPage && !this.model.get('pageNumber') )) {
            this.model.set('pageNumber', 0);
        }

        //initialize bootpag plugin
        this.$el.find('.navigation').bootpag({
            total: Math.ceil(self.numberOfPage / self.model.get('pageSize')) || 1,
            page: parseInt(this.model.get('pageNumber')) + 1 || 0,
            maxVisible: 10,
            leaps: false,
            next: 'Вперед ›',
            prev: '‹ Назад',
            firstLastUse: true,
            first: '‹‹',
            last: '››'
        }).on("page", function(event, num) {
            self.model.set('pageNumber', num - 1);
        });

    },

    renderAvaliablePageSize: function(){
        var self = this;
        var select = $('<select class="availablePageSizes" name="hero">');
        if (this.model.get('availablePageSizes')){
            for (var i = 0; i < this.model.get('availablePageSizes').length; i++) {
                select.append('<option value="' + this.model.get('availablePageSizes')[i] + '">' + this.model.get('availablePageSizes')[i]);
            }
            this.$el.find('.navigation-bar').append(select);
            this.$el.find('.availablePageSizes').on('change', function () {
                self.model.set('pageSize', self.$el.find('.availablePageSizes').val());
            });
        }
    },

    initNumberOfPage: function(dataSource, callback) {
        var self = this;
        var queryFilters = dataSource.getQueryFilter().items || [];
        var propertyFilter = dataSource.getPropertyFilters() || [];
        var filters = _.union(queryFilters, propertyFilter);

        var param = {
            "id": null,
            "changesObject": {
                "Configuration": dataSource.getConfigId(),
                "Metadata": dataSource.getDocumentId(),
                "Filter": filters,
                "PageNumber": dataSource.getPageNumber(),
                "PageSize": dataSource.getPageSize()
            },
            "replace": false
        };

        //get count of documents with filters
        $.ajax(InfinniUI.config.serverUrl + '/RestfulApi/StandardApi/configuration/getnumberofdocuments', {
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(param),
            contentType: 'application/json',
            success: function(data) {
                if(data.length) {
                    self.onSetElementCountHandler(data[0].NumberOfDocuments);
                    callback(data[0].NumberOfDocuments);
                }
            },
            error: function(error) {
                alert(error.responseJSON);
            }
        });
    },

    onSetElementCountHandler: function(elementCount){
        this.trigger('onSetElementCount', this.model.set('elementCount', elementCount));
    },

    onPageSizeHandler: function() {
        this.trigger('onSetPageSize', this.model.get('pageSize'));
    },

    onPageNumberHandler: function() {
        this.trigger('onSetPageNumber', this.model.get('pageNumber'));
    },

    onChangeEnabledHandler: function(model, value) {
        if (!this.wasRendered) return;

        if (value) {
            this.$el.find('.bootpag').removeClass('disabled');
            //            this.$el.find('.bootpag').find('a').bind('click', true);
        } else {
            this.$el.find('.bootpag').addClass('disabled');
            this.$el.find('.bootpag.disabled').find('a').bind('click', false);
        }
    }
});
