var OpenModeDefaultStrategy = function () {

};

_.extend(OpenModeDefaultStrategy.prototype, {
    setView: function(view){
        this.view = view;
    },

    open: function(){
        var $container = launcherConfig.$rootContainer || $('body');
        var oldView = $container.data('view');
        var $view = this.view.render();

        if(oldView){
            oldView.close();
        }

        $container
            .empty()
            .append($view)
            .data('view', this.view);
    }
});
