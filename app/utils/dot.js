/**
 * Синглтон для работы с путями построенными по dot-notation
 **/

window.InfinniUI.ObjectUtils = (function () {

    /**
     * Возвращает значение свойства.
     *
     * @private
     * @param {*} target Исходный объект.
     * @param {array} propertyPathTerms Путь к свойству объекта в виде коллекции термов.
     * @returns {*} Значение свойства.
     */
    function getPropertyByPath(target, propertyPathTerms) {
        if (target !== null && target !== undefined
            && propertyPathTerms !== null && propertyPathTerms !== undefined) {

            var parent = target;
            var length = propertyPathTerms.length;

            for (var i = 0; i < length; ++i) {
                if (parent !== null && parent !== undefined) {
                    var term = propertyPathTerms[i];

                    var termCollectionIndex = parseCollectionIndex(term);

                    if (termCollectionIndex >= 0) {
                        parent = getCollectionItem(parent, termCollectionIndex);
                    }
                    else {
                        parent = getObjectProperty(parent, term);
                    }
                }
                else {
                    return null;
                }
            }

            return parent;
        }

        return target;
    }

    /**
     * Возвращает значение свойства.
     *
     * @private
     * @param {*} target Исходный объект.
     * @param {array} propertyPathTerms Путь к свойству объекта в виде коллекции термов.
     * @param {*} propertyValue Значение свойства объекта.
     * @returns {*} Значение свойства.
     */
    function setPropertyByPath(target, propertyPathTerms, propertyValue) {
        var parent = target;
        var length = propertyPathTerms.length - 1;

        var term = propertyPathTerms[0];
        var termCollectionIndex = parseCollectionIndex(term);

        for (var i = 0; i < length; ++i) {
            var termValue = (termCollectionIndex >= 0)
                ? getCollectionItem(parent, termCollectionIndex)
                : getObjectProperty(parent, term);

            var nextTerm = propertyPathTerms[i + 1];
            var nextTermCollectionIndex = parseCollectionIndex(nextTerm);

            if (termValue === null || termValue === undefined) {
                if (nextTermCollectionIndex >= 0) {
                    termValue = [ ];
                }
                else {
                    termValue = { };
                }

                if (termCollectionIndex >= 0) {
                    setCollectionItem(parent, termCollectionIndex, termValue);
                }
                else {
                    setObjectProperty(parent, term, termValue);
                }
            }

            parent = termValue;
            term = nextTerm;
            termCollectionIndex = nextTermCollectionIndex;
        }

        if (termCollectionIndex >= 0) {
            setCollectionItem(parent, termCollectionIndex, propertyValue);
        }
        else {
            setObjectProperty(parent, term, propertyValue);
        }
    }


    /**
     * Разбивает путь к свойству, записанному в dot-notation, на термы.
     *
     * @private
     * @param {string} propertyPath Имя свойства.
     */
    function splitPropertyPath(propertyPath) {
        if (_.isEmpty(propertyPath)) {
            return null;
        }

        return propertyPath.split(".");
    }

    /**
     * Пытается интерпретировать имя свойства, как индекс элемента коллекции.
     *
     * @private
     * @param {string} propertyName Имя свойства.
     * @returns {number} Индекс элемента коллекции или -1.
     */
    function parseCollectionIndex(propertyName) {
        var index = -1;

        if (propertyName === "$") {
            index = 0;
        }
        else {
            var tryParse = parseInt(propertyName);

            if (!isNaN(tryParse)) {
                index = tryParse;
            }
        }

        return index;
    }


    /**
     * Возвращает элемент коллекции.
     *
     * @private
     * @param {array} target Исходная коллекция.
     * @param {number} index Индекс элемента.
     * @returns {*} Элемент коллекции.
     */
    function getCollectionItem(target, index) {
        if (target !== null && target !== undefined
            && Object.prototype.toString.call(target) === "[object Array]"
            && index >= 0 && index < target.length) {

            return target[index];
        }

        return null;
    }

    /**
     * Устанавливает элемент коллекции.
     *
     * @private
     * @param {array} target Исходная коллекция.
     * @param {number} index Индекс элемента.
     * @param {*} item Элемент коллекции.
     */
    function setCollectionItem(target, index, item) {
        if (target !== null && target !== undefined
            && Object.prototype.toString.call(target) === "[object Array]"
            && index >= 0 && index < target.length) {

            target[index] = item;
        }
    }


    /**
     * Возвращает значение свойства объекта.
     *
     * @private
     * @param {object} target Исходный объект.
     * @param {string} propertyName Наименование свойства.
     * @returns {*} Значение свойства.
     */
    function getObjectProperty(target, propertyName) {
        if (target !== null && target !== undefined
            && Object.prototype.toString.call(target) === "[object Object]"
            && propertyName !== null && propertyName !== undefined) {

            return target[propertyName];
        }

        return null;
    }

    /**
     * Устанавливает значение свойства объекта.
     *
     * @private
     * @param {object} target Исходный объект.
     * @param {string} propertyName Наименование свойства.
     * @param {*} propertyValue Значение свойства.
     */
    function setObjectProperty(target, propertyName, propertyValue) {
        if (target !== null && target !== undefined
            && Object.prototype.toString.call(target) === "[object Object]"
            && propertyName !== null && propertyName !== undefined) {

            target[propertyName] = propertyValue;
        }
    }

    return {

        /**
         * Возвращает значение свойства.
         *
         * @public
         * @param {*} target Исходный объект.
         * @param {string|Object} propertyPath Путь к свойству или объект для построения значения.
         * @returns {*} Значение свойства.
         */
        getPropertyValue: function (target, propertyPath) {
            var result;

            var getPropertyValue = function (target, propertyPath) {
                var propertyPathTerms = splitPropertyPath(propertyPath);
                var result = getPropertyByPath(target, propertyPathTerms);
                return typeof result === 'undefined' ? null : result;
            };

            if (_.isObject(propertyPath)) {
                result = {};
                _.each(propertyPath, function (v, n) {
                    result[n] = getPropertyValue(target, v);
                });
            } else {
                result = getPropertyValue(target, propertyPath);
            }
            return result;
        },

        /**
         * Устанавливает значение свойства.
         *
         * @public
         * @param {*} target Исходный объект.
         * @param {string} propertyPath Путь к свойству.
         * @param {*} propertyValue Значение свойства.
         */
        setPropertyValue: function (target, propertyPath, propertyValue) {
            if (target !== null && target !== undefined && !_.isEmpty(propertyPath)) {
                var propertyPathTerms = splitPropertyPath(propertyPath);
                setPropertyByPath(target, propertyPathTerms, _.clone(propertyValue));
            }
        },

        setPropertyValueDirect: function (target, propertyPath, propertyValue) {
            if (target !== null && target !== undefined && !_.isEmpty(propertyPath)) {
                var propertyPathTerms = splitPropertyPath(propertyPath);
                setPropertyByPath(target, propertyPathTerms, propertyValue);
            }
        }
    };
})();


