/**
 * @abstract
 * @param dropdownView
 * @constructor
 */
function ComboBoxBaseViewStrategy(dropdownView) {
    this.dropdownView = dropdownView;
}

/**
 *
 * @param {string} attributeName
 * @returns {*}
 */
ComboBoxBaseViewStrategy.prototype.getModelAttribute = function (attributeName) {
    var model = this.dropdownView.model;

    return model.get(attributeName);
};

/**
 * @abstract
 */
ComboBoxBaseViewStrategy.prototype.getTemplate = function () {

};
