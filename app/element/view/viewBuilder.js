function ViewBuilder() {
}

_.inherit(ViewBuilder, ElementBuilder);

_.extend(ViewBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata;
        var view = params.element;
        var parent = params.parent;
        var outerParams = params.params;

        view.setGuid(guid());

        //InfinniUI.views[view.getGuid()] = {
        //    metadata: metadata,
        //    view: view
        //};

        if (parent instanceof View) {
            parent.addNestedView(view);
        }

        view.setParentView(parent);

        if(parent.addChildView){
            parent.addChildView(metadata.Name, view);
        }


        this.handleParameters(view, metadata.RequestParameters, params.builder, outerParams, parent);
        this.handleParameters(view, metadata.Parameters, params.builder, outerParams, parent);

        view.setCaption(metadata.Caption);
        view.setScripts(metadata.Scripts);

        view.onTextChange(this.onChangeTextHandler.bind(this, params));
        
        view.onClosed(function () {
            var removeView = function (view) {
                InfinniUI.views.removeView(view);
            };
            _.each(view.getNestedViews(), removeView);

            if(metadata.OnClosed){
                new ScriptExecutor(view).executeScript(metadata.OnClosed.Name);
            }

            removeView(view);
        });

        if (metadata.OnClosing) {
            view.OnClosing(function () {
                new ScriptExecutor(view.getScriptsStorage()).executeScript(metadata.OnClosing.Name);
            });
        }

        view.setDataSources(params.builder.buildMany(view, metadata.DataSources));
        
        //_.each(metadata.ChildViews, function (childViewMetadata) {
        //    var linkView = params.builder.build(view, childViewMetadata.LinkView);
        //    view.addChildView(childViewMetadata.Name, linkView);
        //});


        view.setLayoutPanel(params.builder.build(view, metadata.LayoutPanel));
    },

    onChangeTextHandler: function (params) {
        var exchange = messageBus.getExchange('global');

        exchange.send(messageTypes.onViewTextChange, {
            source: params.element,
            value: params.element.getText()
        });
    },

    handleParameters: function(view, parameters, builder, outerParams, parent){
        var name;

        if (typeof parameters !== 'undefined' && parameters !== null) {
            for (var i = 0; i < parameters.length; i++) {
                if(parameters[i].Value === undefined){
                    name = parameters[i].Name;

                    if(outerParams[name]){
                        view.addParameter(outerParams[name]);
                    }else{
                        var emptyParameter = builder.buildType(parent, 'Parameter', {Name:name, Value:null})
                    }

                }


                if(parameters[i].OnValueChanged){
                    (function(parameter){
                        //debugger;
                        view.getParameter(parameter.Name).onValueChanged(function(arg1, value){
                            new ScriptExecutor(view).executeScript(parameter.OnValueChanged.Name, value);
                        });
                    })(parameters[i]);

                }

            }
        }
    },

    createElement: function (params) {
        return new View(params.parent);
    }

}, builderValuePropertyMixin, builderFormatPropertyMixin);
