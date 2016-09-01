function LinkBuilder() {
	_.superClass(LinkBuilder, this);
}

window.InfinniUI.LinkBuilder = LinkBuilder;

_.inherit(LinkBuilder, ButtonBuilder);

_.extend(LinkBuilder.prototype, routerServiceMixin, {

	createElement: function (params) {
		return new Link(params.parent);
	},

	applyMetadata: function (params) {
		ButtonBuilder.prototype.applyMetadata.call(this, params);

		var metadata = params.metadata,
				element = params.element;

		if( metadata.Href && typeof metadata.Href === 'string' ) {
			element.setHref(metadata.Href);
		} else if( metadata.Href ) {
			var pathName = metadata.Href.Name,
					hrefParams = metadata.Href.Params,
					query = metadata.Href.Query,
					href = routerService.getLinkByName(pathName, 'no'),
					newHref = href;

			element.setHref(newHref);
			if( hrefParams ) {
				for( var i = 0, ii = hrefParams.length; i < ii; i += 1 ) {
					if( typeof hrefParams[i].Value === 'string' ) {
						if( element.getHref() !== newHref ) {
							newHref = element.getHref();
						}
						newHref = this.replaceParamsInHref(newHref, hrefParams[i].Name, hrefParams[i].Value);
						element.setHref(newHref);
					} else {
						this.bindParams(params, hrefParams[i].Name, hrefParams[i].Value, newHref);
					}
				}
			}
			if( query ) {
				for( var i = 0, ii = query.length; i < ii; i += 1 ) {
					if( typeof query[i].Value === 'string' ) {
						if( element.getHref() !== newHref ) {
							newHref = element.getHref();
						}
						newHref = this.replaceParamsInQuery(newHref, query[i].Name, query[i].Value);
						element.setHref(newHref);
					} else {
						this.bindQuery(params, query[i].Name, query[i].Value, newHref);
					}
				}
			}
		}

		if( metadata.Target ) { 
			element.setTarget(metadata.Target);
		}
	}

});
