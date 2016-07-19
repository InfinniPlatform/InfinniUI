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
                return this.self()
                    .replace(/\{caption\}/g, 'node() = "' + text + '"')
                    .replace(/\{pl-name\}/g, '@data-pl-name="' + text + '"');
            },
            default_text: function () {
                return './/div[contains(@class, "pl-button")]/button[{caption}]';
            },
            default_name: function () {
                return './/div[contains(@class, "pl-button") and {pl-name}]/button';
            },
            default: function () {
                return this.default_text() + '|' + this.default_name();
            },
            link_text: function () {
                return './/a[contains(@class, "pl-button") and {caption}]';
            },
            link_name: function () {
                return './/a[contains(@class, "pl-button") and {pl-name}]';
            },
            link: function () {
                return this.link_text() + '|' + this.link_name();
            }
        },
        ModalView: {
            self: function () {
                return './/h4[@class="modal-title"]'
            },
            header: function (text) {
                return this.self() + '/span[contains(@class, "pl-label") and node() = "' + text + '"]/../../..';
            }
        },
        DatePicker: {

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