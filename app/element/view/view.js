function View() {
    var model = new ViewModel();

    var culture = new Culture(InfinniUI.config.lang);

    var isLoading = false;

    this.onLoadedHandlers = $.Deferred();

    this.context = {
        notInitialized: true,
        Controls: {},
        DataSources: {}
    };

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

    this.getLayoutPanel = function (value) {
        return model.get('layoutPanel');
    };

    var dataSources = [];

    this.setDataSources = function (value) {
        dataSources = value;

        this.context.DataSources = {};
        for(var i = 0, ii = dataSources.length; i < ii; i++){
            this.context.DataSources[dataSources[i].getName()] = dataSources[i];
        }


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

        if(!this.context.notInitialized){
            return this.context;
        }
        delete this.context.notInitialized;


        this.context.Parameters = {};
        for (var j = 0; j < parameters.length; j++) {
            this.context.Parameters[parameters[j].getName()] = parameters[j];
        }

        this.context.Scripts = {};
        for (var key in scripts) {
            this.context.Scripts[key] = {
                Run: (function(k){
                    return function (context, args) {
                        scripts[k].run(context, args);
                    }
                })(key)
            }
        }

        this.context.ParentView = this;

        var that = this;
        //добавляем операции глобального контекста
        this.context.Global = {

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

            session: new AuthenticationProvider(InfinniUI.config.serverUrl),

            culture: culture,

            urlParams: urlManager.getParams()
        };

        return this.context;
    };

    this.getScriptsStorage = function () {
        return this;
    };

    var elements = [];

    this.registerElement = function (element) {
        elements.push(element);
        this.context.Controls[element.getName()] = element;
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

    this.setStyle = function (style) {
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
        this.childLayout = $(model.get('layoutPanel').render());
        this.childLayout.css('visibility', 'hidden');

        eventStore.executeEvent('onOpening', this.childLayout);
    };

    this.close = function (acceptResult) {
        var response = eventStore.executeEvent('onClosing');
        var canClose = response.indexOf(false) === -1;
        if (canClose) {
            eventStore.executeEvent('onClosed', acceptResult);
        }

        return canClose;
    };

    this.exchange = null;

    this.getExchange = function () {
        if (this.exchange == null) {
            this.exchange = messageBus.getExchange(this.getGuid()/*guid()*/);
        }

        return this.exchange;
    };

    this.loaded = function () {
        var that = this;

        this.onLoadedHandlers.resolve(this);
        setTimeout(function () {
            eventStore.executeEvent('onLoaded');
            that.childLayout.css('visibility', 'visible');
        }, 0);
    };

    this.loading = function () {
        isLoading = true;
        eventStore.executeEvent('onLoading');
    };

    this.isLoading = function () {
        return isLoading;
    };

    var childViews = {};

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

    /**
     * @description Возвращает корневое представление, открытое в режиме приложения
     * @returns {*}
     */
    this.getApplicationView = function () {
        var isApplication = model.get('isApplication');
        var parent = this.parent;

        if (isApplication) {
            return this;
        } else {
            return _.isEmpty(parent) ? null : parent.getApplicationView();
        }
    };

    this.setGuid = function (guid) {
        model.set('guid', guid);
    };

    this.getGuid = function () {
        return model.get('guid');
    };


    var _nestedViews = [];

    this.addNestedView = function ( view) {
        _nestedViews.push(view);
    };

    this.removeNestedView = function (view) {
        var i = _nestedViews.indexOf(view);

        if (i === -1) {
            return;
        }
        _nestedViews.splice(i, 1);
    };

    this.getNestedViews = function () {
        return _nestedViews;
    };

    this.isApplication = function (param) {
        var result = model.get('isApplication');

        if (_.isBoolean(param)) {
            model.set('isApplication', param);
        }

        return result;
    }
}

var ViewModel = Backbone.Model.extend({
    defaults: {
        isApplication: false,
        layoutPanel: null
    }
});
