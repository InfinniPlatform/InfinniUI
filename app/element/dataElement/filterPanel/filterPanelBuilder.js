function FilterPanelBuilder() {
}

_.inherit(FilterPanelBuilder, ElementBuilder);

_.extend(FilterPanelBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initValueProperty(params);
        this.initScriptsHandlers(params);

        params.element.setDataSource(params.metadata.DataSource);
        params.element.setView(params.parent);
        //params.metadata.Query = [
        //        {
        //            CriteriaType: 1,
        //            Property: "MedicalWorker.Id",
        //            Value: "9f7df52a-229a-4b6c-978f-83e19573d510"
        //        }
        //];
        params.element.setQuery(params.metadata.Query);

        var array = [];
        _.each(params.metadata.GeneralProperties, function (metadataProperty) {
            var obj = {};
            var label = params.builder.build(params.parent, {Label: {}});
            label.setValue(metadataProperty.Text);

            obj.text = label;
            obj.property = metadataProperty.Property;
            obj.operators = [];

            _.each(metadataProperty.Operators, function (metadataOperator) {
                var operator = {};
                operator.operator = metadataOperator.Operator;
                operator.el = params.builder.build(params.parent, metadataOperator.Editor);
                obj.operators.push(operator);
            });

            array.push(obj);
        });
        params.element.setFilters(array);

        this.initDataSource(params);
    },

    createElement: function (params) {
        return new FilterPanel(params.parent);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события

        if (params.parent && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
            });
        }
    },

    initDataSource: function (params) {
        var self = params;

        params.element.onValueChanged(function (value) {
            var args = {
                source: self.element,
                dataSource: self.metadata.DataSource,
                value: value
            };

            var view = self.element.getView();
            var exchange = view.getExchange();
            exchange.send(messageTypes.onSetPropertyFilters, args);
        });
    }

}, builderValuePropertyMixin);
