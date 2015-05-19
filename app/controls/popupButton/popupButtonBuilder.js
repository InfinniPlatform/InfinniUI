function PopupButtonBuilder() {
    this.build = function (builder, parent, metadata) {
        //debugger
        var buttonBuilder = new ButtonBuilder(PopupButton);
        var popupButton = buttonBuilder.build(builder, parent, metadata);
        this.initScriptsHandlers(parent, metadata, popupButton);

        _.each(metadata.Items, function (metadataItem) {
            popupButton.addItem(builder.build(parent, metadataItem));
        });

        return popupButton;
    };

    this.initScriptsHandlers = function(parent, metadata, popupButton){
        //Скриптовые обработчики на события
        if (parent && metadata.OnClick){
            popupButton.onClick(function() {
                new ScriptExecutor(parent).executeScript(metadata.OnClick.Name);
            });
        }
    };
}
