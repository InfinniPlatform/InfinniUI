/**
 * @param parent
 * @constructor
 * @augments Container
 */
function View(parent) {
    _.superClass(View, this, parent);

    var view = this;

    this.eventManager = new EventManager();

    this.openStrategy = new OpenModeDefaultStrategy();
    this.openStrategy.setView(this);

    this.handlers = {
        onBeforeLoaded: $.Deferred(),
        onLoaded: $.Deferred()
    };

    this._initContext();

    var parentView = this.getView();

    if (parentView) {
        parentView.onClosing && parentView.onClosing(function (context, message) {
            return view.eventManager.trigger('onClosing', view.getContext(), view._getScriptArgs())
        });

        parentView.onClosed && parentView.onClosed(function (context, message) {
            view.eventManager.trigger('onClosed', view.getContext(), view._getScriptArgs());
        });
    }

    this.control.get('dataSources').onChange(function(){
        view._initDataSourceHandlers();
    });
}

_.inherit(View, Container);

_.extend(View.prototype,
    {

        _initDataSourceHandlers: function(){
            var that = this;
            var dataSources = this.getContext().dataSources;
            var readyDsDeferred = [];

            this.control.onLoaded(function(){
                for(var k in dataSources){
                    readyDsDeferred.push(dataSources[k].getCurrentRequestPromise());
                }

                if(readyDsDeferred.length > 0){
                    $.when.apply($, readyDsDeferred).done(function(){
                        that._notifyAboutDsReady();
                    });
                }else{
                    that._notifyAboutDsReady();
                }

            });
        },

        _notifyAboutDsReady: function(){
            this.handlers.onBeforeLoaded.resolve();
            this.handlers.onLoaded.resolve();
        },

        createControl: function () {
            return new ViewControl();
        },

        _initContext: function(){
            this.context = {
                view: this,
                scripts: {},
                parameters: {},
                dataSources: {},
                controls: {},
                messageBus: new MessageBus(this),
                global: InfinniUI.global
            };

            var that = this;

            // on scripts changing
            this.control.get('scripts').onChange(function(){
                that.context.scripts = {};

                var newScripts = that.getScripts();

                newScripts.forEach(function(item){
                    that.context.scripts[item.name] = item.func;
                });
            });

            // on parameters changing
            this.control.get('parameters').onChange(function(){
                that.context.parameters = {};

                var newParameters = that.getParameters();

                newParameters.forEach(function(item){
                    that.context.parameters[item.name] = item;
                });
            });

            // on dataSources changing
            this.control.get('dataSources').onChange(function(){
                that.context.dataSources = {};

                var newParameters = that.getDataSources();

                newParameters.forEach(function(item){
                    that.context.dataSources[item.get('name')] = item;
                });
            });
        },

        getApplicationView: function(){
            var isApplication = this.control.get('isApplication');
            var parent = this.parent;

            if (isApplication) {
                return this;
            } else {
                return _.isEmpty(parent) ? null : parent.getApplicationView();
            }
        },

        isApplication: function (param) {
            var result = this.control.get('isApplication');

            if (_.isBoolean(param)) {
                this.control.set('isApplication', param);
            }

            return result;
        },

        registerElement: function(element){
            this.context.controls[element.name] = element;
        },

        getIcon: function(){
            return this.control.get('icon');
        },

        setIcon: function(value){
            return this.control.set('icon', value);
        },

        getContext: function(){
            return this.context;
        },

        getScripts: function () {
            return this.control.get('scripts');
        },

        getParameters: function () {
            return this.control.get('parameters');
        },

        getDataSources: function () {
            return this.control.get('dataSources');
        },

        getDialogResult: function(){
            return this.control.get('dialogResult');
        },

        setDialogResult: function(value){
            return this.control.set('dialogResult', value);
        },

        open: function(success, error){

            var context = this.getContext();
            var scriptArgs = this._getScriptArgs();

            if(this.eventManager.trigger('onOpening', scriptArgs, context)){

                this.openStrategy.open();

                this.eventManager.trigger('onOpened', scriptArgs, context);

                if(success){
                    success(context, scriptArgs);
                }

            } else if(error){
                error(context, scriptArgs);
            }
        },

        close: function(success, error){

            if(this.isClosing){
                return;
            }else{
                this.isClosing = true;
            }

            var context = this.getContext();
            var scriptArgs = this._getScriptArgs();

            if(this.eventManager.trigger('onClosing', scriptArgs, context)){
                this.eventManager.trigger('onClosed', scriptArgs, context);

                this.openStrategy.close();

                if(success){
                    success(context, scriptArgs);
                }

            } else if(error){
                error(context, scriptArgs);
            }
        },

        getScriptsStorage: function(){
            return this;
        },

        setOpenStrategy: function(openStrategy){
            this.openStrategy = openStrategy;
        },

        onBeforeLoaded: function (handler) {
            this.handlers.onBeforeLoaded.done(handler);
        },

        onLoaded: function (handler) {
            this.handlers.onLoaded.done(handler);
        },

        onOpening: function(callback){
            this.eventManager.on('onOpening', callback);
        },

        onOpened: function(callback){
            this.eventManager.on('onOpened', callback);
        },

        onClosing: function(callback){
            this.eventManager.on('onClosing', callback);
        },

        onClosed: function(callback){
            this.eventManager.on('onClosed', callback);
        },

        _getScriptArgs: function(){
            return {
                source: this
            };
        },

        /**
         * @description Устанаваливает шаблон заголовка
         * @param {Function} template
         */
        setHeaderTemplate: function (template) {
            this.headerTemplate  = template;
        },

        /**
         * @description Возвращает шаблон заголовка
         * @returns {Function|*}
         */
        getHeaderTemplate: function () {
            return this.headerTemplate;
        },

        /**
         * @description Устанавливает флаг видитмости кнопки закрытия
         * @param {boolean} value
         */
        setCloseButton: function (value) {
            if (typeof value === 'boolean') {
                this.control.set('closeButton', value);
            }
        },

        /**
         * @description Возвращает флаг видимости кнопки закрытия
         * @returns {boolean}
         */
        getCloseButton: function () {
            return this.control.get('closeButton');
        },

        noDataSourceOnView: function(){
            this._initDataSourceHandlers();
        }
    }
);