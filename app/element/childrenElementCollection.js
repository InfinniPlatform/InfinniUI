/**
 *
 * @param {Element} element
 * @constructor
 */
function ChildrenElementCollection (element) {
    this._element = element;
    this._parentElement = null;
    this._list = [];
}

/**
 * @description Возвращает список дочерних элементов
 * @returns {Array.<Element>}
 */
ChildrenElementCollection.prototype.getChildElements = function () {
    return this._list;
};

/**
 * @description Возвращает родительский элемент
 * @returns {null|Element}
 */
ChildrenElementCollection.prototype.getParent = function () {
    return this._parentElement;
};

/**
 * @description Количество дочерних элементов
 * @returns {Number}
 */
ChildrenElementCollection.prototype.length = function () {
    return this._list.length;
};

/**
 * @description Возвращает дочерний элемент по указанному индексу
 * @param index {Number}
 * @returns {Element|undefined}
 */
ChildrenElementCollection.prototype.get = function (index) {
    return this._list[index];
};

/**
 * @description Возвращает первый из всех дочерних элементов с заданным именем
 * @param name {String} Имя элемента @see {@link Element#Name}
 * @returns {Element|null}
 */
ChildrenElementCollection.prototype.findChildrenByName = function (name) {
    var
        elements, element = null;

    elements = this._list.filter(function (el) {
        return el.getName() === name;
    });

    if (elements.length > 0) {
        element = elements[0];
    } else {
        this._list.some(function (el) {
            element  = el.children.findChildrenByName(name);
            return  element !== null;
        });
    }
    return element;
};

/**
 * @description Возвращает все дочерние элементы с указанным именем
 * @param name {String} Имя элемента @see {@link Element#Name}
 * @returns {Array.<Element>}
 */
ChildrenElementCollection.prototype.findAllChildrenByName = function (name) {
    var
        elements = [];

    this._list.forEach(function (el) {
        if (el.getName() === name) {
            elements.push(el);
        }
        Array.prototype.push.apply(elements, el.children.findAllChildrenByName(name));
    });

    return elements;
};

/**
 * @description Возвращает родительский элемент с заданным именем
 * @param name {String} Имя элемента @see {@link Element#Name}
 * @returns {Element|null}
 */
ChildrenElementCollection.prototype.findParentByName = function (name) {
    var
        parentElement,
        children = this,
        element = null;


    while (parentElement = children && children.getParent()) {
        if (parentElement.getName() == name) {
            element = parentElement;
            break;
        }
        if (parentElement.children.getParent()) {
            children = parentElement.children
        } else {
            break;
        }
    }

    return element;
};

ChildrenElementCollection.prototype.setParent = function (parent) {
    this._parentElement = parent;
};

ChildrenElementCollection.prototype.add = function (element) {
    this._list.push(element);
    element.children.setParent(this._element);
};

ChildrenElementCollection.prototype.clear = function () {
    var el;

    while(el = this._list.pop()) {
        el.children
            .clear()
            .setParent(null);
    }
    return this;
};
