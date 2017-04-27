var InfinniUI = window.InfinniUI || {};
window.InfinniUI = InfinniUI;

InfinniUI.config = InfinniUI.config || {};
InfinniUI.config.lang = 'en-US';

// перекрываем дефолтные конфиги, лежащие в InfinniUI/app/config.js

InfinniUI.config.cacheMetadata = false;
InfinniUI.config.serverUrl = 'http://' + window.location.host;
InfinniUI.config.configName = 'test';

InfinniUI.config.homePage = '/viewExample/homePage.json';

// when enableAutoHeightService = false, body will have full height and will scrollable
InfinniUI.config.enableAutoHeightService = true;

// when need to use GetCurrentUser
//InfinniUI.config.enableGetCurrentUser = true;



// Example for routing, launch with router.json config file

//History API settings for routing, read Backbone.history for possible options
InfinniUI.config.HistoryAPI = {
	pushState: true
};

InfinniUI.config.Routes = [
	{
		Name: "main",
		Path: "/",
		Action: "{ openDatagridPage(context, args); }"
	},
	{
		Name: "login",
		Path: "/login",
		Action: "{ openLoginPage(context, args); }"
	},
	{
		Name: "dataBinding",
		Path: "/data_binding",
		Action: "{ openDataBindingPage(context, args); }"
	},
	{
		Name: "custom",
		Path: "/custom",
		Action: "{ openCustomElementsPage(context, args); }"
	}
];



