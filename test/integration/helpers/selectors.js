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
            self: function () {
                return './/div[contains(@class, "pl-datepicker")]';
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and node() = "' + text + '"]';
            },
            editor: function (text) {
                return this.caption(text) + '/..//input[contains(@class, "pl-control-editor")]';
            }
        },
        ComboBox: {
            self: function () {
                return './/div[contains(@class, "pl-combobox")]'
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and node() = "' + text + '"]' + this.button();
            },
            button: function () {
                return '/..//span[contains(@class, "pl-combobox__grip")]';
            },
            dropDown: function (text) {
                return '//div[contains(@class, "pl-dropdown-container")]//div[contains(@class, "pl-combobox-items")]/span[contains(@class, "pl-label") and node()= "' + text + '"]';
            },
            filter: function () {
                return '//div[contains(@class, "pl-dropdown-container")]//input[contains(@class, "pl-combobox-filter-text")]';
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