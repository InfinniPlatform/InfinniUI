function ChildrenElementCollection (element) {
    this._element = element;
    this._parentElement = null;
    this._list = [];
}

ChildrenElementCollection.prototype.getList = function () {
    return this._list;
};

ChildrenElementCollection.prototype.setParent = function (parent) {
    this._parentElement = parent;
};

ChildrenElementCollection.prototype.getParent = function () {
    return this._parentElement;
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

ChildrenElementCollection.prototype.length = function () {
    return this._list.length;
};

ChildrenElementCollection.prototype.get = function (index) {
    return this._list[index];
};

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

ChildrenElementCollection.prototype.findParentByName = function (name) {
    var
        parentElement,
        children = this,
        element;


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