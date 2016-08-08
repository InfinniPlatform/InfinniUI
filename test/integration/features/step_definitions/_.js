'use strict';

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Then(/^система отобразит список валидационных сообщений: (.*?)$/, function (messages) {
        var selector = this.selectors.XPATH.Toastr.messages();
        var xpath = this.by.xpath(selector);
        var that = this;

        messages = this._.map(messages.split('", '), function (item) {
            return item
                .replace(/"/g, '')
                .replace(/''/g, '"');
        });

        return this.driver.findElements(xpath).then(function (msgs) {
            that.assert.equal(msgs.length, messages.length, 'Количество сообщений не совпадает');

            return new Promise(function (resolve, reject) {
                msgs.forEach(function (msg, i) {
                    msg.getText().then(function (text) {
                        var linesActual = text.split('\n');
                        var linesExpected = messages[i].split('\\n');

                        try {
                            var diff = that._.difference(linesActual, linesExpected);

                            if (!that._.isArray(diff)) {
                                diff = [diff];
                            }

                            that.assert.deepEqual(linesActual, linesExpected, 'Не совпали:\n' + diff.join('\n') + '\n');
                        } catch (err) {
                            reject(err);
                        }

                        if (i == msgs.length - 1) {
                            that.driver.executeScript('$("#toast-container").remove();');
                            resolve();
                        }
                    });
                });
            });
        });
    });

    this.Then(/^система не отобразит валидационных сообщений$/, function () {
        var selector = this.selectors.XPATH.Toastr.messages();
        var xpath = this.by.xpath(selector);

        return this.driver.findElements(xpath)
            .then(function (msgs) {
                if (msgs.length != 0) {
                    throw new Error('Найдено ' + msgs.length + ' сообщений');
                }
            });
    });

    this.When(/^я увижу элемент "([^"]*)"$/, function (elementName) {
        elementName = this.helpers.parseElement(elementName);

        var selector = this.selectors.XPATH.Element.byName(elementName.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                if (elements.length < elementName.index + 1) {
                    throw new Error('Элемент не найден');
                }
                return elements[elementName.index].isDisplayed();
            })
            .then(function (value) {
                that.assert.equal(value, true);
            });
    });

    this.When(/^я не увижу элемент "([^"]*)"$/, function (elementName) {
        elementName = this.helpers.parseElement(elementName);

        var selector = this.selectors.XPATH.Element.byName(elementName.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                if (elements.length < elementName.index + 1) {
                    throw new Error('Элемент не найден');
                }
                return elements[elementName.index].isDisplayed();
            })
            .then(function (value) {
                that.assert.equal(value, false);
            });
    });

    this.When(/^я нажму на клавишу "([^"]*)"$/, function (key) {
        var keys = {
            'enter': this.keys.ENTER
        };

        key = keys[key.toLowerCase()];

        if (!key) {
            throw new Error('Неизвестная клавиша');
        }

        return this.driver.switchTo().activeElement()
            .then(function (element) {
                return element.sendKeys(key);
            });
    });

    this.When(/^я увижу элемент "([^"]*)" с текстом "([^"]*)"$/, function (elementName, text) {
        elementName = this.helpers.parseElement(elementName);
        text = text.replace(/''/g, '"');

        var selector = this.selectors.XPATH.Element.byName(elementName.name);
        var xpath = this.by.xpath(selector);
        var that = this;

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                if (elements.length < elementName.index + 1) {
                    throw new Error('Элемент не найден');
                }
                return elements[elementName.index].getText();
            })
            .then(function (elementText) {
                that.assert.equal(elementText, text);
            });
    });

    this.When(/^элемент "([^"]*)" будет недоступным$/, function (elementName) {
        elementName = this.helpers.parseElement(elementName);

        var selector = this.selectors.XPATH.Element.byName(elementName.name);
        var xpath = this.by.xpath(selector);

        return this.currentView.findElements(xpath)
            .then(function (elements) {
                if (elements.length <= elementName.index) {
                    throw new Error('Элемент не найден');
                }
                return elements[elementName.index].getAttribute('class');
            })
            .then(function (classes) {
                return new Promise(function (resolve, reject) {
                    if (classes.indexOf('pl-disabled') != -1) {
                        resolve();
                    } else {
                        reject(new Error('Элемент доступен'));
                    }
                });
            });
    });
};