'use strict';

module.exports = {
    XPATH: {
        TextBox: {
            self: function () {
                return '//div[contains(@class, "pl-textbox") or contains(@class, "pl-password-box")]';
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and text() = "' + text + '"]';
            }
        },
        Button: {
            self: function () {
                return '//div[contains(@class, "pl-button")]';
            },
            caption: function (text) {
                return this.self() + '/button[text() = "' + text + '"]';
            }
        },
        ModalView: {
            self: function () {
                return '//h4[@class="modal-title"]'
            },
            header: function (text) {
                return this.self() + '/span[contains(@class, "pl-label") and text() = "' + text + '"]/../../..';
            }
        }
    },
    CSS: {
        View: {
            self: function (name) {
                return '.pl-view[data-pl-name="' + name + '"]';
            }
        }
    }
};