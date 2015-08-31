/**
 *
 * @constructor
 */
function ContainerItemTemplate() {

}

/**
 * @abstract
 * @param {Object} params
 */
ContainerItemTemplate.prototype.getItemTemplate = function (params) {
    throw new Error('Не перегружен getItemTemplate');
};
