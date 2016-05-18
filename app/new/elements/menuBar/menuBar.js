/**
 * @param parent
 * @constructor
 * @augments Container
 */
function MenuBar(parent) {
    _.superClass(MenuBar, this, parent);
}

_.inherit(MenuBar, Container);

_.extend(MenuBar.prototype, {
    createControl: function (viewMode) {
        window.ololo = this;
        return new MenuBarControl(viewMode);
    },

    /**
     * @description Устанавливает/снимает выделение элемента меню с заданным именем
     * @param {String|*} name Имя выделяемого элемента меню
     */
    highlightItem: function (name) {
        (function highlight(element) {
            var childElements = element.getChildElements();
            childElements.forEach(function (childElement) {
                var highlight = _.isString(name) && childElement.getName() === name;
                var control = childElement.control;

                if (control) {
                    control.setHighlight(highlight);
                }
            });
        })(this);
    }

});