function MenuBarBuilder() {
}

_.inherit(MenuBarBuilder, ElementBuilder);

_.extend(MenuBarBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element,
            metadata = params.metadata;

        metadata.MetadataName = 'MainMenu';

        function findItems(Items, arr) {
            if (Items) {
                _.each(Items, function (subItem) {
                    var el = {
                        Text: subItem.Text,
                        Image: subItem.Image
                    };
                    if(subItem.Action){
                        el.Action = params.builder.build(params.view, subItem.Action);
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

        element.onChangeMenuName(function () {
            InfinniUI.State.setMenuName(element.getMenuName());
        });

        element.onChangeConfigId(function () {
            InfinniUI.State.setConfigId(element.getConfigId());
        });

        element.onChangeMenuList(function () {

        });

        this.buildMenuForConfigurations(params)
            .done(function (list) {
                var data = element.getMenuList();

                var menuName = InfinniUI.State.getMenuName();
                var configId = InfinniUI.State.getConfigId() || metadata.ConfigId;

                var menuMetadata;
                if(_.isArray(data)) {
                    if (data.length === 1) {
                        //Единственное меню для указанной конфигурации
                        menuMetadata = data[0];
                        menuName = menuMetadata.Name;
                        configId = menuMetadata.ConfigId;
                    } else {
                        menuMetadata = _.findWhere(data, {ConfigId: configId, Name: menuName});
                    }

                    if (typeof menuMetadata === 'undefined') {
                        if (typeof configId !== 'undefined') {
                            //Ищем меню в заданной конфигурации
                            menuMetadata = _.findWhere(data, {ConfigId: configId});
                        }
                        if (typeof menuMetadata === 'undefined') {
                            //Выбираем первое меню из списка
                            menuMetadata = data[0];
                            configId = menuMetadata.ConfigId;
                        }
                        menuName = menuMetadata.Name;
                    }

                }
                if (menuMetadata) {
                    element.setItems(findItems(menuMetadata.Items, []));
                }
                element.setConfigId(configId);
                element.setMenuName(menuName);
                element.setIsLoaded();
            });
    },

    getConfigurationList: function (callback) {
        var configMetadata = {};
        var provider = new MetadataProviderREST(new QueryConstructorMetadata(InfinniUI.config.serverUrl, configMetadata), null, null);

        provider.getConfigMetadata(callback);
    },

    getMenuList: function (configId) {
        var menuMetadata = {
            ConfigId: configId,
            MetadataType: 'Menu'
        };

        var provider = new MetadataProviderREST(new QueryConstructorMetadata(InfinniUI.config.serverUrl, menuMetadata));
        //provider.getMenuMetadata(callback);
        var defer = $.Deferred();
        provider.getMenuMetadata(function (data) {
            var list = [];

            if (_.isArray(data)) {
                list = _.filter(data, function (item) {
                    return !_.isEmpty(item.ConfigId);
                });
            }

            defer.resolve(list);
        });

        return defer.promise();
    },

    buildMenuForConfigurations: function (params) {
        var defer = $.Deferred();
        var menuList = [];

        this.getConfigurationList(function (configurations) {
            if (_.isArray(configurations) === false || _.isEmpty(configurations)) {
                return;
            }

            var promises = [], promise;
            for (var i = 0, ln = configurations.length; i < ln; i = i + 1) {
                promise = this.getMenuList(configurations[i].Name);
                promises.push(promise);
                promise.done(function (list) {
                    Array.prototype.push.apply(menuList, list);
                    params.element.setMenuList(menuList.slice());
                });
            }
            $.when.apply($, promises)
                .done(function () {
                    defer.resolve(menuList);
                });


        }.bind(this));
        return defer.promise();
    },

    createElement: function (params) {
        return new MenuBar(params.view);
    }

});