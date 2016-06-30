'use strict';

module.exports = {
    XPATH: {
        TextBox: {
            self: function () {
                return './/div[contains(@class, "pl-textbox") or contains(@class, "pl-password-box")]';
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and node() = "' + text + '"]';
            }
        },
        Button: {
            self: function () {
                return this.default() + '|' + this.link();
            },
            caption: function (text) {
                return this.self().replace(/\{caption\}/g, 'node() = "' + text + '"');
            },
            default: function () {
                return './/div[contains(@class, "pl-button")]/button[{caption}]';
            },
            link: function () {
                return './/a[contains(@class, "pl-button") and {caption}]';
            }
        },
        ModalView: {
            self: function () {
                return './/h4[@class="modal-title"]'
            },
            header: function (text) {
                return this.self() + '/span[contains(@class, "pl-label") and node() = "' + text + '"]/../../..';
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