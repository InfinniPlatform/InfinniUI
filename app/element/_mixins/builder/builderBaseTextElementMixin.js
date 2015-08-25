var builderBaseTextElementMixin = {

    initBaseTextElementEvents: function (params) {
        this.initOnKeyDownEvent(params);
    },

    initOnKeyDownEvent: function (params) {
        var metadata = params.metadata;
        var view = params.view;
        var element = params.element;

        if (metadata.OnKeyDown) {
            element.onKeyDown(function (data) {
                new ScriptExecutor(view).executeScript(metadata.OnKeyDown.Name, data);
            });
        }

    }

};