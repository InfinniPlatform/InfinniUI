function LinkView(parentView, viewFactory) {
    this.openMode = 'Page';
    this.parentView = parentView;
    this.viewFactory = viewFactory;
}

LinkView.prototype.setOpenMode = function (mode) {
    if (_.isEmpty(mode)) return;
    this.openMode = mode;
};

LinkView.prototype.getOpenMode = function () {
    return this.openMode;
};

LinkView.prototype.createView = function (resultCallback) {
    var openMode = this.openMode;
    var parentView = this.parentView;

    this.viewFactory(function (view) {
        var applicationId = guid(),
            viewId = guid(),
            exchange,
            $view;

        //view.onLoading(function () {
        //    exchange = messageBus.getExchange('modal-dialog');
        //    /** @TODO В параметрах события передавать диалог **/
        //    exchange.send(messageTypes.onLoaded, {});
        //    view.getExchange().send(messageTypes.onLoaded, {});
        //});

        view.onOpening(function ($viewElement) {
            $view = $viewElement;

            switch (openMode) {
                case 'Inline':
                    view.getExchange().send(messageTypes.onLoading, {});
                    break;
                case 'Application':
                case 'Page':
                    openInContainer(openMode);
                    break;
                case 'Dialog':
                    exchange = messageBus.getExchange('modal-dialog');

                    var $modal = $('<div class="modal container" id="full-width" tabindex="-1">' +
                        '   <div class="modal-header">' +
                        '       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                        '       <h3></h3>' +
                        '   </div>' +
                        '   <div class="modal-body"></div>' +
                        '</div>')
                        .appendTo($('body'));

                    $view.find('.pl-stack-panel-i').css('height', 'auto');
                    var $container = $modal.find('.modal-body');

                    $container.bind("append", function() {
                        $modal.modal({
                            show: true,
                            backdrop: 'static',
                            modalOverflow: true
                        });
                    });
                    loadAppend($container, $view);

                    var preventClosingViewHandler = function(e){

                        /** Плагина DatePicker генерируют события hide в DOM!! **/
                        var $target = $(e.target);
                        if ($target.hasClass('date') || $target.hasClass('datetime')) {
                            return;
                        }

                        e.preventDefault();
                        e.stopImmediatePropagation();

                        view.close();
                        return false;
                    };

                    $modal.on('hide.bs.modal', preventClosingViewHandler);

                    $modal.on('hidden', function (obj) {
                        obj.target.remove();
                        $("#select2-drop-mask").click();
                    });

                    view.onClosed(function () {
                        $modal.off('hide.bs.modal', preventClosingViewHandler);
                        $modal.modal('hide');
                    });

                    $modal.find('h3').html(view.getText());
                    view.onTextChange(function(){
                        $modal.find('h3').html(view.getText());
                    });

                    /** @TODO В параметрах события передавать диалог **/
                    //exchange.send(messageTypes.onLoaded, {});

                    //Последним обработчиком в очередь добавляется метод, генерирующий событие View.onLoad
                    //view.getExchange().subscribe(messageTypes.onLoaded, view.loaded);
                    view.getExchange().send(messageTypes.onLoading, {});

                    exchange.subscribe(messageTypes.onViewClosed, function (messageBody) {
                        if(messageBody.appId == applicationId && messageBody.viewId == viewId) {
                            //$modal.modal('hide');
                        }
                    });

                    break;
            }

            function loadAppend($wrap, $content){
                $wrap.append($content).trigger("append");
            }

            function openInContainer(openMode) {
                var $appContainer;
                if (typeof parentView !== 'undefined' && parentView !== null) {
                    var appView = parentView.getApplicationView();
                    if (typeof appView !== 'undefined' && appView !== null) {
                        $appContainer = appView.getContainer();
                    }
                }

                $appContainer = $appContainer || $('#page-content');

                function getApplicationContainer(appId) {
                    return $('<div>')
                        .addClass('app-area')
                        .attr('data-app-id', appId)
                        .appendTo($appContainer);
                }

                function getViewContainer() {
                    var $find = $('[data-app-id]:visible', $appContainer);
                    applicationId = $find.data('app-id');
                    return $find;
                }

                var $container = openMode == 'Application' ? getApplicationContainer(applicationId) : getViewContainer();

                exchange = messageBus.getExchange(openMode == 'Application' ? 'global' : applicationId);

                $viewElement.attr('data-view-id', viewId).appendTo($container);

                //Последним обработчиком в очередь добавляется метод, генерирующий событие View.onLoad
                //view.getExchange().subscribe(messageTypes.onLoaded, view.loaded);

                view.getExchange().send(messageTypes.onLoading, {});

                view.onClosed(function () {
                    if (openMode === 'Application') {
                        $container.remove();
                    }
                });

                exchange.send(messageTypes.onViewOpened, { view: view, appId: applicationId, viewId: viewId, container: $container, openMode: openMode });
                (function (view, viewId, $container, openMode) {
                    exchange.subscribe(messageTypes.onViewClosing, function (message) {
                        if (message.viewId === viewId) {
                            view.close();
                        }
                    });
                })(view, viewId, $container, openMode);

            }
        });

        view.onClosed(function () {
            $view.remove();
            exchange.send(messageTypes.onViewClosed, { view: view, appId: applicationId, viewId: viewId });
            messageBus.getExchange('global')
                .send(messageTypes.onViewClosed, { view: view, appId: applicationId, viewId: viewId });
        });

        resultCallback(view);
    });
};
