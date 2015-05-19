var ApplicationState = function (storage) {
    var defaultMenu = 'MainMenu';

    this.getMenuName = function () {
        return storage.getData('MenuName', defaultMenu);
    };

    this.setMenuName = function (value) {
        storage.setData('MenuName', value);
    };

    this.getConfigId = function () {
        return storage.getData('ConfigId');
    };

    this.setConfigId = function (value) {
        storage.setData('ConfigId', value);
    };

    this.clear = function () {
        storage.clear();
    }

};

window.InfinniUI.State = new ApplicationState(new LocalStorageData());

