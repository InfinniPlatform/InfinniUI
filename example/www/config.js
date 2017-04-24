InfinniUI = InfinniUI || {};
InfinniUI.config = InfinniUI.config || {};
InfinniUI.config.lang = 'en-US';

// override default configs located in InfinniUI/app/config.js
// InfinniUI.config.cacheMetadata = true;
InfinniUI.config.serverUrl = 'http://' + window.location.host;
InfinniUI.config.configName = 'test';

InfinniUI.config.homePage = '/viewExample/homePage.json';

// when enableAutoHeightService = false, body will have full height and will scrollable
InfinniUI.config.enableAutoHeightService = false;

// when need to use GetCurrentUser
InfinniUI.config.enableGetCurrentUser = true;


// Example for routing, launch with router.json config file

// History API settings for routing, read Backbone.history for possible options
InfinniUI.config.HistoryAPI = {
    pushState: true
};

InfinniUI.config.Routes = [
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
