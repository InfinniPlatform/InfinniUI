function RouteToActionBuilder() {}

_.extend(RouteToActionBuilder.prototype, BaseActionBuilderMixin, routerServiceMixin, {

	build: function (context, args) {
		var action = new RouteToAction(),
				newHref = routerService.getLinkByName(args.metadata.Name, 'no'),
				hrefParams = args.metadata.Params,
				query = args.metadata.Query;

		action.setHref(newHref);
		args.element = action;

		if( hrefParams ) {
			for( var i = 0, ii = hrefParams.length; i < ii; i += 1 ) {
				if( typeof hrefParams[i].Value === 'string' ) {
					if( action.getHref() !== newHref ) {
						newHref = action.getHref();
					}
					newHref = this.replaceParamsInHref(newHref, hrefParams[i].Name, hrefParams[i].Value);
					action.setHref(newHref);
				} else {
					this.bindParams(args, hrefParams[i].Name, hrefParams[i].Value, newHref);
				}
			}
		}

		if( query ) {
			for( var i = 0, ii = query.length; i < ii; i += 1 ) {
				if( typeof query[i].Value === 'string' ) {
					if( action.getHref() !== newHref ) {
						newHref = action.getHref();
					}
					newHref = this.replaceParamsInQuery(newHref, query[i].Name, query[i].Value);
					action.setHref(newHref);
				} else {
					this.bindQuery(args, query[i].Name, query[i].Value, newHref);
				}
			}
		}
		return action;
	}

});

window.InfinniUI.RouteToActionBuilder = RouteToActionBuilder;
