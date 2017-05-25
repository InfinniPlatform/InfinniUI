InfinniUI.AutoHeightService = {
    windowHeight: 0,
    clientHeight: 0,
    exchange: null,
    times: [],

    setOuterHeight: function( $el, height, fix ) {
        var delta = 0;
        [ 'border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom' ]
            .forEach( function( name ) {
                delta += parseInt( $el.css( name ) );
            } );
        var contentHeight = height - delta;
        if( fix ) {
            contentHeight += fix;
        }

        $el.height( contentHeight );

        return contentHeight;
    },

    getModalSelector: function() {
        return '.modal-scrollable';
    },

    getStretchSelector: function() {
        return '.pl-scrollpanel:not(.pl-vertical-scroll-hidden):not(:hidden)';
    },

    buildTree: function( items, parentEl, $parentEl, elements, list ) {
        var manager = this;
        items = _.where( list, { parent: parentEl } );

        return {
            isElement: _.indexOf( elements, parentEl ) !== -1,
            element: parentEl,
            $element: $parentEl,
            child: _.map( items, function( item ) {
                return manager.buildTree( items, item.element, item.$element, elements, list );
            } )
        };
    },

    formTree: function( elements, el, $el ) {
        var $parent;
        var list = [];
        var $element;
        var element;

        //Строим дерево элементов: от концевых элементов поднимается к корневому элементу
        for( var i = 0, ln = elements.length; i < ln; i = i + 1 ) {
            element = elements[ i ];
            $element = $( element );
            do {
                $parent = $element.parent();

                var a = _.findWhere( list, { element: element } );
                if( typeof a !== 'undefined' ) {
                    //Элемент уже занесен в список
                    break;
                }
                list.push( {
                    element: element,
                    $element: $element,
                    parent: $parent.get( 0 ),
                    $parent: $parent
                } );

                $element = $parent;
                element = $parent.get( 0 );
            } while( element !== el );
        }

        return this.buildTree( list, el, $el, elements, list );
    },

    setHeight: function( node, height ) {
        var originalHeight = node.$element.attr( 'data-height-original' );
        if( originalHeight === '' ) {
            node.$element.attr( 'data-height-original', node.element.style.height );
        }
        return this.setOuterHeight( node.$element, height );
    },

    /**
     * Если внутри child один элемент:
     *   - устанавливаем высоту в 100% (под 100% здесь и далее понимается height)
     * Если внутри child несколько элементов
     *   - offsetTop совпадают - устанавливаем высоту в 100%
     *   - offsetTop не совпадают - устанавливаем высоту в (100% / child.length)
     */
    defineWay: function( node, height ) {
        var nodeHeight = this.setHeight( node, height ),
            manager = this;

        if( node.$element.hasClass( 'pl-scroll-panel' ) || node.$element.hasClass( 'modal-scrollable' ) ) {
            //Т.к. скроллпанель бесконечная по высоте, контролы внутри нее по высоте не растягиваем
            return;
        } else if( node.$element.hasClass( 'tab-content' ) ) {
            _.each( node.child, function( node ) {
                manager.defineWay( node, nodeHeight );
            } );
        } else if( node.child.length > 0 ) {
            this.goThroughTree( node, nodeHeight );
        }
    },

    goThroughTree: function( node, height ) {
        var manager = this;
        if( node.$element.parentsUntil( '.modal' ).length ) {
            node.$element.attr( 'data-height-original', node.element.style.height );
        }

        var children = node.$element
            .children( ':not(:hidden):not(.modal-scrollable):not(.modal-backdrop):not(.pl-dropdown-container)' );
        var grid = _.chain( children )
            .filter( function( el ) {
                var position = $( el ).css( 'position' );
                return [ 'absolute', 'fixed' ].indexOf( position ) === -1;
            } )
            .groupBy( 'offsetTop' )
            .value();
        var heights = [];
        var row;

        _.each( grid, function( row, i ) {
            var nodes = [];
            _.each( row, function( e ) {
                var n = _.find( node.child, function( c ) {
                    return c.element === e;
                } );
                if( n ) nodes.push( n );
            } );

            heights.push( nodes.length ? 0 : _.reduce( row, function( height, e ) {
                return Math.max( height, $( e ).outerHeight( true ) );
            }, 0 ) );

            grid[ i ] = nodes;
        } );

        var fixedHeight = heights.reduce( function( total, height ) {
                return total + height;
            }, 0 ),
            count = _.reduce( grid, function( count, row ) {
                return row.length ? count + 1 : count;
            }, 0 ),

            heightForNode = Math.floor( ( height - fixedHeight ) / count );

        _.each( grid, function( row ) {
            if( row.length === 0 ) return;
            _.each( row, function( node ) {
                manager.defineWay( node, heightForNode );
            }, this );
        } );
    },

    resize: function( el, pageHeight ) {
        var startTime = Date.now(); //start time
        var $el = $( el );
        var elements = $el.find( this.getStretchSelector() );

        if( elements.length === 0 ) {
            return;
        }

        var tree = this.formTree( elements, el, $el );
        this.defineWay( tree, pageHeight );
        var endTime = Date.now(); //end time
        this.timeWatcher( endTime - startTime );
    },

    timeWatcher: function( time ) {
        if( time >= 20 ) {
            this.times.push( time );
        }
    },

    getTimes: function() {
        return this.times;
    },

    resizeView: function( container, clientHeight ) {
        var $page = $( container || document );
        var contentHeight = this.setOuterHeight( $page, clientHeight );

        this.resize( $page.get( 0 ), contentHeight );
    },

    resizeDialog: function() {
        var $currentDialog = $( this.getModalSelector() ).last();

        this._resizeDialog( $currentDialog );
        this.resetDialogHeight( $currentDialog );
    },

    resetDialogHeight: function( $modal ) {
        var space = 10;

        if( $modal.children() ) {
            var $container = $modal.children();
            var $header = $( '.modal-header', $container );
            var $body = $( '.modal-body', $container );
            var $el = $( this.getStretchSelector(), $modal );

            $el.parentsUntil( '.modal' ).css( 'height', 'auto' );
            $container
                .css( 'top', ( this.windowHeight - $header.outerHeight( true ) - $body.outerHeight( true ) ) / 2 );

            $modal.children( '.modal:not(.messagebox)' )
                .height( $body.outerHeight( true ) + $header.outerHeight( true ) );
        }
    },

    _resizeDialog: function( $modal ) {
        var space = 10;//Высота отступа от вертикальных границ диалога до границ экрана
        var $container = $modal.children();

        $container.css( 'margin-top', 0 );

        var $header = $( '.modal-header', $container );
        var $body = $( '.modal-body', $container );
        var headerHeight = $header.outerHeight( true );
        $body.css( 'max-height', this.windowHeight - headerHeight );

        $container.css( 'margin-top', 0 );

        var el = $( this.getStretchSelector(), $modal );

        if( el.length !== 0 ) {
            // Если диалог содержит элементы которые должны растягиваться по вертикали на 100%
            // пересчитываем высоту

            var containerHeight = this.setOuterHeight( $modal, this.windowHeight - space * 2 );
            //Высота для содержимого окна диалога
            var clientHeight = this.setOuterHeight( $container, containerHeight ) - $header.outerHeight();

            this.resize( $body[ 0 ], clientHeight );
        }
    },

    recalculation: function( container ) {
        if( InfinniUI.config.enableAutoHeightService ) {
            $( container ).addClass( 'page-content-overflow-hidden' );
            this.windowHeight = $( window ).height();
            this.onChangeLayout( container );
            if( this.exchange === null ) {
                this.exchange = InfinniUI.global.messageBus;
                this.exchange
                    .subscribe( 'OnChangeLayout', _.debounce( this.onChangeLayout.bind( this, container ), 42 ) );
            }
        }
    },

    slidingRecalculation: function( container ) {
        var that = this;

        for( var i = 3; i >= 0; i-- ) {
            setTimeout( function() {
                that.recalculation( container );
            }, 500 + i * 300 );
        }
    },

    onChangeLayout: function( container ) {
        var clientHeight = this.windowHeight;
        this.resizeView( container, clientHeight );
        this.resizeDialog();
    }

};
