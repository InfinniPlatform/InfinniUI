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

    getCharByKeyCode: function (keyCode) {
        var char;

        if (keyCode < 32) {
            //Спецсимвол
            char = null;
        } else {
            char = String.fromCharCode(
                (this.KeyCode.NUMPAD_0 <= keyCode && keyCode <= this.KeyCode.NUMPAD_9) ? keyCode-this.KeyCode['0'] : keyCode
            );
        }
        return char;
    }
};