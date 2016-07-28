'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.When(/^я увижу в таблице "([^"]*)" строку под номером "([^"]*)" со значением "([^"]*)"$/, function (dataGridName, rowIndex, values) {
        var selector = this.selectors.XPATH.DataGrid.body(dataGridName);
        var xpath = this.by.xpath(selector);
        var that = this;

        rowIndex = parseInt(rowIndex);
        values = values.split('|');
        values.splice(0, 1);
        values.splice(values.length - 1, 1);

        this.assert.isNumber(rowIndex);

        return this.currentView.findElement(xpath).then(function (dataGrid) {
            selector = that.selectors.XPATH.DataGrid.rows();
            xpath = that.by.xpath(selector);

            return dataGrid.findElements(xpath).then(function (rows) {
                selector = that.selectors.XPATH.DataGrid.cells();
                xpath = that.by.xpath(selector);

                if(rows.length < rowIndex + 1) {
                    throw new Error('Требуется ' + (rowIndex + 1) + ' строка, всего строк - ' + rows.length);
                }

                return rows[rowIndex].findElements(xpath).then(function (cells) {
                    cells.forEach(function (cell, i) {
                        var expected = values[i].replace(/''/g, '"');
                        cell.getText().then(function (text) {
                            text = text.trim();
                            if (expected != '***') {
                                that.assert.equal(text, expected);
                            }
                        });
                    });
                });
            });
        });
    });

    this.When(/^я отмечу в таблице "([^"]*)" строку под номером "([^"]*)"$/, function (dataGridName, rowIndex) {
        var selector = this.selectors.XPATH.DataGrid.body(dataGridName);
        var xpath = this.by.xpath(selector);
        var that = this;

        rowIndex = parseInt(rowIndex);

        this.assert.isNumber(rowIndex);

        return this.currentView.findElement(xpath)
            .then(function (dataGrid) {
                selector = that.selectors.XPATH.DataGrid.rows();
                xpath = that.by.xpath(selector);

                return dataGrid.findElements(xpath);
            })
            .then(function (rows) {
                selector = that.selectors.XPATH.DataGrid.toggle();
                xpath = that.by.xpath(selector);

                if(rows.length < rowIndex + 1) {
                    throw new Error('Требуется ' + (rowIndex + 1) + ' строка, всего строк - ' + rows.length);
                }

                return rows[rowIndex].findElement(xpath);
            })
            .then(function (toggleCell) {
                return toggleCell.click();
            });
    });
};