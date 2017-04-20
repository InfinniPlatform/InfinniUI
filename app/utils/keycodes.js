window.InfinniUI.Keyboard = {

    KeyCode: {
        ESCAPE: 27,
        HOME: 36,
        LEFT_ARROW: 37,
        RIGHT_ARROW: 39,
        END: 35,
        UP_ARROW: 38,
        DOWN_ARROW: 40,
        DELETE: 46,
        BACKSPACE: 8,
        TAB: 9,
        SPACE: 32,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        PLUS: 43,
        MINUS: 45,
        ASTERISK: 42,
        SLASH: 47,
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57
    },

    getCharByKeyCode: function( keyCode ) {
        var char, code;

        if( keyCode < 32 ) {
            //Спецсимвол
            char = null;
        } else {
            //@see http://unixpapa.com/js/key.html
            if( keyCode >= this.KeyCode.NUMPAD_0 && keyCode <= this.KeyCode.NUMPAD_9 ) {
                code = keyCode - 48;
            } else {
                switch( keyCode ) {
                    //convert numpad key codes
                    case 110:
                        code = this.KeyCode.DELETE;  //.Del
                        break;
                    case 107:
                        code = this.KeyCode.PLUS;  //+
                        break;
                    case 109:
                        code = this.KeyCode.MINUS;  //-
                        break;
                    case 106:
                        code = this.KeyCode.ASTERISK;  //*
                        break;
                    case 111:
                        code = this.KeyCode.SLASH;  // /
                        break;
                    //Symbol Keys
                    case 188:
                        code = 44;
                        break;
                    case 173:
                        code = 45;
                        break;
                    case 190:
                        code = 46;
                        break;
                    case 191:
                        code = 47;
                        break;
                    case 192:
                        code = 96;
                        break;
                    case 219:
                        code = 91;
                        break;
                    case 220:
                        code = 92;
                        break;
                    case 221:
                        code = 93;
                        break;
                    case 222:
                        code = 39;
                        break;
                    default:
                        code = keyCode;
                }
            }
            char = String.fromCharCode( code );
        }
        return char;
    }

};
