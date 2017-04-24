function DateTimeEditMask() {
    this.mask = null;
    this.format = null;
}

InfinniUI.DateTimeEditMask = DateTimeEditMask;

_.extend( DateTimeEditMask.prototype, editMaskMixin );

_.extend( DateTimeEditMask.prototype, {

    /**
     * Переход к следующему разделу маски
     * @param position
     * @returns {Integer}
     */
    getNextItemMask: function( position ) {
        var data = this.getItemTemplate( position );
        var newPosition;

        if( data !== null ) {
            newPosition = this.moveToNextChar( data.left + data.width );
            if( newPosition > data.left + data.width ) {
                position = newPosition;
            }

        } else {
            position = this.moveToNextChar( position );
        }
        return position;
    },

    /**
     * Установить следущее из вожможных значений в элементе маски ввода
     * @param position
     * @returns {*}
     */
    setNextValue: function( position ) {
        var data = this.getItemTemplate( position );
        var item, value, mask;

        if( data !== null ) {
            item = data.item;
            mask = this.masks[ item.mask ];
            if( typeof mask.next !== 'undefined' ) {
                value = mask.next( item.text );
                if( typeof mask.format !== 'undefined' ) {
                    value = mask.format( value );
                }
                item.text = '' + value;

                position = Math.min( data.left + item.text.length, position );
            }
        } else {
            position = this.moveToNextChar( position );
        }
        return position;
    },

    /**
     * Установить предыдущее из вожможных значений в элементе маски ввода
     * @param position
     * @returns {*}
     */
    setPrevValue: function( position ) {
        var data = this.getItemTemplate( position );
        var item, value, mask;

        if( data !== null ) {
            item = data.item;
            mask = this.masks[ item.mask ];
            if( typeof mask.prev !== 'undefined' ) {
                value = mask.prev( item.text );
                if( typeof mask.format !== 'undefined' ) {
                    value = mask.format( value );
                }
                item.text = '' + value;
                position = Math.min( data.left + item.text.length, position );
            }
        } else {
            position = this.moveToNextChar( position );
        }
        return position;
    },

    /**
     * @param {Number} position
     * @param {Number} selectionLength
     * @param {String} char
     * @returns {Number}
     */
    deleteSelectedText: function( position, selectionLength, char ) {
        var data;
        var from;
        var text;
        var mask;
        var prevPos, pos = position, len = selectionLength;
        char = char || '';
        var newPos = position + char.length - 1;

        while( data = this.getItemTemplate( pos ) ) {
            prevPos = pos;
            from = pos - data.left;
            text = data.item.text;
            mask = this.masks[ data.item.mask ];

            text = text.substring( 0, from ) + char + text.substring( from + len );
            if( !text.length || mask.match( text ) ) {
                data.item.text = text;
            }

            pos = this.getNextItemMask( pos );
            if( prevPos === pos ) {
                break;
            }
            len = selectionLength - ( pos - position );
            char = '';
        }

        return this.moveToNextChar( newPos );
    },

    /**
     * Удалить символ слева от курсора
     * @param position
     * @param {Number|undefined} selectionLength
     */
    deleteCharLeft: function( position, selectionLength ) {
        var data = this.getItemTemplate( position );
        var item, text;

        if( selectionLength ) {
            position = this.deleteSelectedText( position, selectionLength );
        } else {
            if( data !== null ) {
                if( data.index > 0 ) {
                    item = data.item;
                    position--;
                    text = item.text.slice( 0, data.index - 1 ) + item.text.slice( data.index );
                    item.text = text;
                } else {
                    data = this.getItemTemplate( data.left - 1 );
                    position = data.left + data.item.text.length;
                }
            } else {
                position = this.moveToNextChar( position );
            }
        }
        return position;
    },

    /**
     * Удалить символ справа от курсора
     * @param position
     * @param {Number|undefined} selectionLength
     */
    deleteCharRight: function( position, selectionLength ) {
        var data = this.getItemTemplate( position );
        var item, text;

        if( selectionLength ) {
            position = this.deleteSelectedText( position, selectionLength );
        } else {
            if( data !== null ) {
                item = data.item;
                text = item.text.slice( 0, data.index ) + item.text.slice( data.index + 1 );
                item.text = text;

                if( item.text.length == 0 ) {
                    position = this.getNextItemMask( position );
                }
            } else {
                position = this.moveToNextChar( position );
            }
        }
        return position;
    },

    /**
     * Вставка в маску
     * @param clipboardText
     * @param position
     */
    pasteStringToMask: function( clipboardText, position ) {
        clipboardText = clipboardText.replace( /\D/gi, '' );

        var arraySymbols = clipboardText.split( '' );
        var firstItem = this.getItemTemplate( position );
        var firstIndexItem = this.template.indexOf( firstItem.item ), lastIndexItem = 0;
        var lastItem = getLastTemplate( this.template );

        if( lastItem ) {
            lastIndexItem = this.template.indexOf( lastItem );
        } else {
            lastIndexItem = firstIndexItem;
        }

        var tLength = 0, maxLength = 0;

        for( var i = firstIndexItem; i < lastIndexItem + 1; i++ ) {
            if( typeof this.template[ i ] == 'object' ) {
                if( i == firstIndexItem ) {
                    maxLength = maxTemplateLength( this.template[ i ] );
                    tLength = maxLength - ( position - this.template[ i ].position );

                    var first = this.template[ i ].text.slice( 0, position - this.template[ i ].position );
                    var zero = '';

                    if( !first ) {
                        for( var d = 0; d < position - this.template[ i ].position; d++ ) {
                            zero = zero + '0';
                        }
                    }

                    this.template[ i ].text = zero + first + clipboardText.slice( 0, tLength );
                    arraySymbols.splice( 0, tLength );
                } else {
                    if( i != lastIndexItem ) {
                        maxLength = maxTemplateLength( this.template[ i ] );

                        this.template[ i ].text = arraySymbols.join( '' ).slice( 0, maxLength );
                        arraySymbols.splice( 0, maxLength );
                    } else {
                        maxLength = maxTemplateLength( this.template[ i ] );

                        if( arraySymbols.length > maxLength ) arraySymbols.splice( maxLength, arraySymbols.length );
                        this.template[ i ].text = arraySymbols.join( '' ) + this.template[ i ].text.slice( arraySymbols.length, maxLength );
                    }
                }
            }
        }

        function maxTemplateLength( template ) {
            return Math.max( template.mask.length, template.text.length );
        }

        function getLastTemplate( template ) {
            var dotLength = 0;
            var arr = [];

            for( var i = firstIndexItem; i < template.length; i++ ) {
                if( typeof template[ i ] == 'object' ) {
                    if( clipboardText.length > template[ i ].position - dotLength - position ) {
                        arr.push( template[ i ] );
                    }
                } else {
                    dotLength = dotLength + template[ i ].length;
                }
            }
            return arr[ arr.length - 1 ];
        }
    },

    /**
     * @private
     * @description Получить элемент шаблона в заданной позиции
     * @param {Integer} position
     * @returns {*}
     */
    getItemTemplate: function( position ) {
        var template = this.template;
        var item;
        var left = 0;
        var width;
        var index;
        var result = null;

        if( typeof  template === 'undefined' ) {
            this.reset();
            template = this.template;
        }

        if( !Array.isArray( template ) ) {
            return null;
        }
        for( var i = 0, ln = template.length; i < ln; i = i + 1 ) {
            item = template[ i ];
            if( typeof item === 'string' ) {
                left += item.length;
            } else {
                width = Math.max( this.masks[ item.mask ].width, item.text.length );
                if( position < left || position >= left && position <= left + width ) {
                    index = position - left;
                    result = {
                        item: item,
                        left: left,
                        width: width,
                        index: position - left
                    };
                    break;
                }
                left += width;
            }
        }

        return result;
    },

    setCharAt: function( char, position ) {
        var data = this.getItemTemplate( position );
        var text;
        var item;
        var mask;
        var index;

        if( data !== null ) {
            item = data.item;
            index = position - data.left;   //Позиция внутри текущего шаблона ввода маски

            if( index > item.text.length ) { //Если превышение по правой границе - в конец
                position = data.left + item.text.length;
                index = item.text.length;
            } else if( index < 0 ) { //Если превышение по левой границе - в начало шаблона
                position = data.left;
                index = 0;
            }

            mask = this.masks[ item.mask ];
            text = item.text.slice( 0, index ) + char + item.text.slice( index );

            if( mask.match( text ) ) {
                item.text = text;
                position = this.moveToNextChar( position );
                if( mask.filled( text ) ) {
                    position = this.getNextItemMask( position );
                }
            } else {    //Нажатая кнопка не подходит под маску
                var nextItem = this.template.indexOf( data.item ) + 1;
                if( this.template[ nextItem ] === char ) {
                    position = this.getNextItemMask( position );
                }
            }

        } else {
            position = this.moveToNextChar( position );
        }

        return position;
    },

    /**
     * Получить предыдущую позицию, в которой возможен ввод
     */
    moveToPrevChar: function( position ) {
        position = position - 1;
        var template = this.template;
        var item;
        var mask;
        var width;
        var left = 0;
        var last = left;

        for( var i = 0, ln = template.length; i < ln; i = i + 1 ) {
            item = template[ i ];
            if( typeof item === 'string' ) { //Простой символ
                left += item.length;
                if( typeof last === 'undefined' ) {
                    last = left;
                }
            } else {    //элемент маски ввода
                mask = item.mask;
                width = Math.max( this.masks[ mask ].width, item.text.length );
                if( position >= left && position < left + width ) {
                    break;
                } else if( position < left ) {
                    position = last;
                    break;
                }
                left += width;
                last = left;
            }
        }

        if( i === ln && position > last ) {
            position = last;
        }

        return position;
    },

    /**
     * Получить следущую позицию, в которой возможен ввод
     */
    moveToNextChar: function( position ) {
        position = position + 1;
        var template = this.template;
        var item;
        var left = 0;
        var last;
        var mask;
        var width;

        for( var i = 0, ln = template.length; i < ln; i = i + 1 ) {
            item = template[ i ];
            if( typeof item === 'string' ) {  //Простой исмвол
                left += item.length;
            } else {    //Элемент маски ввода
                mask = item.mask;
                width = Math.max( this.masks[ mask ].width, item.text.length );
                if( position >= left && position <= left + width ) {
                    break;
                } else if( position < left ) {
                    //position = (typeof last !== 'undefined') ? last : left;
                    position = left;
                    break;
                }
                left += width;
                last = left;

            }
        }

        if( i === ln && position >= last ) { //Если вышли за границы маски
            position = last;
        }

        return position;
    },

    /**
     * Получить представление значения для MaskedEdit
     * @returns {string|*}
     */
    getText: function() {
        var template = this.template;
        var item;
        var result = [];
        var placeholder;

        if( !Array.isArray( template ) ) {
            return;
        }

        for( var i = 0, ln = template.length; i < ln; i = i + 1 ) {
            item = template[ i ];
            if( typeof item === 'string' ) {
                result.push( item );
            } else {
                placeholder = Array( this.masks[ item.mask ].width + 1 ).join( '_' );
                if( item.text.length < placeholder.length ) {
                    result.push( item.text + placeholder.slice( item.text.length ) );
                } else {
                    result.push( item.text );
                }
            }
        }
        return result.join( '' );
    },

    /**
     * @private
     * @description Построение объекта для форматирования значения
     * @param {Date} [date] Значение
     * @returns {Array}
     */
    buildTemplate: function( date ) {
        var mask = this.normalizeMask( this.mask );
        var i, ln;

        //Все доступные маски упорядочиваем по длине
        var masks = _.keys( this.masks );
        masks.sort( function( a, b ) {
            return b.length - a.length;
        } );

        //Ищем используемые в шаблоне маски
        var usedMasks = [];
        var maskLength;
        var position;

        for( i = 0, ln = masks.length; i < ln; i = i + 1 ) {
            position = mask.indexOf( masks[ i ] );
            if( position === -1 ) continue;
            //Вырезаем маску
            maskLength = masks[ i ].length;
            mask = [ mask.substring( 0, position ), Array( maskLength + 1 ).join( ' ' ), mask.substring( position + maskLength ) ].join( '' );
            usedMasks.push( {
                mask: masks[ i ],
                position: position
            } );
        }
        //Упорядочиваем использованные маски по позиции вхождения в шаблон
        usedMasks.sort( function( a, b ) {
            return a.position - b.position;
        } );

        var template = [];
        var lastPosition = 0;
        var usedMask;

        for( i = 0, ln = usedMasks.length; i < ln; i = i + 1 ) {
            usedMask = usedMasks[ i ];
            if( lastPosition < usedMask.position ) {
                template.push( mask.substring( lastPosition, usedMask.position ) );
            }
            lastPosition = usedMask.position + usedMask.mask.length;
            //usedMask.mask = this.normalizeMask(usedMask.mask);
            //usedMask.text = (date === null || typeof date === 'undefined') ? '' : this.format.format(date, undefined, usedMask.mask);
            usedMask.text = this.formatMask( date, usedMask.mask );
            template.push( usedMask );
        }

        if( lastPosition < mask.length ) {
            template.push( mask.substring( lastPosition ) );
        }

        return this.template = template;
    },

    /**
     * Вернуть введеный результат
     * @returns {*}
     */
    getValue: function() {
        var formatOptions = this.format.getOptions();
        var template = this.template;
        var item;
        var mask;
        var value = InfinniUI.DateUtils.changeTimezoneOffset( this.value, formatOptions.TimeZone );
        var done = true;

        if( !Array.isArray( template ) ) {
            return;
        }

        for( var i = 0; i < template.length; i = i + 1 ) {
            item = template[ i ];
            if( typeof item === 'string' ) continue;
            mask = this.masks[ item.mask ];
            if( typeof mask.apply !== 'undefined' ) {
                if( item.text === '' ) {
                    done = false;
                    break;
                }
                value = mask.apply( value, item.text );
            }
        }

        if( done && value instanceof Date ) {
            //value.setHours(0, 0, 0, 0);
            value = InfinniUI.DateUtils.restoreTimezoneOffset( value, formatOptions.TimeZone );
        }

        return done ? value : null;
    },

    /**
     * Вернуть результат в используемумом формате данных: строка в формате ISO8601
     * @returns {String}
     */
    getData: function() {
        var formatOptions = this.format.getOptions();

        return InfinniUI.DateUtils.toISO8601( this.getValue(), { timezoneOffset: formatOptions.TimeZone } );
    },

    /**
     * Установка начального значения
     * @param value
     */
    reset: function( value ) {
        this.value = null;
        var date = null;

        if( typeof value !== 'undefined' && value !== null && value !== '' ) {
            //Если переданное значение является датой - инициалищируем этим значением
            try {
                date = InfinniUI.DateUtils.createDate( value );
            } catch( e ) {
                date = null;
            }
            this.value = date;
        }

        this.template = this.buildTemplate( date );

        if( this.value === null ) {
            this.value = new Date( 0 );
        }
    },

    /**
     * @private
     * @description Переводим %x => x
     * @param mask
     */
    normalizeMask: function( mask ) {
        var localization = InfinniUI.localizations[ InfinniUI.config.lang ];

        if( typeof localization.patternDateFormats !== 'undefined' && typeof localization.patternDateFormats[ mask ] !== 'undefined' ) {
            mask = localization.patternDateFormats[ mask ];
        }

        return mask.replace( /%([yMdms])/g, '$1' );
    },

    /**
     * Форматирование значения для заданной группы маски ввода
     * @param {*} value
     * @param {String} mask Маска для фоматтера this.format
     * @returns {String}
     */
    formatMask: function( value, mask ) {
        mask = mask.replace( /^([yMdms])$/, '%$1' );
        return ( value === null || typeof value === 'undefined' ) ? '' : this.format.format( value, undefined, mask );
    },

    /**
     * Проверка что маска была полностью заполнена
     */
    getIsComplete: function() {
        var template = this.template;
        var item;
        var complete = true;
        var mask;

        for( var i = 0, ln = template.length; i < ln; i = i + 1 ) {
            item = template[ i ];
            if( typeof item === 'string' ) continue;
            mask = this.masks[ item.mask ];
            if( !mask.validator( item.text ) ) {
                complete = false;
                break;
            }
        }
        return complete;
    },

    masks: {
        'd': new DateTimeMaskPart( 'd' ),
        'dd': new DateTimeMaskPart( 'dd' ),
        'M': new DateTimeMaskPart( 'M' ),
        'MM': new DateTimeMaskPart( 'MM' ),
        'y': new DateTimeMaskPart( 'y' ),
        'yy': new DateTimeMaskPart( 'yy' ),
        'yyyy': new DateTimeMaskPart( 'yyyy' ),
        'H': new DateTimeMaskPart( 'H' ),
        'HH': new DateTimeMaskPart( 'HH' ),
        'm': new DateTimeMaskPart( 'm' ),
        'mm': new DateTimeMaskPart( 'mm' ),
        's': new DateTimeMaskPart( 's' ),
        'ss': new DateTimeMaskPart( 'ss' ),
        'MMM': new DateTimeMaskPart( 'MMM' ),
        'MMMM': new DateTimeMaskPart( 'MMMM' ),
        'h': new DateTimeMaskPart( 'h' ),
        'tt': new DateTimeMaskPart( 'tt' )
    }

} );
