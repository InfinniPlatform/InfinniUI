var builderBaseTextElementMixin = {

    initBaseTextElementEvents: function (params) {
        this.initOnKeyDownEvent(params);
    },

    initOnKeyDownEvent: function (params) {
        var metadata = params.metadata;
        var parent = params.parent;
        var element = params.element;

        if (metadata.OnKeyDown) {
            element.onKeyDown(function (data) {
                var message = this.getBaseMessage(params);
                message.value = data;
                new ScriptExecutor(parent).executeScript(metadata.OnKeyDown.Name, message);
            }.bind(this));
        }

    }

};