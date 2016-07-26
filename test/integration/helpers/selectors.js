'use strict';

module.exports = {
    XPATH: {
        TextBox: {
            self: function () {
                return './/div[contains(@class, "pl-textbox") or contains(@class, "pl-password-box")]';
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and normalize-space(node()) = "' + text + '"]';
            }
        },
        Button: {
            self: function () {
                return this.default() + '|' + this.link();
            },
            caption: function (text) {
                return this.self()
                    .replace(/\{caption\}/g, 'normalize-space(node()) = "' + text + '"')
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
                return this.self() + '/span[contains(@class, "pl-label") and normalize-space(node()) = "' + text + '"]/../../..';
            },
            message: function () {
                return '//div[@class="modal-dialog"]//p[@class="pl-messagebox-content"]';
            },
            closeButton: function () {
                return './/div[contains(@class, "modal-dialog")]//div[@class="modal-header"]/button[contains(@class, "pl-close-modal")]';
            }
        },
        DatePicker: {
            self: function () {
                return './/div[contains(@class, "pl-datepicker")]';
            },
            caption: function (text) {
                return this.self() + '/label[contains(@class, "pl-control-label") and normalize-space(node()) = "' + text + '"]';
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
                return this.self() + '/label[contains(@class, "pl-control-label") and normalize-space(node()) = ' + text + ']';
            },
            button: function (text) {
                return this.caption(text) + '/..//span[contains(@class, "pl-combobox__grip")]';
            },
            dropDown: function (text) {
                return '//div[contains(@class, "pl-dropdown-container")]//div[contains(@class, "pl-combobox-items")]/span[contains(@class, "pl-label") and normalize-space(node()) = ' + text + ']';
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
                return this.container() + '/div[contains(@class, "toast-success") or contains(@class, "toast-error")]/div[@class="toast-message"]';
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
                return this.self() + this.header() + '/span[contains(@class, "pl-label") and normalize-space(node()) = "' + text + '"]';
            }
        },
        NumericBox: {
            self: function () {
                return './/div[contains(@class, "pl-numericbox")]';
            },
            caption: function (text) {
                return this.self() + '/label[@class="pl-control-label" and normalize-space(node()) = "' + text + '"]';
            },
            minButton: function (text) {
                return this.caption(text) + '/..//span[contains(@class, "pl-numeric-box-min")]';
            },
            maxButton: function (text) {
                return this.caption(text) + '/..//span[contains(@class, "pl-numeric-box-max")]';
            }
        },
        TabPanel: {
            self: function (name) {
                return './/div[contains(@class, "pl-tabpanel") and @data-pl-name="' + name + '"]';
            },
            list: function (name) {
                return this.self(name) + '//ul[contains(@class, "pl-tabpanel-header")]';
            },
            page: function (name, text) {
                return this.list(name) + '/li[@class="pl-tabheader" and normalize-space(node()) = "' + text + '"]';
            }
        },
        CheckBox: {
            name: function (name) {
                return './/div[@data-pl-name="' + name + '"]//input';
            },
            label: function (text) {
                return './/div[@class="checkbox"]//span[@class="checkbox-label" and normalize-space(node()) = "' + text + '"]/../input';
            },
            self: function (text) {
                return this.name(text) + '|' + this.label(text);
            }
        },
        Element: {
            byName: function (name) {
                var result = [];
                var that = this;

                this.tags.forEach(function (tag) {
                    result.push(that.element(tag, name));
                });

                return result.join('|');
            },
            element: function (tag, name) {
                return './/' + tag + '[@data-pl-name="' + name + '"]';
            },
            tags: [ 'div', 'a', 'i', 'p', 'span']
        }
    }
};