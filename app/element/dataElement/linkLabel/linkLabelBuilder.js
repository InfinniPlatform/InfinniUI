function LinkLabelBuilder() {
}

_.inherit(LinkLabelBuilder, ElementBuilder);

_.extend(LinkLabelBuilder.prototype,
    {
        defaults: {
            Foreground: "Black",
            Background: "Transparent",
            HorizontalTextAlignment: "Left",
            TextStyle: "Body1",
            TextTrimming: true,
            TextWrapping: true
        },

        applyDefaults: function (metadata) {
            var defaults = this.defaults;

            for (var i in defaults) {
                if (typeof metadata[i] === 'undefined') {
                    metadata[i] = defaults[i];
                }
            }
        },

        applyMetadata: function (params) {
            this.applyDefaults(params.metadata);
            var metadata = params.metadata;
            var element = params.element;

            ElementBuilder.prototype.applyMetadata.call(this, params);

            element.setTextWrapping(metadata.TextWrapping);
            element.setTextTrimming(metadata.TextTrimming);
            element.setLineCount(metadata.LineCount);

            this.initHorizontalTextAlignmentProperty(params);
            this.initForeground(params);
            this.initBackground(params);
            this.initTextStyle(params);
            this.initFormatProperty(params);
            this.initValueProperty(params);
            this.initBindingToProperty(params, metadata.Reference, 'Reference');
            this.initScriptsHandlers(params);

            if(params.metadata.Action) {
                params.element.setAction(params.builder.build(params.view, params.metadata.Action, params.collectionProperty));
            }
        },

        initScriptsHandlers: function (params) {
            var metadata = params.metadata;

            //Скриптовые обработчики на события
            if (params.view && metadata.OnLoaded) {
                params.element.onLoaded(function () {
                    new ScriptExecutor(params.view).executeScript(metadata.OnLoaded.Name);
                });
            }

            if (params.view && metadata.OnValueChanged) {
                params.element.onValueChanged(function () {
                    new ScriptExecutor(params.view).executeScript(metadata.OnValueChanged.Name);
                });
            }

            if (params.view && metadata.OnClick) {
                params.element.onClick(function () {
                    var script = new ScriptExecutor(params.view);
                    return script.executeScript(metadata.OnClick.Name);
                });
            }
        },

        createElement: function (params) {
            var linkLabel = new LinkLabel(params.view);
            linkLabel.getHeight = function () {
                return 34;
            };
            return linkLabel;
        }

    },
    builderValuePropertyMixin,
    builderFormatPropertyMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderBackgroundMixin,
    builderForegroundMixin,
    builderTextStyleMixin
);