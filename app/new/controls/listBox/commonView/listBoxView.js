var CommonListBoxView = BaseListBoxView.extend({
    className: 'pl-listbox pl-listbox-common-mode',

    events: _.extend( {

    }, BaseListBoxView.prototype.events),

    initialize: function (options) {
        BaseListBoxView.prototype.initialize.call(this, options);
        this.initDomHandlers();
    },

    initDomHandlers: function(){
        var $listBox = this.$el,
            that = this;

        $listBox.get(0).addEventListener('click', function(e){
            e = $.event.fix(e);
            var $el = $(e.target),
                $currentListItem, item;

            while($el.get(0) != $listBox.get(0)){
                if($el.hasClass('pl-listbox-i')){
                    $currentListItem = $el;
                }

                $el = $el.parent();
            }

            if($currentListItem.length > 0){
                item = $currentListItem.data('pl-data-item');
                that.model.toggleValue(item);

                that.model.set('selectedItem', item);
            }

        }, true);
    }
});

InfinniUI.ObjectUtils.setPropertyValueDirect(window.InfinniUI, 'Listbox.viewModes.common', CommonListBoxView);