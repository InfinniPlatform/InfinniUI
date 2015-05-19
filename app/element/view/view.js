function View() {
    var model = new ViewModel();

    var culture = new Culture(InfinniUI.config.lang);

    this.onLoadedHandlers = $.Deferred();

    this.onTextChange = function(callback){
        model.on('change:text', callback);
    };

    this.setText = function (value) {
        model.set('text', value);
    };

    this.getText = function () {
        return model.get('text');
    };

    this.setCaption = function (value) {
        model.set('caption', value);
    };

    this.getCaption = function () {
        return model.get('caption');
    };

    this.setVisible = function (value) {

        model.set('visible', value);
    };

    this.getVisible = function () {
        return model.get('visible');
    };

    this.setLayoutPanel = function (value) {
        model.set('layoutPanel', value);

        //window.setTimeout(function () {
            //eventStore.executeEvent('onLoaded');
        //}, 1000);
    };

    var dataSources = [];

    this.setDataSources = function (value) {
        dataSources = value;

        //После загрузке данных во все источники данных генерируем событие onLoaded
        var loading = _.map(dataSources, function (ds) {return ds.loading});
        var view = this;
        console.log("%s: %d datasource(s) assigned", view.getName(), loading.length);
        $.when.apply($, loading).done(function() {
            console.log("%s: %d datasource(s) loaded", view.getName(), loading.length);
            view.loaded();
        });
    };

    this.getDataSource = function (value) {
        for (var i = 0; i < dataSources.length; i++) {
            if (dataSources[i].getName() === value) {
                return dataSources[i];
            }
        }
        return null;
    };

    this.getDataSources = function () {
        return dataSources;
    };


    var scripts = {};

    this.setScripts = function (value) {

        if (value) {
            var scriptBuilder = new ScriptBuilder();

            for (var i = 0; i < value.length; i++) {
                scripts[value[i].Name] = scriptBuilder.build(value[i]);
            }
        }
    };

    this.getScript = function (name) {
        return scripts[name];
    };

    this.getScripts = function () {
        return scripts;
    };

    var parameters = [];

    this.getParameter = function (name) {

        for (var i = 0; i < parameters.length; i++) {
            if (parameters[i].getName() === name) {
                return parameters[i];
            }
        }
    };

    this.getParameters = function () {
        return parameters;
    };

    this.addParameter = function (parameter) {

        parameters.push(parameter);
    };


    this.getContext = function () {

        var context = {};

        context.DataSources = {};
        for (var i = 0; i < dataSources.length; i++) {
            context.DataSources[dataSources[i].getName()] = dataSources[i];
        }

        context.Parameters = {};
        for (var j = 0; j < parameters.length; j++) {

            context.Parameters[parameters[j].getName()] = parameters[j];
        }

        context.Controls = {};
        for (var k = 0; k < elements.length; k++) {
            context.Controls[elements[k].getName()] = elements[k];
        }

        context.Scripts = {};
        for (var key in scripts) {
            context.Scripts[key] = {
                Run: (function(k){
                    return function (context, args) {
                        scripts[k].run(context, args);
                    }
                })(key)
            }
        }


        context.ParentView = this;

        var that = this;
        //добавляем операции глобального контекста
        context.Global = {

            openView: function (openViewMetadata, resultCallback) {

                var builder = new ApplicationBuilder();

                var viewMetadata = builder.build(that, openViewMetadata);

                viewMetadata.createView(function (view) {
                    view.open();

                    if (resultCallback) {
                        resultCallback(view);
                    }
                });

            },

            executeAction: function (executeActionMetadata, resultCallback) {
                var builder = new ApplicationBuilder();

                var action = builder.build(that, executeActionMetadata);

                action.execute(resultCallback);
            },

            culture: culture
        };


        return context;
    };

    this.getScriptsStorage = function () {
        return this;
    };

    var elements = [];

    this.registerElement = function (element) {
        elements.push(element);
    };

    this.setHorizontalAlignment = function (horizontalAlignment) {
        //not implemented
    };

    this.setVerticalAlignment = function (verticalAlignment) {
        //not implemented
    };

    var name;
    this.setName = function (value) {
        name = value;
    };

    this.getName = function () {
        return name;
    };

    this.setEnabled = function (name) {
        //not implemented
    };

    var eventStore = new EventStore();

    this.onOpening = function (action) {
        eventStore.addEvent('onOpening', action);
    };

    this.onLoaded = function (action) {
        eventStore.addEvent('onLoaded', action);
    };

    this.handleOnLoaded = function (handler) {
        this.onLoadedHandlers.done(handler);
    };

    this.onLoading = function (action) {
        eventStore.addEvent('onLoading', action);
    };

    this.onClosed = function (action) {
        eventStore.addEvent('onClosed', action);
    };

    this.onClosing = function (action) {
        eventStore.addEvent('onClosing', action);
    };

    this.open = function () {
        eventStore.executeEvent('onOpening', model.get('layoutPanel').render());
    };

    this.close = function (acceptResult) {
        var response = eventStore.executeEvent('onClosing');
        if (response.indexOf(false) === -1) {
            eventStore.executeEvent('onClosed', acceptResult);
        }

    };

    this.exchange = null;

    this.getExchange = function () {
        if (this.exchange == null) {
            this.exchange = messageBus.getExchange(guid());
        }

        return this.exchange;
    };

    this.loaded = function () {
        eventStore.executeEvent('onLoaded');
        this.onLoadedHandlers.resolve(this);
    };

    this.loading = function () {
        eventStore.executeEvent('onLoading');
    };

    var childViews = [];

    this.getChildView = function (name) {
        return childViews[name];
    };

    this.addChildView = function (name, value) {
        childViews[name] = value;
    };

    this.getChildViews = function () {
        return childViews;
    };

    this.setParentView = function (view) {
        this.parent = view;
    };

    this.getParentView = function () {
        return this.parent;
    };

    this.getApplicationView = function () {
        if (typeof  this.parent === 'undefined') {
            return null;
        }

        return this.parent.getApplicationView();
    };


}

var ViewModel = Backbone.Model.extend({
    defaults: {
        layoutPanel: null
    }
});
