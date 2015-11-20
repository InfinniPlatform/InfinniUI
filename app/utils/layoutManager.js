var layoutManager = {
    windowHeight: 0,
    clientHeight: 0,
    exchange: null,

    setOuterHeight: function ($el, height, fix) {
        var delta = 0;
        'border-top-width,border-bottom-width,padding-top,padding-bottom,margin-top,margin-bottom'
            .split(',')
            .forEach(function(name) {
                delta += parseInt($el.css(name));
            });
        var contentHeight = height - delta;
        if (fix) {
            contentHeight += fix;
        }

        //@TODO Разобраться с багом, при задании clearfix.height = 0 вылезает лишний 1 пиксел. Временное решение:
        //contentHeight = (contentHeight > 0) ? contentHeight - 1 : contentHeight;

        $el.height(contentHeight);

        return contentHeight;
    },

    getModalSelector: function () {
        return '.modal-scrollable';
    },

    getSelector: function () {
        //return '.pl-data-grid, .pl-scroll-panel, .pl-document-viewer, .pl-menu.vertical, .pl-tab-panel, .pl-treeview';
        return '.verticalAlignmentStretch:not(:hidden)';
    },

    resize: function (el, pageHeight) {
        var $el = $(el);
        var contentHeight = this.setOuterHeight($el, pageHeight);
        var elements = $el.find(this.getSelector());

        if (elements.length === 0) {
            return;
        }

        var $parent;
        var list = [];
        var $element;
        var element;

        //Строим дерево элементов: от концевых элементов поднимается к корневому элементу
        for (var i = 0, ln = elements.length; i < ln; i = i + 1) {
            element = elements[i];
            $element = $(element);
            do {
                $parent = $element.parent();

                var a = _.findWhere(list, {element: element});
                if (typeof a !== 'undefined') {
                    //Элемент уже занесен в список
                    break;
                }
                list.push({
                    element: element,
                    $element: $element,
                    parent: $parent.get(0),
                    $parent: $parent
                });

                $element = $parent;
                element = $parent.get(0);
            } while (element !== el);
        }

        var tree = (function f(items, parentEl, $parentEl) {
            var items = _.where(list, {parent: parentEl});

            return {
                isElement: _.indexOf(elements, parentEl) !== -1,
                element: parentEl,
                $element: $parentEl,
                child: _.map(items, function (item) {
                    return f(items, item.element, item.$element);
                })
            };
        })(list, el, $el);

        /**
         * Если внутри child один элемент:
         *   - устанавливаем высоту в 100%
         * Если внутри child несколько элементов
         *   - offsetTop совпадают - устанавливаем высоту в 100%
         *   - offsetTop не совпадают - устанавливаем высоту в (100 / child.length)%
         */

        var manager = this;
        (function h(node, height) {
            var children = node.$element.children(':not(:hidden):not(.modal-scrollable):not(.modal-backdrop)');
            /**
             * @TODO Возможно правильнее исключать из обсчета все элементы с абсолютным позиционированием
             */
            var originalHeight;
            var fixedHeight = 0;
            var setHeight = function (node, height) {
                originalHeight = node.$element.attr('data-height-original');
                if (originalHeight === '') {
                    node.$element.attr('data-height-original', node.element.style.height);
                }
                return manager.setOuterHeight(node.$element, height);
            };

            if(node.$element.parentsUntil('.modal').length) {
                node.$element.attr('data-height-original', node.element.style.height);
            }
            var nodeHeight = setHeight(node, height);
            if (node.$element.hasClass('pl-scroll-panel') || node.$element.hasClass('modal-scrollable')) {
                //Т.к. скроллпанель бесконечная по высоте, контролы внутри нее по высоте не растягиваем
                return;
            }


            if (node.$element.hasClass('tab-content')) {
                _.each(node.child, function (node) {
                    h(node, nodeHeight);
                });
            } else if (node.child.length > 0) {

                var grid = _.chain(children)
                    .filter(function (el) {
                        var position = $(el).css('position');
                        return ['absolute', 'fixed'].indexOf(position) === -1;
                    })
                    .groupBy('offsetTop')
                    .value();

                var heights = [];

                _.each(grid, function (row, i) {
                    var nodes = [];
                    _.each(row, function (e) {
                        var n = _.find(node.child, function (c) {return c.element === e;});
                        if (n) nodes.push(n);
                    });

                    heights.push(nodes.length ? 0 : _.reduce(row, function (height, e) {
                        return Math.max(height, $(e).outerHeight(true));
                    }, 0));

                    grid[i] = nodes;
                }, this);

                fixedHeight = _.reduce(heights, function (total, height) {return total + height}, 0);
                var count = _.reduce(grid, function (count, row) {return row.length ? count + 1 : count}, 0);

                var heightForNode = Math.floor((nodeHeight - fixedHeight) / count);

                _.each(grid, function (row) {
                    if (row.length === 0) return;
                    _.each(row, function (node) {
                        h(node, heightForNode);
                    }, this);
                }, this);

            }
        })(tree, pageHeight);

    },

    resizeView: function (container, clientHeight) {
        var $page = $('#page-content', container);
        //$page.height(clientHeight);
        var contentHeight = this.setOuterHeight($page, clientHeight);
        var that = this;

        this.resize($page.get(0), contentHeight);

        //$page.children().each(function (i, el) {
        //    if (el.style.display !== 'none') {
        //        //Обработка активной вкладки
        //        var $tab = $(el);
        //
        //        var $bar = $(".pl-active-bar:not(:hidden)", $tab);
        //
        //        var barHeight = $bar.length ? $bar.outerHeight(true) : 0;
        //        //var barHeight = $(".pl-active-bar", $tab).outerHeight(true);
        //        $tab.children().each(function (i, el) {
        //            if (false === el.classList.contains('pl-active-bar') && el.style.display !== 'none') {
        //                var pageHeight = contentHeight - barHeight;
        //                that.resize(el, pageHeight);
        //            }
        //        });
        //    }
        //});
    },

    resizeDialog: function () {
        var manager = this;
        $(this.getModalSelector()).each(function (i, el) {
            manager._resizeDialog($(el));
            manager.resetDialogHeight($(el));
        });
    },

    resetDialogHeight: function($modal){
        var space = 10;

        if($modal.children()) {
            var $container = $modal.children();

            var $header = $('.modal-header', $container);
            var $body = $('.modal-body', $container);

            var $el = $(this.getSelector(), $modal);

            $el.parentsUntil('.modal').attr('style', 'height: auto');

            $modal.children('.modal:not(.messagebox)').height($body.outerHeight(true) + $header.outerHeight(true));

        }

        //var $header = $('.modal-header', $container);
        //var $body = $('.modal-body', $container);

        //var headerHeight = $header.outerHeight(true);
        //
        //$container.css('margin-top', 0);
        //
        //var el = $(this.getSelector(), $modal);
        //if (el.length === 0) {
        //    //Если диалог не содержит элементы которые должны растягиваться по вертикали на 100%
        //    //Выравниваем по вертикали в центр
        //    $container.css('top', (this.windowHeight - headerHeight - $body.outerHeight(true)) / 2);
        //    return;
        //}
        //
        //$body.css('min-height', '0');
        //var containerHeight = this.setOuterHeight($modal, 'auto');
        //
        ////Высота для содержимого окна диалога
        //var clientHeight = this.setOuterHeight($container, containerHeight) - $header.outerHeight();
        //
        //this.resize($body[0], clientHeight);
        //$container.css('top', (this.windowHeight - headerHeight - clientHeight) / 2);
    },

    _resizeDialog: function ($modal) {
        var space = 10;//Высота отступа от вертикальных границ диалога до границ экрана

        var $container = $modal.children();

        $container.css('margin-top', 0);
        //var marginTop = parseInt($container.css('margin-top'), 10);

        var $header = $('.modal-header', $container);
        var $body = $('.modal-body', $container);

        var headerHeight = $header.outerHeight(true);
        $body.css('max-height', this.windowHeight - headerHeight);

        $container.css('margin-top', 0);

        var el = $(this.getSelector(), $modal);
        if (el.length === 0) {
            //Если диалог не содержит элементы которые должны растягиваться по вертикали на 100%
            //Выравниваем по вертикали в центр
            $container.css('top', (this.windowHeight - headerHeight - $body.outerHeight(true)) / 2);
            return;
        }

        $body.css('min-height', (this.windowHeight - $header.outerHeight(true) - space * 2) / 2);
        var containerHeight = this.setOuterHeight($modal, this.windowHeight - space * 2);

        //Высота для содержимого окна диалога
        var clientHeight = this.setOuterHeight($container, containerHeight) - $header.outerHeight();

        this.resize($body[0], clientHeight);
        $container.css('top', (this.windowHeight - headerHeight - clientHeight) / 2);
    },

    init: function (container) {
        container = container || document;
        this.windowHeight = $(window).height();
        this.onChangeLayout(container);
        if (this.exchange === null) {
            this.exchange = window.InfinniUI.global.messageBus;
            this.exchange.subscribe('OnChangeLayout', _.debounce(this.onChangeLayout.bind(this), 42));
        }


        var exchange = messageBus.getExchange('modal-dialog');
        exchange.subscribe(messageTypes.onLoading, function () {
            this.resizeDialog();
        }.bind(this));
    },

    onChangeLayout: function (container) {
        if (_.isEmpty(container)) {
            container = document;
        }

        var clientHeight = this.windowHeight
            - $("#page-top:not(:hidden)", container).outerHeight()
            - $("#page-bottom:not(:hidden)", container).outerHeight()
            - $("#menu-area:not(:hidden)", container).outerHeight();
        this.resizeView(container, clientHeight);
        this.resizeDialog();
    }
};
