window.InfinniUI = window.InfinniUI || {};
window.InfinniUI.config = window.InfinniUI.config || {};
window.InfinniUI.config.lang = 'en-US';

// override default configs located in InfinniUI/app/config.js
// window.InfinniUI.config.cacheMetadata = true;
window.InfinniUI.config.serverUrl = 'http://' + window.location.host;
window.InfinniUI.config.configName = 'test';

window.InfinniUI.config.homePage = '/viewExample/homePage.json';

// when enableAutoHeightService = false, body will have full height and will scrollable
window.InfinniUI.config.enableAutoHeightService = false;

// when need to use GetCurrentUser
window.InfinniUI.config.enableGetCurrentUser = true;


// Example for routing, launch with router.json config file

// History API settings for routing, read Backbone.history for possible options
window.InfinniUI.config.HistoryAPI = {
    pushState: true
};

window.InfinniUI.config.Routes = [
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
    }
];
