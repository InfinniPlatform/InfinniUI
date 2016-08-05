function ServerActionBuilder() {}

_.extend(ServerActionBuilder.prototype,
    BaseActionBuilderMixin,
    {
        build: function (context, args) {
            var builder = args.builder,
                metadata = args.metadata,
                parentView = args.parentView;

            var action = new ServerAction(parentView);

            this.applyBaseActionMetadata(action, args);

            action.setProperty('origin', metadata.Origin);
            action.setProperty('path', metadata.Path);

            if (metadata.Data) {
                action.setProperty('data', metadata.Data);
            }

            if (metadata.Method) {
                action.setProperty('method', metadata.Method);
            }

            if (metadata.ContentType || metadata.ContentType === false) {
                action.setProperty('contentType', metadata.ContentType);
            }

            if(metadata.Params){
                for(var name in metadata.Params) {

                    var value = metadata.Params[name];

                    if (typeof value != 'object') {
                        if (value !== undefined) {
                            action.setParam(name, value);
                        }
                    } else {
                        this._initBinding(name, value, action, parentView, builder);
                    }
                }
            }

            return action;
        },

        _initBinding: function (paramName, paramValue, action, parentView, builder) {
            var args = {
                parent: parentView,
                parentView: parentView
            };

            var dataBinding = builder.buildBinding(paramValue, args);

            dataBinding.setMode(InfinniUI.BindingModes.toElement);

            dataBinding.bindElement({
                setProperty: function (name, value) {
                    action.setParam(name, value);
                },

                onPropertyChanged: function () {
                }

            }, paramName);
        }
    }
);