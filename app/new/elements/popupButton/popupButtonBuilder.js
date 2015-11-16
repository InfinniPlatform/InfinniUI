/**
 * @constructor
 * @augments ContainerBuilder
 */
function PopupButtonBuilder() {
    _.superClass(PopupButtonBuilder, this);
}

_.inherit(PopupButtonBuilder, ContainerBuilder);

_.extend(PopupButtonBuilder.prototype, /** @lends PopupButtonBuilder.prototype */{

    createElement: function (params) {
        var viewMode = this.detectViewMode(params);
        return new PopupButton(params.parent, viewMode);
    },

    detectViewMode: function(params){
        var viewMode = params.metadata['ViewMode'];
        var el = params.parent;
        var exit = false;

        if(!viewMode){
            while(!exit){
                if(el){
                    if(el instanceof MenuBar){
                        viewMode = 'forMenu';
                        exit = true;
                    }else{
                        el = el.parent;
                    }
                }else{
                    exit = true;
                }
            }

        }

        return viewMode
    },

    applyMetadata: function (params) {
        ContainerBuilder.prototype.applyMetadata.call(this, params);
        this.applyButtonMetadata.call(this, params);
    }

}, buttonBuilderMixin);