var MenuBarView = ControlView.extend({
    tagName: 'div',
    className: 'pl-menu page-sidebar',

    templateMenu: _.template('<ul class="sidebar-menu"></ul>'),
    templateListContainer: _.template('<div class="sub-menu"><ul></ul></div>'),
    templateItemDefault: _.template('<li><a href="javascript:;"><i class="fa fa-<%=image%>"></i><span class="title"></span></a></li>'),
    templateItemRight: _.template('<li><a href="javascript:;"><span class="title"></span><i class="fa fa-file-o"></i></a></li>'),
    template: {
        menuListItem: _.template('<option data-config="<%=ConfigId%>" value="<%=ConfigId%>/<%=Name%>" data-name="<%=Name%>"><%=Caption%></option>')
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:items', this.rerender);
        this.listenTo(this.model, 'change:menus', this.renderMenuList);
        this.listenTo(this.model, 'change:menuName', this.selectCurrentMenu);
        this.listenTo(this.model, 'change:configId', this.selectCurrentMenu);
    },

    UI: {
        menuListContainer: '#menu-configs-container',
        menuList: '#menu-configs'
    },

    events: {
        'change #menu-configs': 'onSelectChangeHandler'
    },

    render: function () {
        this.prerenderingActions();

        this.$el.empty();
        this.menuStrategy();

        this.$el.html(this.templateMenu({}));
        this.$el.find('.sidebar-menu').append('<li id="menu-configs-container" class="hidden"><select id="menu-configs" style="width: 100%; height: 30px; padding: 0 10px;"></select></li>');

        this.bindUIElements();

        //this.$el.find('#menu-configs').children().remove();
        //this.arr = this.getMenuSelect();
        this.renderMenuList();
        this.renderCompositeItems(this.model.getItems(), this.$el.find('.sidebar-menu'));
        this.postrenderingActions();
        return this;
    },

    onSelectChangeHandler: function(e){
        var selectedItem = $('#menu-configs').find('option:selected');
        var configId = selectedItem.data('config');//$('#menu-configs').val();
        var menuName = selectedItem.data('name');

        //localStorage.setItem('menuName', menuName);
        this.model.set('menuName', menuName);

        $('.sidebar-menu').children('li').not(':first').remove();

        if (configId != '') {
            //location.href = location.href.replace(/#?\S*$/, '#/' + configId);
            this.model.set('configId', configId);
            location.reload(true);
        }
    },

    renderMenuList: function () {
        if (typeof this.ui.menuListContainer === 'undefined' || this.ui.menuListContainer === null) {
            return;
        }

        var menuList = this.model.get('menus');
        var hidden = _.isEmpty(menuList) || (menuList.length === 1 && !_.isEmpty(this.model.getItems())) ;

        this.ui.menuListContainer.toggleClass('hidden', hidden);

        if (hidden) {
            localStorage.removeItem('menuName');
            return;
        }

        var items = _.map(menuList, this.template.menuListItem);

        this.ui.menuList.html(items);
        this.selectCurrentMenu();
        //var model = this.model;

        //var self = this;
        //var configId = model.get('configId');
        //var menuName = model.get('menuName');
        //_.forEach(items, function(item){
        //    //if($(item).data('config') == location.hash.substr(2) && $(item).data('name') == localStorage.getItem('menuName')) {
        //
        //    if($(item).data('config') == configId && $(item).data('name') == menuName) {
        //        self.ui.menuList.val([configId, menuName].join('/'));
        //    }
        //})
    },

    selectCurrentMenu: function () {
        if(!this.wasRendered) {
            return;
        }
        var model = this.model;
        var configId = model.get('configId');
        var menuName = model.get('menuName');
        this.ui.menuList.val([configId, menuName].join('/'));
    },

    menuStrategy: function(){
        if(this.model.get('horizontalAlignment')) {
            this.$el.addClass('horizontal');
            return this.model.get('horizontalAlignment');
        }else{
            this.$el.addClass('vertical');
            return this.model.get('verticalAlignment');
        }
    },

    renderCompositeItems: function (items, $container) {
        _.each(items, function(item){
            var $item = $(this.templateItemDefault({image: item.Image || 'file'}));
            $item.find('.title').append(item.Text);
            $item.find('.title').attr('title', item.Text);

            if (item.Action || !item.Items) {
                this.setAction($item, item.Action);
            } else {
                $item.find('a').parent().addClass('sub-menu-container');
                $item.find('a').append('<span class="arrow"></span>');
            }

            if (item.Items !== undefined && item.Items.length !== 0) {
                $item.append($(this.templateListContainer({})));
                this.renderCompositeItems(item.Items, $item.find('ul'));
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

            //добавление стрелок верх, вниз, при заполнении items
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
                    odds = (parseInt($(subMenu).children('ul').height()) - parseInt($(document).height())+100);
                }
            }

            $(subMenu).bind('mousewheel', function(event) {
                event.preventDefault();
                var $subscroll = $('.sub-scroll');

                if (event.originalEvent.wheelDelta >= 0) {
                    if(parseInt($(subMenu).children('ul').css('margin-top')) != 0) {
                        $(subMenu).children('ul').stop().animate({
                            marginTop: 0
                        }, 200, function () {
                            $subscroll.fadeOut(100, function () {
                                $(this).removeClass('top').addClass('down');
                                $(this).fadeIn(200)
                            });
                        });
                    }
                }else{
                    var razn = (odds < 0) ? odds : -odds;
                    if(parseInt($(subMenu).children('ul').css('margin-top')) != razn) {
                        $(subMenu).children('ul').stop().animate({
                            marginTop: razn
                        }, 200, function () {
                            $subscroll.fadeOut(100, function () {
                                $(this).removeClass('down').addClass('top');
                                $(this).fadeIn(200)
                            });
                        });
                    }
                }
            });

            $('.sub-scroll').on('mouseenter', function() {
                var self = this;
                if ($(this).hasClass('down')) {
                    $(subMenu).children('ul').stop().animate({
                        marginTop: (odds < 0) ? odds : -odds
                    }, 200, function () {
                        $(self).fadeOut(100, function () {
                            $(self).removeClass('down').addClass('top');
                            $(self).fadeIn(200)
                        });
                    });
                }else{
                    $(subMenu).children('ul').stop().animate({
                        marginTop: 0
                    }, 200, function(){
                        $(self).fadeOut(100,function(){
                            $(self).removeClass('top').addClass('down');
                            $(self).fadeIn(200)
                        });
                    });
                }
            });
            //

            //fix при вылазки меню за пределы экрана
            if(self.model.get('horizontalAlignment')) { //При горизонтальном меню, не дает вылезти за рамки
                if (subMenu.offset().left + subMenu.width() > $(document).width()) {
                    subMenu.addClass('right');
                }else{
                    //TODO: при ресайзе окна, удалять right
                    //subMenu.removeClass('right');
                }
            }
            //

        },function(){
            var subMenu = $(this).children('.sub-menu');

            if(!self.model.get('horizontalAlignment')){
                subMenu.stop().fadeOut(200); //при вертикальном меню, небольшая задержка
            }else{
                subMenu.stop().fadeOut(100); //минимальная задержка при горизонтальном меню
            }
        });
    },

    setAction: function($item, action) {
        $item.click(function () {
            action.execute();
        });
    }
});