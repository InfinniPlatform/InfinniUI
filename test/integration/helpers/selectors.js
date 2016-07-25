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
            },
            message: function () {
                return '//div[@class="modal-dialog"]//p[@class="pl-messagebox-content"]';
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
            },
            control: function (text) {
                return this.caption(text) + '/..//input[contains(@class, "pl-control")]';
            }
        },
        ComboBox: {
            self: function () {
                return './/div[contains(@class, "pl-combobox")]';
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and node() = "' + text + '"]';
            },
            button: function (text) {
                return this.caption(text) + '/..//span[contains(@class, "pl-combobox__grip")]';
            },
            dropDown: function (text) {
                return '//div[contains(@class, "pl-dropdown-container")]//div[contains(@class, "pl-combobox-items")]/span[contains(@class, "pl-label") and node()= "' + text + '"]';
            },
            filter: function () {
                return '//div[contains(@class, "pl-dropdown-container")]//input[contains(@class, "pl-combobox-filter-text")]';
            },
            value: function () {
                return './/span[contains(@class, "pl-label")]';
            }
        },
        DataGrid: {
            self: function (name) {
                return './/div[contains(@class, "pl-datagrid") and @data-pl-name="' + name + '"]';
            },
            body: function (name) {
                return this.self(name) + '/div[contains(@class, "pl-datagrid__body")]';
            },
            rows: function () {
                return './/tr[contains(@class, "pl-datagrid-row_data")]';
            },
            cells: function () {
                return './/td[@class="pl-datagrid-row__cell"]'
            }
        },
        Toastr: {
            container: function () {
                return '//div[@id="toast-container"]';
            },
            messages: function () {
                return this.container() + '/div[contains(@class, "toast")]/div[@class="toast-message"]';
            }
        },
        View: {
            self: function (name) {
                return '//div[contains(@class, "pl-view") and @data-pl-name="' + name + '"]';
            }
        },
        Panel: {
            self: function () {
                return './/div[contains(@class, "pl-panel")]';
            },
            header: function () {
                return '/div[contains(@class, "pl-panel-header")]';
            },
            caption: function (text) {
                return this.self() + this.header() + '/span[contains(@class, "pl-label") and node() = "' + text + '"]';
            }
        },
        NumericBox: {
            self: function () {
                return './/div[contains(@class, "pl-numericbox")]';
            },
            caption: function (text) {
                return this.self() + '/label[@class="pl-control-label" and node() = "' + text + '"]';
            },
            minButton: function (text) {
                return this.caption(text) + '/..//span[contains(@class, "pl-numeric-box-min")]';
            },
            maxButton: function (text) {
                return this.caption(text) + '/..//span[contains(@class, "pl-numeric-box-max")]';
            }
        }
    }
};