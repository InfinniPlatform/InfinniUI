var MenuBarView = ControlView.extend({
    tagName: 'div',
    className: 'pl-menu page-sidebar',

    templateMenu: _.template('<ul class="sidebar-menu <%=alignment%>"></ul>'),
    templateListContainer: _.template('<div class="sub-menu"><ul></ul></div>'),
    templateItemDefault: _.template('<li><a href="javascript:;"><i class="fa fa-file-o"></i><span class="title"></span></a></li>'),
    templateItemRight: _.template('<li><a href="javascript:;"><span class="title"></span><i class="fa fa-file-o"></i></a></li>'),

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'itemsIsChange', this.rerender);
    },

    render: function () {
        this.prerenderingActions();

        this.$el.empty();
        this.menuStrategy();

        this.renderCompositeItems(this.model.getItems(), this.$el.find('.sidebar-menu'));

        this.postrenderingActions();
        return this;
    },

    menuStrategy: function(){
        if(this.model.get('horizontalAlignment')) {
            this.$el.append($(this.templateMenu({alignment: 'horizontal'}))); //HORIZONTAL MENU
            return this.model.get('horizontalAlignment');
        }else{
            this.$el.append($(this.templateMenu({alignment: 'vertical'}))); //VERTICAL MENU
            return this.model.get('verticalAlignment');
        }
    },

    renderCompositeItems: function (items, $container) {
        _.each(items, function(item){
            var $item = $(this.templateItemDefault({}));
            $item.find('.title').append(item.text);
            $item.find('.title').attr('title', item.text);

            if (item.action || !item.items) {
                this.setAction($item, item.action);
            } else {
                $item.find('a').parent().addClass('sub-menu-container');
                $item.find('a').append('<span class="arrow"></span>');
            }

            if (item.items !== undefined && item.items.length !== 0) {
                $item.append($(this.templateListContainer({})));
                this.renderCompositeItems(item.items, $item.find('ul'));
            }
            $container.append($item);
        }, this);

        this.mouseHoverHandler($container);
    },

    mouseHoverHandler: function($container){
        var self = this;
        $container.find('.sub-menu-container').hover(function(){
            var subMenu = $(this).children('.sub-menu');

            subMenu.stop().fadeIn(100);
            var odds = 0;

            if($(subMenu).children('ul').find('.sub-scroll').length == 0) {
                if ($(subMenu).children('ul').height() > $(document).height() - 92) {
                    if (parseInt($(subMenu).children('ul').css('margin-top')) >= 0) {
                        $(subMenu).find('.sub-scroll').remove();
                        $(subMenu).append('<div class="sub-scroll down"><i></i></div>');
                    } else {
                        $(subMenu).find('.sub-scroll').remove();
                        $(subMenu).append('<div class="sub-scroll top"><i></i></div>');
                    }
                    odds = (parseInt($(subMenu).children('ul').height()) - parseInt($(document).height())+92);
                }
            }

            $('.sub-scroll').on('mouseenter', function() {
                var self = this;
                if ($(this).hasClass('down')) {
                    $(subMenu).children('ul').stop().animate({
                        marginTop: (odds < 0) ? odds : -odds
                    }, 300, function () {
                        $(self).fadeOut(100, function () {
                            $(self).removeClass('down').addClass('top');
                            $(self).fadeIn(200)
                        });
                    });
                }else{
                    $(subMenu).children('ul').stop().animate({
                        marginTop: 0
                    },300, function(){
                        $(self).fadeOut(100,function(){
                            $(self).removeClass('top').addClass('down');
                            $(self).fadeIn(200)
                        });
                    });
                }
            });

            if(self.model.get('horizontalAlignment')) { //При горизонтальном меню, не дает вылезти за рамки
                if (subMenu.offset().left + subMenu.width() > $(document).width()) {
                    subMenu.addClass('right');
                    //TODO: при ресайзе окна, удалять right
                }else{
                    //subMenu.removeClass('right');
                }
            }
        },function(){
            var subMenu = $(this).children('.sub-menu');
            subMenu.stop().fadeOut(200);
        });
    },

    setAction: function($item, action) {
        $item.click(function () {
            action.execute();
        });
    }
});