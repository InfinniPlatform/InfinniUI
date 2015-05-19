var DocumentViewerView = ControlView.extend({
    className: 'pl-document-viewer',

    template: _.template('<div class="pl-documentViewer"><iframe id="documentViewer" name="documentViewer" style="width:100%;" src=<%=url%>></iframe></div>'),

    events: {
        'click .print': 'onButtonPrintClickHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
    },

    render: function () {
        this.prerenderingActions();

        var renderFrame = function(){
            this.$el.empty();
            var query = dataSource.getQueryFilter();
            var requestData = {
                PrintViewId: this.model.get('viewId'),
                PrintViewType : 'ObjectView',
                ConfigId: dataSource.getConfigId(),
                DocumentId: dataSource.getDocumentId(),
                PageNumber: dataSource.getPageNumber(),
                PageSize: dataSource.getPageSize(),
                Query: query == null ? null : query.items
            };
            this.$el.append(this.template({url:InfinniUI.config.serverUrl+'/SystemConfig/UrlEncodedData/Reporting/GetPrintView/?Form='+JSON.stringify(requestData)}));
        }.bind(this);

        var dataSource = this.model.get('view').getDataSource(this.model.get('dataSource'));

        dataSource.addDataBinding({onSetPropertyValue: $.noop, bind: $.noop});

        dataSource.onItemsUpdated(function(){
            renderFrame();
        });

        renderFrame();

        this.postrenderingActions();
        return this;
    },

    onButtonPrintClickHandler: function () {
        $('#documentViewer').get(0).contentWindow.print();
    }
});