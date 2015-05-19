function MenuBarBuilder() {
}

_.inherit(MenuBarBuilder, ElementBuilder);

_.extend(MenuBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element,
            metadata = params.metadata;

        metadata.MetadataName = 'MainMenu';


        window.providerRegister.build('MetadataDataSource', metadata).getMenuMetadata(function (data) {
            function findItems(Items, arr) {
                if (Items) {
                    _.each(Items, function (subItem) {
                        var el = {
                            Text: subItem.Text,
                            Image: subItem.Image
                        };
                        if(subItem.Action){
                            el.Action = params.builder.build(params.parent, subItem.Action);
                        }
                        if(subItem.Items){
                            el.Items = [];
                            findItems(subItem.Items, el.Items);
                        }
                        arr.push(el);
                    });
                }
                return arr;
            }

            var menuName = InfinniUI.State.getMenuName();
            var configId = InfinniUI.State.getConfigId() || metadata.ConfigId;
            element.setConfigId(configId);

            var menuMetadata;

            //if(_.isArray(data)) {
            //    if (data.length === 1) {
            //        //Единственное меню для указанной конфигурации
            //        menuMetadata = data[0];
            //        menuName = menuMetadata.Name;
            //    } else {
            //        menuMetadata = _.findWhere(data, {ConfigId: configId, Name: menuName});
            //    }
            //}
            element.setMenuName(menuName);
            //if (menuMetadata) {
            //    element.setItems(findItems(menuMetadata.Items, []));
            //}



            element.onChangeMenuName(function () {
                InfinniUI.State.setMenuName(element.getMenuName());
            });

            element.onChangeConfigId(function () {
                InfinniUI.State.setConfigId(element.getConfigId());
            });

            element.onChangeMenuList(function () {
                var data = element.getMenuList();
                var menuName = element.getMenuName();
                var configId = element.getConfigId();

                if(_.isArray(data)) {
                    menuMetadata = _.findWhere(data, {ConfigId: configId, Name: menuName});
                }
                if (menuMetadata) {
                    element.setItems(findItems(menuMetadata.Items, []));
                }
            });


        });

        this.buildMenuForConfigurations(params);
    },

    getConfigurationList: function (callback) {
        var configMetadata = {};
        var provider = new MetadataProviderREST(new QueryConstructorMetadata(InfinniUI.config.serverUrl, configMetadata), null, null);

        provider.getConfigMetadata(callback);
    },

    getMenuList: function (configId, callback) {
        var menuMetadata = {
            ConfigId: configId,
            MetadataType: 'Menu'
        };

        var provider = new MetadataProviderREST(new QueryConstructorMetadata(InfinniUI.config.serverUrl, menuMetadata));
        provider.getMenuMetadata(callback);
    },

    buildMenuForConfigurations: function (params) {
        this.getConfigurationList(function (data) {
            if (_.isArray(data) === false) {
                return;
            }

            var menuList = [];
            var updateMenuList = _.throttle(function () {
                params.element.setMenuList(menuList.slice());
            }, 100);

            if(!data){
                return;
            }

            _.forEach(data, function (item) {
                this.getMenuList(item.Name, function (menuMetadata) {
                    if(_.isArray(menuMetadata)) {
                        _.forEach(menuMetadata, function (itemMenu) {
                            if (_.isEmpty(itemMenu.ConfigId)) {
                                return;
                            }

                            menuList.push(itemMenu);
                            updateMenuList();
                        });
                    }
                });
            }, this);

        }.bind(this));
    },

    createElement: function (params) {
        return new MenuBar(params.parent);
    }

});