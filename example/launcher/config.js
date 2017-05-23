/*===============InfinniUI config===============*/
var InfinniUI = window.InfinniUI || {};
window.InfinniUI = InfinniUI;

InfinniUI.config = InfinniUI.config || {};
InfinniUI.config.lang = 'en-US';

// learn more: http://infinniui-en.readthedocs.io/en/latest/Core/Config/
// InfinniUI.config.cacheMetadata = true;
InfinniUI.config.serverUrl = 'http://' + window.location.host;
InfinniUI.config.configName = 'test';

InfinniUI.config.homePage = '/views/homePage.json';

// when enableAutoHeightService = false, body will have full height and will scrollable
InfinniUI.config.enableAutoHeightService = true;

// Example for routing, launch with router.json config file

// History API settings for routing, read Backbone.history for possible options
InfinniUI.config.historyAPI = {
    pushState: true
};

InfinniUI.config.routes = [
    {
        Name: 'main',
        Path: '/',
        Action: '{ openDatagridPage(context, args); }'
    },
    {
        Name: 'login',
        Path: '/login',
        Action: '{ openLoginPage(context, args); }'
    },
    {
        Name: 'dataBinding',
        Path: '/data_binding',
        Action: '{ openDataBindingPage(context, args); }'
    },
    {
        Name: 'custom',
        Path: '/custom',
        Action: '{ openCustomElementsPage(context, args); }'
    }
];

/*===============ApplicationExample config===============*/
window.ApplicationExample = {
    user: null,
    config: {}
};

// when need to use GetCurrentUser
//ApplicationExample.config.enableGetCurrentUser = true;
