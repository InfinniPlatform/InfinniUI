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

ComboBoxBaseViewStrategy.prototype.addOnClickEventListener = function (el) {
    var params = Array.prototype.slice.call(arguments, 1);
    var handler = this.trigger.bind(this, 'click');
    el.addEventListener('click', function () {
        handler.apply(this, params);
    });
};

_.extend(ComboBoxBaseViewStrategy.prototype, Backbone.Events);