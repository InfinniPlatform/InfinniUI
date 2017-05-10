var editMaskViewMixin = ( function( global ) {

    var MASK_ATTRIBUTE = '_mask';
    var LIBRARY_NAME = 'editMask';

    var DEFAULT_STRATEGY = 'default';

    var strategies = {
        default: new DefaultStrategy(),
        timestamp: new UnixTimestampStrategy(),
        iso8601: new ISO8601Strategy()
    };

    var editMaskLibraryInitialized = false;

    return {

        editMaskStrategies: {
            DateTimeEditMask: 'iso8601',
            TemplateEditMask: 'default',
            NumberEditMask: 'default'
        },

        events: {
            'input .pl-control': 'onInputEventHandler',
            'change .pl-control': 'onChangeEventHandler',
            'focusin .pl-control': 'onFocusinEventHandler',
            'focusout .pl-control': 'onFocusoutEventHandler'
        },

        initialize: function() {
            init();
        },

        initHandlersForProperties: function() {
            this.listenTo( this.model, 'change:editMode', this.onChangeEditModeHandler );
            this.listenTo( this.model, 'invalid', this.onInvalidValueHandler );
        },

        setEditMaskStrategy: function( strategyName ) {
            this.editMaskStrategy = strategies[ strategyName ];
        },

        getEditMaskStrategy: function() {
            var strategy = this.editMaskStrategy;

            if ( !strategy ) {
                strategy = strategies[ DEFAULT_STRATEGY ];
            }

            return strategy;
        },

        /**
         * @description Отображает статус проверки значения. Перекрыть для изменения способа уведомления об ошибке в значении
         * @param error
         */
        setValueValidationError: function( error ) {
            this.model.set( 'errorText', error );
        },

        getTimeZone: function(  ) {
            return this.model.get( 'timeZone' );
        },

        setEditMode: function( editMode ) {
            this.model.set( 'editMode', editMode );
        },

        onInvalidValueHandler: function( model, error/*, options*/ ) {
            this.setValueValidationError( error );
        },

        onFocusinEventHandler: function() {

            var el =  this.ui.control[ 0 ];
            var view = this;
            setTimeout( function(  ) {
                var pos = el.selectionStart;
                view.setEditMode( true );
                el.setSelectionRange( pos, pos );
            }, 4 );

        },

        onFocusoutEventHandler: function() {
            this.setEditMode( false );
        },

        onInputEventHandler: function() {
            this.updateModelValue();
        },

        onChangeEventHandler: function() {
            this.updateModelValue();
        },

        updateModelValue: function() {
            if ( this[ MASK_ATTRIBUTE ] ) {

            } else {
                var text = this.ui.control.val();

                this.model.set( {
                    value: text,
                    rawValue: text
                } );
            }

        },

        onChangeEditModeHandler: function( model, editMode ) {
            if ( editMode ) {
                //turn on edit-mask when it specified
                createEditMask.call( this );
            } else {
                //turn off edit-mask when it specified
                destroyEditMask.call( this );
                //update display text
                editorBaseViewMixin.updateValueState.call( this );
                this.ui.control.val( this.getDisplayValue() );
            }
        }

    };

    function init() {
        if ( editMaskLibraryInitialized ) {
            return;
        }
        editMaskLibraryInitialized = true;
        getEditMaskLibrary().Mask.api.init( { locale: InfinniUI.localized.name } );
    }

    function createEditMask(  ) {
        var metadata = this.model.get( 'editMask' );

        if ( !metadata ) {
            return;
        }

        var editMaskType = Object.keys( metadata ).pop();
        var config = metadata[ editMaskType ];
        var maskTemplate = normalizeMaskTemplate( config[ 'Mask' ] );
        var mask;

        var usedStrategy = this.editMaskStrategies[ editMaskType ];
        if ( typeof usedStrategy === 'undefined' || usedStrategy === null ) {
            console.log( 'Не задано преобразование значения маски ввода' );
            usedStrategy = DEFAULT_STRATEGY;
        }

        this.setEditMaskStrategy( usedStrategy );

        switch( editMaskType ) {
            case 'DateTimeEditMask':
                mask = initDateTimeEditMask.call( this, maskTemplate );
                break;
            case 'NumberEditMask':
                mask = initNumberEditMask.call( this, maskTemplate );
                break;
            case 'TemplateEditMask':
                mask = initTemplateEditMask.call( this, maskTemplate, config );
                break;
        }

        this[ MASK_ATTRIBUTE ] = mask;
    }

    function destroyEditMask() {
        if( this[ MASK_ATTRIBUTE ] ) {
            this[ MASK_ATTRIBUTE ].destroy();
        }
    }

    function initDateTimeEditMask( maskTemplate ) {
        var model = this.model;
        var mask = getEditMaskLibrary().Mask.dateTime( this.ui.control[ 0 ], maskTemplate );

        var offset = model.get( 'timeZone' );
        if ( typeof offset === 'undefined' || offset === null ) {
            offset = InfinniUI.DateUtils.getDefaultTimeZone();
        }

        mask.setTimezoneOffset( offset );

        var that = this;

        mask.setValue( this.getEditMaskStrategy().valueToMask( model.getValue() ) );

        mask.onChangeValue( function( event ) {
            var value = event.newValue;
            if ( value !== null && typeof value !== 'undefined' ) {
                model.set( 'value', that.getEditMaskStrategy().maskToValue( value ) );
                if ( model.isValid() ) {  //reset error
                    that.setValueValidationError( null );
                }
            } else {
                model.set( 'value', value );
            }
        } );

        return mask;
    }

    function initNumberEditMask( maskTemplate ) {
        var model = this.model;
        var mask = getEditMaskLibrary().Mask.number( this.ui.control[ 0 ], maskTemplate );
        mask.setValue( model.getValue() );
        mask.onChangeValue( function( event ) {
            model.set( 'value', event.newValue );
            if ( model.isValid() ) {  //reset error
                model.set( 'errorText', null );
            }
        } );

        return mask;
    }

    function initTemplateEditMask( maskTemplate, config ) {
        var model = this.model;
        var mask = getEditMaskLibrary().Mask.template( this.ui.control[ 0 ], maskTemplate );

        var maskSaveLiteral = config[ 'MaskSaveLiteral' ];
        if ( typeof maskSaveLiteral === 'boolean' ) {
            mask.setMaskSaveLiteral( maskSaveLiteral );
        }

        mask.setValue( model.getValue() );

        mask.onChangeValue( function( event ) {
            model.set( 'value', event.newValue );
        } );

        return mask;
    }

    function normalizeMaskTemplate( maskTemplate ) {
        var template = InfinniUI.localized.patternDateFormats[ maskTemplate ];


        if( typeof template !== 'undefined' ) {
            maskTemplate = template;
        }

        maskTemplate = maskTemplate.replace( /%([msd])/g, '$1' );

        return maskTemplate;
    }

    function DefaultStrategy(  ) {

        this.valueToMask = function( value ) {
            return value;
        };

        /**
         *
         * @param {number} maskValue milliseconds
         * @returns {number} unix timestamp
         */
        this.maskToValue = function( maskValue ) {
            return maskValue;
        };
    }

    function UnixTimestampStrategy() {

        /**
         *
         * @param {number} value unix timestamp
         * @returns {number} milleseconds
         */
        this.valueToMask = function( value ) {
            var maskValue = null;

            if ( value !== null && !isNaN( value ) && isFinite( value ) ) {
                maskValue = Math.round( value * 1000 );
            }

            return maskValue;
        };

        /**
         *
         * @param {number} maskValue milliseconds
         * @returns {number} unix timestamp
         */
        this.maskToValue = function( maskValue ) {
            var value = null;

            if ( maskValue !== null && !isNaN( maskValue ) && isFinite( maskValue ) ) {
                value = +( maskValue / 1000 ).toFixed( 3 );
            }

            return value;
        };
    }

    function ISO8601Strategy() {

        /**
         *
         * @param {string} value ISO 8601
         * @returns {number} milliseconds
         */
        this.valueToMask = function( value ) {
            var maskValue = null;
            if ( value !== null && typeof value !== 'undefined' ) {
                maskValue = new Date( value ).getTime();
            }
            return maskValue;
        };

        /**
         *
         * @param {number} maskValue milliseconds
         * @returns {string} ISO 8601
         */
        this.maskToValue = function( maskValue ) {
            var date = new Date( maskValue );
            return InfinniUI.DateUtils.toISO8601( date );
        };
    }

    function getEditMaskLibrary() {
        var editMask = global[ LIBRARY_NAME ];

        if ( !editMask ) {
            console.error( 'edit-mask library "' + LIBRARY_NAME + '" not loaded!' );
        }

        return editMask;
    }


} )( window );
