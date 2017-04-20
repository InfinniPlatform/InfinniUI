var TemplateMaskPartStrategy = ( function() {
    var regexpAnyLetter = /^[a-zA-Zа-яА-ЯёЁ]$/;
    var regexpAnyNumber = /^\d$/;
    var regexpSign = /^[-+]$/;

    function isEmptyValue( value ) {
        return typeof value === 'undefined' || value === '' || value === null;
    }

    return {
        //Используемые метасимволы маски ввода

        'c': {  //Необязательный ввод любого символа.
            required: false,    //Признак обязательности элемента маски ввода
            width: 1,   //Ширина для заполнителя маски ввода
            validator: function( value ) {   //Проверка на допустимость значения для текущего метасимвола
                return true;
            },
            regexp: '.?'    //Регулярное выражение для выделения символа соответствующего метасимволу из общей строки значения
        },

        'C': {  //Обязательный ввод любого символа.
            required: true,
            width: 1,
            validator: function( value ) {
                return !isEmptyValue( value );
            },
            regexp: '.'
        },

        'l': {  //Необязательный ввод буквы.
            required: false,
            width: 1,
            validator: function( value ) {
                return isEmptyValue( value ) || regexpAnyLetter.test( value );
            },
            regexp: '[a-zA-Zа-яА-ЯёЁ]?'
        },

        'L': {  //Обязательный ввод буквы.
            required: true,
            width: 1,
            validator: function( value ) {
                return !isEmptyValue( value ) && regexpAnyLetter.test( value );
            },
            regexp: '[a-zA-Zа-яА-ЯёЁ]'
        },

        'a': {  //Необязательный ввод буквы или цифры.
            required: false,
            width: 1,
            validator: function( value ) {
                return isEmptyValue( value ) || regexpAnyLetter.test( value ) || regexpAnyNumber.test( value );
            },
            regexp: '[a-zA-Zа-яА-ЯёЁ0-9]?'
        },

        'A': {  //Обязательный ввод буквы или цифры.
            required: true,
            width: 1,
            validator: function( value ) {
                return !isEmptyValue( value ) && ( regexpAnyLetter.test( value ) || regexpAnyNumber.test( value ) );
            },
            regexp: '[a-zA-Zа-яА-ЯёЁ0-9]?'
        },

        '#': {  //Необязательный ввод цифры, знака "-" или "+".
            required: false,
            width: 1,
            validator: function( value ) {
                return isEmptyValue( value ) || regexpSign.test( value );
            },
            regexp: '[-+]?'
        },

        '9': {  //Необязательный ввод цифры.
            required: false,
            width: 1,
            validator: function( value ) {
                return isEmptyValue( value ) || regexpAnyNumber.test( value );
            },
            regexp: '[0-9]?'
        },

        '0': {  //Обязательный ввод цифры.
            required: true,
            width: 1,
            validator: function( value ) {
                return !isEmptyValue( value ) && regexpAnyNumber.test( value );
            },
            regexp: '[0-9]'
        }
    };

} )();


var TemplateMaskPart = function( mask ) {
    _.extend( this, TemplateMaskPartStrategy[ mask ] );
};

_.extend( TemplateMaskPart.prototype, {

    /**
     * Проверка символа на допустимость для метасимвола маски
     * @param {string} value
     * @returns {boolean}
     */
    validate: function( value ) {
        return this.validator( value );
    },

    /**
     * Проверка на заполненность значения для метасимвола маски
     * @param {string} value
     * @returns {boolean}
     */
    getIsComplete: function( value ) {
        return !this.required || ( value !== '' && typeof value !== 'undefined' && value !== null );
    }

} );


