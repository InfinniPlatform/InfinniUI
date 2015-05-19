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

    resize: function (el, pageHeight) {
        var $el = $(el);
        var contentHeight = this.setOuterHeight($el, pageHeight);
        var elements = $el.find('.pl-data-grid, .pl-scroll-panel, .pl-document-viewer, .sidebar-menu.vertical, .pl-tab-panel, .pl-treeview');

        if (elements.length === 0) {
            return;
        }

        var tree = [];//

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
            var children = node.$element.children();
            var originalHeight;
            var fixedHeight = 0;

            var setHeight = function (node, height) {
                originalHeight = node.$element.attr('data-height-original');
                if (originalHeight === '') {
                    node.$element.attr('data-height-original', node.element.style.height);
                }
                return manager.setOuterHeight(node.$element, height);
            };

            var nodeHeight = setHeight(node, height);

            if (node.$element.hasClass('tab-content')) {
                _.each(node.child, function (node) {
                    h(node, nodeHeight);
                });
            } else  if (children.length === 1 && node.child.length === 1) {
                //В контейнере один элемент, который надо растянуть по высоте на максимум
                h(node.child[0], nodeHeight);
            } else if (node.child.length === 1) {
                //В контейнере страницы TabPanel
                //В контейнере один из элементов растянуть по высоте на максимум
                children.each(function (i, el) {
                    if (el !== node.child[0].element) {
                        fixedHeight = fixedHeight + $(el).outerHeight(true);
                    }
                });
                h(node.child[0], Math.max(nodeHeight - fixedHeight, 0));
            } else if (node.child.length > 0) {
                //В контейнере несколько элементов, которые надо растянуть по высоте на максимум
                var top = _.map(node.child, function (c) {
                    return c.element.offsetTop
                });

                /**
                 * Выделена проверка табов внутри TabPanel т.к. Невидимые табы скрыты и невозможно определить
                 * как визуально д.б. расположены контейнеры: вертикально или горизонтально
                 */
                if (_.uniq(top).length === 1) {
                    //Элементы размещены горизонтально
                    _.each(node.child, function (node) {
                        h(node, Math.max(nodeHeight - fixedHeight, 0));
                    });
                } else {
                    //Элементы размещены вертикально
                    children.each(function (i, el) {
                        var isChild = _.find(node.child, function (node) {
                            return node.element === el;
                        });
                        if (!isChild) {
                            fixedHeight = fixedHeight + $(el).outerHeight(true);
                        }
                    });

                    var nh = Math.ceil(Math.max(nodeHeight - fixedHeight, 0) / node.child.length);
                    _.each(node.child, function (node) {
                        h(node, nh);
                    });
                }

            }
        })(tree, pageHeight);

    },

    resizeView: function (container, clientHeight) {
        var $page = $('#page-content', container);
        //$page.height(clientHeight);
        var contentHeight = this.setOuterHeight($page, clientHeight);
        var that = this;
        $page.children().each(function (i, el) {
            if (el.style.display !== 'none') {
                //Обработка активной вкладки
                var $tab = $(el);

                var barHeight = $(".pl-active-bar", $tab).outerHeight(true);
                $tab.children().each(function (i, el) {
                    if (false === el.classList.contains('pl-active-bar') && el.style.display !== 'none') {
                        var pageHeight = contentHeight - barHeight;
                        that.resize(el, pageHeight);
                    }
                });
            }
        });
    },

    resizeDialog: function () {
        var manager = this;
        $(".modal-scrollable").each(function (i, el) {
            manager._resizeDialog($(el));
        });
    },

    _resizeDialog: function ($modal) {
        //var $modal = $(".modal-scrollable");

        var $container = $modal.children();

        $container.css('margin-top', 0);
        var marginTop = parseInt($container.css('margin-top'), 10);

        var $header = $('.modal-header', $container);
        var $body = $('.modal-body', $container);

        $body.css('max-height', this.windowHeight - $header.outerHeight(true));

        if ($container.outerHeight() < this.windowHeight) {
            //Высота диалога не больше высоты окна
            return;
        }

        var containerHeight = this.setOuterHeight($modal, this.windowHeight);

        //Высота для содержимого окна диалога
        var clientHeight = this.setOuterHeight($container, containerHeight, marginTop) - $header.outerHeight();

        this.resize($body[0], clientHeight);

        $container.css('margin-top', 0);
    },

    init: function (container) {
        container = container || document;
        this.windowHeight = $(window).height();
        this.onChangeLayout(container);
        if (this.exchange === null) {
            this.exchange = messageBus.getExchange('global');
            this.exchange.subscribe('OnChangeLayout', function () {
                this.onChangeLayout();
            }.bind(this));
        }
    },

    onChangeLayout: function (container) {
        var clientHeight = this.windowHeight - $("#page-top", container).outerHeight() - $("#page-bottom", container).outerHeight();
        this.resizeView(container, clientHeight);
        this.resizeDialog();
    }
};
