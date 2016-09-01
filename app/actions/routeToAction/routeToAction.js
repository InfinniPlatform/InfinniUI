function RouteToAction(){
    _.superClass(RouteToAction, this);
    this.href = '';
}

_.inherit(RouteToAction, BaseAction);


_.extend(RouteToAction.prototype, {

    execute: function(callback){
        var router = InfinniUI.AppRouter,
            href = this.getHref();

        router.navigate(href, {trigger: true});
    },

    getHref: function() {
        return this.href;
    },

    setHref: function(href) {
        this.href = href;
    }

});

window.InfinniUI.RouteToAction = RouteToAction;
