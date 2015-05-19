var DataGridPopupMenuModel = Backbone.Model.extend({
    initialize: function () {
        this.set('items', []);
    }
});

var DataGridPopupMenuView = Backbone.View.extend({

    className: 'pl-data-grid-popupmenu',

    template: InfinniUI.Template['controls/dataGrid/template/popupMenu.tpl.html'],

    initialize: function () {
        this.model = new DataGridPopupMenuModel();
        this.timerId = null;
    },

    events: {
        contextmenu: 'onContextMenuHandler',
        mouseleave: 'onMouseleaveHandler',
        mouseover: 'onMouseoverHandler',
        'click button': 'onClickMenuItem'
    },

    render: function () {
        var items = this.model.get('items'),
            $html = $('<ul></ul>');

        for(var i = 0, ii = items.length; i<ii; i++){
            $('<li></li>')
                .append( items[i].render() )
             .appendTo($html);
        }

        this.$el
            .empty()
            .append($html);
        return this;
    },

    setItems: function (items) {
        this.model.set('items', items);
    },

    show: function (x, y) {
        this.render();
        var $window = $(window),
            windowHeight = $window.height(),
            windowWidth = $window.width(),
            $el = this.$el,
            el = this.el;

        $('body').append(this.$el);

        setTimeout(function () {
            var rect = el.getBoundingClientRect();

            var dx = 0,
                dy = 0;
            if (x + rect.width > windowWidth) {
                dx = (x - rect.width < 0) ? 0 : -rect.width;
            }

            if (y + rect.height > windowHeight) {
                dy = (y + rect.height > windowHeight) ? -rect.height : 0;
            }

            $el.css('left',  x + dx);
            $el.css('top',  y + dy);
        }, 10);
    },

    hide: function () {
        this.$el.css({
            position: 'absolute',
            left: -99999,
            top: -99999
        });
    },

    onClickMenuItem: function (event) {
        event.preventDefault();
        this.hide();
    },

    onContextMenuHandler: function (event) {
        event.preventDefault();
    },

    cancelHide: function () {
        clearTimeout(this.timerId);
    },

    onMouseleaveHandler: function (event) {
        this.cancelHide();
        var menu = this;
        this.timerId = setTimeout(function () {
            menu.hide();
        }, 200);
    },

    onMouseoverHandler: function (event) {
        this.cancelHide();
    }

});