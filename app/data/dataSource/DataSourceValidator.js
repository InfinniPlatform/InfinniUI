/**
 *
 * @param parent
 * @param {BaseDataSource} dataSource
 * @constructor
 */
function DataSourceValidator (dataSource,  validationWarnings, validationErrors) {

    /**
     * Результат проверки на предупреждения
     */
    var warnings;

    /**
     * Результат проверки на ошибки
     */
    var errors;

    /**
     * Результат проверки (warnings && errors)
     */
    var success;

    /**
     * Проверка на валидность
     * @param {Boolean} ignoreWarnings Игнорировать предупреждения
     * @returns {boolean}
     */
    this.validate = function (ignoreWarnings) {
        ignoreWarnings = !!ignoreWarnings;

        resetResults();

        var selectedItem = dataSource.getSelectedItem();

        if (validationWarnings && !ignoreWarnings) {
            validationWarnings.validate("", selectedItem, warnings);
        }

        if (validationErrors && warnings.IsValid !== false ) {
            //Проверяем на ошибки ValidationErrors
            validationErrors.validate("", selectedItem, errors);
        }

        success = warnings.IsValid !== false && errors.IsValid !== false;

        return success;
    };


    /**
     * Уведомить элементы о результатах проверки
     */
    this.notifyElements = function (propertyName) {
        clearOldMessages(propertyName);

        if (success) {
            return;
        }

        notifyElement(warnings, propertyName);//Уведомление о предупреждениях
        notifyElement(errors, propertyName);  //Уведомление об ошибках
    };

    function clearOldMessages(propertyName){
        var bindings = dataSource.getDataBindings();
        var element;

        for (var j = 0; j < bindings.length; j++) {
            if (_.isEmpty(propertyName) === false) {
                if (bindings[j].property !== propertyName) {
                    continue;
                }
            }
            element = bindings[j].getElement();
            if (element && typeof element == 'object' && $.isFunction(element.setValidationState) ) {
                element.setValidationState('success', '');
            }
        }
    }

    /**
     * Уведомление элемента о необходимости изменить внешний виж по результатам валидации
     * @param {*} validationResult
     * @param {string} [prop]
     */
    function notifyElement (validationResult, prop) {
        if (validationResult.IsValid === true) {
            return;
        }

        var state = (validationResult === errors) ? 'error' : 'warning';

        var items = validationResult.Items || [];
        var bindings = dataSource.getDataBindings();
        var propertyName, message;
        var element;

        for (var i = 0; i < items.length; i = i + 1) {
            propertyName = items[i].Property;
            message = items[i].Message;

            if (_.isEmpty(propertyName) && _.isEmpty(prop)) {
                toastr.error(message);
            }
            for (var j = 0; j < bindings.length; j++) {
                if (bindings[j].getProperty() === propertyName) {
                    if (!_.isEmpty(prop) && propertyName !== prop) {
                        continue;
                    }
                    element = bindings[j].getElement();
                    if (typeof element !== 'undefined' && element !== null) {
                        element.setValidationState(state, message);
                    }
                }
            }
        }
    }

    /**
     * @private
     * Сброс результатов проверки
     */
    function resetResults() {
        warnings = {};
        errors = {};
    }
}