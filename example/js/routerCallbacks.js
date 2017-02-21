function openHomePage(context, args) {
	if( context.controls["MainContent"] != null ) {
		context.controls["MainContent"].setLayout(null);
	}
}

function openDatagridPage(context, args) {
	context.global.executeAction(context, {
		OpenAction: {
			LinkView: {
				AutoView: {
					Path: "viewExample/dataGrid.json",
					OpenMode: "Container",
					Container: "MainContent"
				}
			}
		}
	});
}

function openLoginPage(context, args) {
	context.global.executeAction(context, {
		OpenAction: {
			LinkView: {
				AutoView: {
					Path: "viewExample/loginPage.json",
					OpenMode: "Container",
					Container: "MainContent"
				}
			}
		}
	});
}

function openDataBindingPage(context, args) {
	context.global.executeAction(context, {
		OpenAction: {
			LinkView: {
				AutoView: {
					Path: "viewExample/binding.json",
					OpenMode: "Container",
					Container: "MainContent"
				}
			}
		}
	});
}


InfinniUI.localizations['ru-RU'].strings.customMessage = {
	filterLabels: {
		name: 'Различные фильтры',
		byName: 'Фильтр по имени',
		byPrice: 'Фильтр по цене',
		byDisplay: 'Фильтр по разрешению'
	}
};

InfinniUI.localizations['en-US'].strings.customMessage = {
	filterLabels: {
		name: 'Different Filters',
		byName: 'Filter by name',
		byPrice: 'Filter by price',
		byDisplay: 'Filter by display'
	}
};
