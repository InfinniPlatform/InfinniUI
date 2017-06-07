( function( window, document, $ ) {
    'use strict';
    var DATA_NAME_ATTRIBUTE = 'data-pl-name';
    var DATA_NAME_VIEW_ATTRIBUTE = 'data-pl-name-view';
    var NO_NAME = 'No name';
    var DATA_NAME_SELECTOR = '[' + DATA_NAME_ATTRIBUTE + ']:first';
    var DATA_NAME_VIEW_SELECTOR = '[' + DATA_NAME_VIEW_ATTRIBUTE + ']:first';
    var location = window.location;

    if( location.hash !== '#test' ) {
        return;
    }

    $( function() {

        patchBootstrapTooltip();
        var info = new InfoElement();

        $( document ).on( 'mouseover', function( event ) {
            info.setElement( event.target );
        } );

        function patchBootstrapTooltip() {
            $.fn.tooltip.Constructor.prototype.getTitle = function() {
                var $e = this.$element;
                var o = this.options;

                return o.title;
            };
        }
    } );

    /*************************************/

    function ClickManager() {
        this._unsubscribe = [];
    }

    /**
     *
     * @param element
     * @param handler
     * @returns {ClickManager}
     */
    ClickManager.prototype.append = function( element, handler ) {
        var EVENT_NAME = 'contextmenu';
        this.clear();

        if( typeof element === 'undefined' || element === null ) {
            return;
        }
        element.addEventListener( EVENT_NAME, handler, true );
        this._unsubscribe.push( function() {
            element.removeEventListener( EVENT_NAME, handler, true );
        } );
        return this;
    };

    /**
     *
     * @returns {ClickManager}
     */
    ClickManager.prototype.clear = function() {
        this._unsubscribe.forEach( function( fn ) {
            fn.call();
        } );
        return this;
    };

    /**
     *
     * @constructor
     */
    function InfoElement() {
        this.marker = new Marker();
        this.$currentControl = null;
        this.clickManager = new ClickManager();
    }

    /**
     *
     * @param el
     */
    InfoElement.prototype.setElement = function( el ) {
        var $el = $( el );
        var $control = getControl( $el );
        var name = getName( $control );
        var viewName = getViewName( $control );

        this.hideInfo();
        if( $control ) {
            this.showInfo( $control, viewName, _.isEmpty( name ) ? NO_NAME : name );
        }

        /**
         *
         * @param $el
         * @returns {*}
         */
        function getControl( $el ) {
            var $control;
            var name = $el.attr( DATA_NAME_ATTRIBUTE );

            if( typeof name !== 'undefined' ) {
                $control = $el;
            } else {
                $control = $el.parents( DATA_NAME_SELECTOR );
            }
            return $control;
        }

        /**
         *
         * @param $el
         */
        function getName( $el ) {
            if( $el.length ) {
                return $el.attr( DATA_NAME_ATTRIBUTE );
            }
        }

        /**
         *
         * @param $el
         */
        function getViewName( $el ) {
            var $e = $el.parents( DATA_NAME_VIEW_SELECTOR );

            if( $e.length ) {
                return $e.attr( DATA_NAME_VIEW_ATTRIBUTE );
            }
        }
    };

    /**
     *
     * @param viewName
     * @param name
     */
    InfoElement.prototype.copyInfo = function( viewName, name ) {
        if( viewName || name ) {
            window.prompt( 'Copy to clipboard: Ctrl+C', formatInfo( viewName, name ) );
        }
    };

    /**
     *
     * @param $control
     * @param viewName
     * @param name
     */
    InfoElement.prototype.showInfo = function( $control, viewName, name ) {
        if( this.$currentControl && this.$currentControl[ 0 ] !== $control[ 0 ] ) {
            this.marker.reset( this.$currentControl );
            this.clickManager.clear();
        }
        this.marker.highlight( $control );
        this.$currentControl = $control;
        this.clickManager.append( $control[ 0 ], this.copyInfo.bind( this, viewName, name ) );

        $control
            .tooltip( {
                title: formatInfo( viewName, name ),
                placement: 'auto'
            } )
            .tooltip( 'show' );
    };

    /**
     *
     */
    InfoElement.prototype.hideInfo = function() {
        this.clickManager.clear();
        if( this.$currentControl ) {
            this.marker
                .reset( this.$currentControl );
            this.$currentControl.tooltip( 'destroy' );
        }
    };


    /********************************************/

    /**
     *
     * @constructor
     */
    function Marker() {
        this.DATA_NAME = 'data-pl-original-style';

        this.css = {
            'box-shadow': 'inset 0 0 1em #ff0000'
        };
    }

    /**
     *
     * @param $el
     * @returns {Marker}
     */
    Marker.prototype.highlight = function( $el ) {
        var data;

        if( $el ) {
            data = $el.data( this.DATA_NAME );
            if( !data ) {
                data = Object.create( null );
                for( var i in this.css ) {
                    data[ i ] = $el.css( i );
                }
                $el.data( this.DATA_NAME, data );
            }
            $el.css( this.css );
        }
        return this;
    };

    /**
     *
     * @param $el
     * @returns {Marker}
     */
    Marker.prototype.reset = function( $el ) {
        var data;
        if( $el ) {
            data = $el.data( this.DATA_NAME );
            $el.data( this.DATA_NAME, null );
            if( data ) {
                $el.css( data );
            }
        }
        return this;
    };

    /********************/

    /**
     *
     * @param viewName
     * @param name
     * @returns {*|string}
     */
    function formatInfo( viewName, name ) {
        var info = viewName ? [ viewName ] : [];
        info.push( name );

        return info.join( ':' );
    }

} )( window, document, jQuery );

