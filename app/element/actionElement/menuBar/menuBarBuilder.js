function MenuBarBuilder() {
}

_.inherit(MenuBarBuilder, ElementBuilder);

_.extend(MenuBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var self = params.element,
            metadata = params.metadata;

        metadata.MetadataName = 'MainMenu';

        window.providerRegister.build('MetadataDataSource', metadata).getMenuMetadata(function (data) {
            function findItems(Items, arr) {
                if (Items) {
                    _.each(Items, function (subItem) {
                        var el = {
                            text: subItem.Text
                        };
                        if(subItem.Action){
                            el.action = params.builder.build(params.parent, subItem.Action);
                        }
                        if(subItem.Items){
                            el.items = [];
                            findItems(subItem.Items, el.items);
                        }
                        arr.push(el);
                    });
                }
                return arr;
            }

            self.setItems(findItems(data.Items, []));
        });
    },

    createElement: function (params) {
        return new MenuBar(params.parent);
    }

});