/**
 * @class
 * @augments ControlView
 */
var TabPanelView = ContainerView.extend( /** @lends TabPanelView.prototype */ {

    className: 'pl-tabpanel',

    template: {
        top: InfinniUI.Template[ 'controls/tabPanel/template/tabPanel.top.tpl.html' ],
        right: InfinniUI.Template[ 'controls/tabPanel/template/tabPanel.right.tpl.html' ],
        bottom: InfinniUI.Template[ 'controls/tabPanel/template/tabPanel.bottom.tpl.html' ],
        left: InfinniUI.Template[ 'controls/tabPanel/template/tabPanel.left.tpl.html' ],
        none: InfinniUI.Template[ 'controls/tabPanel/template/tabPanel.none.tpl.html' ]
    },

    UI: {
        header: '.pl-tabpanel-header',
        content: '.pl-tabpanel-content'
    },

    initHandlersForProperties: function() {
        ContainerView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:headerLocation', this.onChangeHeaderLocation );
        this.listenTo( this.model, 'change:headerOrientation', this.updateHeaderOrientation );
        this.listenTo( this.model, 'change:selectedItem', this.updateSelectedItem );
    },

    render: function() {
        this.prerenderingActions();

        this.renderTemplate( this.getTemplate() );

        this.renderItemsContents();
        this.initSelectedItem();

        this.postrenderingActions();

        this.trigger( 'render' );
        this.updateProperties();
        //devblockstart
        window.InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    /**
     * @protected
     */
    renderItemsContents: function() {
        var items = this.model.get( 'items' );

        this.removeChildElements();
        this.ui.content.empty();
        this.model.set( 'selectedItemIndex', -1 );

        var data = [];
        items.forEach( function( item, index ) {
            data.push( {
                tabElement: this.renderTabContent( item, index ),
                item: item,
                index: index
            } );
        }, this );

        this.renderTabHeaders( data );
    },

    /**
     * @protected
     * @param {Array.<Object>} data
     */
    renderTabHeaders: function( data ) {
        var header;
        var model = this.model;
        var items = model.get( 'items' );
        var selectedItem = model.get( 'selectedItem' );

        if( Array.isArray( this.tabHeaders ) ) {
            while( header = this.tabHeaders.pop() ) {
                this.stopListening( header );
                header.remove();
            }
        }

        this.tabHeaders = data.map( function( data ) {
            var selected = items.indexOf( data.item ) !== -1;
            var header = this.renderTabHeader( data.tabElement, selected );

            this.listenTo( header, 'selected', function() {
                var isEnabled = data.tabElement.getEnabled();
                if( isEnabled ) {
                    model.set( 'selectedItem', data.tabElement );
                }
            } );

            this.listenTo( header, 'close', function() {
                var isEnabled = data.tabElement.getEnabled();
                if( isEnabled ) {
                    data.tabElement.close();
                }
            } );

            return header;
        }, this );

    },

    /**
     *
     * @param {TabPage} tabPageElement
     * @param {boolean} selected
     * @returns {TabHeaderView}
     */
    renderTabHeader: function( tabPageElement, selected ) {
        var that = this;
        var header = new TabHeaderView( {
            text: tabPageElement.getText(),
            canClose: tabPageElement.getCanClose(),
            enabled: tabPageElement.getEnabled(),
            selected: selected
        } );

        tabPageElement.onPropertyChanged( 'text', function() {
            header.setText( tabPageElement.getText() );
        } );

        tabPageElement.onPropertyChanged( 'canClose', function() {
            header.setCanClose( tabPageElement.getCanClose() );
        } );

        tabPageElement.onPropertyChanged( 'enabled', function() {
            header.setEnabled( tabPageElement.getEnabled() );

            var selectedTabPage = that.model.get( 'selectedItem' );
            if( tabPageElement == selectedTabPage ) { // если видимость поменяли у выбранного элемента
                that.resetDefaultSelectedItem();
            }
        } );

        this.ui.header.append( header.render().$el );
        return header;
    },

    renderTabContent: function( item, index ) {
        var itemTemplate = this.model.get( 'itemTemplate' );
        var element = itemTemplate( undefined, { item: item, index: index } );

        this.addChildElement( element );
        this.ui.content.append( element.render() );

        return element;
    },

    /**
     * @protected
     * @returns {Function}
     */
    getTemplate: function() {
        var template;
        var headerLocation = this.model.get( 'headerLocation' );

        switch( headerLocation ) {
            case InfinniUI.TabHeaderLocation.top:
                template = this.template.top;
                break;
            case InfinniUI.TabHeaderLocation.right:
                template = this.template.right;
                break;
            case InfinniUI.TabHeaderLocation.bottom:
                template = this.template.bottom;
                break;
            case InfinniUI.TabHeaderLocation.left:
                template = this.template.left;
                break;
            case InfinniUI.TabHeaderLocation.none:
            default:
                template = this.template.none;
                break;
        }

        return template;
    },

    /**
     * @protected
     */
    updateProperties: function() {
        ContainerView.prototype.updateProperties.call( this );
        this.updateHeaderOrientation();
        this.updateSelectedItem();
    },

    /**
     * @protected
     */
    onChangeHeaderLocation: function() {
        //При изменении положения вкладок меняется весь шаблон
        this.rerender();
    },

    /**
     * @protected
     */
    updateHeaderOrientation: function() {
        //@TODO Реализовать TabPanel.updateHeaderOrientation()
    },


    /**
     * @protected
     * @description Проверяет чтобы одна из вкладок была активна
     */
    initSelectedItem: function() {
        var model = this.model;
        var tabPages = this.childElements;
        var selectedItem = model.get( 'selectedItem' );

        if( !Array.isArray( tabPages ) || tabPages.length == 0 ) {
            model.set( 'selectedItem', null );
        } else {
            if( tabPages.indexOf( selectedItem ) === -1 ) {
                var firstEnabledPageIndex = this._getFirstEnabledPageIndex();
                if( firstEnabledPageIndex != -1 ) {
                    model.set( 'selectedItem', tabPages[ firstEnabledPageIndex ] );
                }
            }
        }
    },

    resetDefaultSelectedItem: function() {
        this.model.set( 'selectedItem', null );
        this.initSelectedItem();
    },

    _getFirstEnabledPageIndex: function() {
        var tabPages = this.childElements;

        for( var i = 0; i < tabPages.length; ++i ) {
            if( tabPages[ i ].getEnabled() ) {
                return i;
            }
        }

        return -1;
    },

    /**
     * @protected
     */
    updateSelectedItem: function() {
        if( !this.wasRendered ) {
            return;
        }

        var tabPages = this.childElements;
        var tabHeaders = this.tabHeaders;
        var selectedItem = this.model.get( 'selectedItem' );
        var selectedIndex = tabPages.indexOf( selectedItem );

        //TabPage
        if( Array.isArray( tabPages ) ) {
            tabPages.forEach( function( tabPage ) {
                tabPage.setSelected( false );
            } );

            if( selectedIndex !== -1 ) {
                tabPages[ selectedIndex ].setSelected( true );
            }
        }

        //TabHeader
        if( Array.isArray( tabHeaders ) ) {
            tabHeaders.forEach( function( tabHeader ) {
                tabHeader.setSelected( false );
            } );
            if( selectedIndex !== -1 ) {
                tabHeaders[ selectedIndex ].setSelected( true );
            }
        }
    },

    /**
     * @protected
     */
    updateGrouping: function() {

    }

} );
