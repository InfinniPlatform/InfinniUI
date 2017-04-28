(function ($target) {

	var $target = $('body');

	InfinniUI.global.messageBus.subscribe('onViewCreated', function (context, args) {
		if(args.value.openMode == 'Default' && InfinniUI.RouterService) {
			InfinniUI.RouterService.setContext(args.value.view.context);
			InfinniUI.RouterService.startRouter();
		}
	});

	InfinniUI.openHomePage($target);

})();
