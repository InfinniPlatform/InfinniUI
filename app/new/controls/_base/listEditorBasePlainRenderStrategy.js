/**
 *
 * @constructor
 * @extends ContainerRenderStrategy
 */
function ListEditorBasePlainRenderStrategy(model, $container, itemViewConstructor) {
    ContainerRenderStrategy.call(this, model, $container, itemViewConstructor);
}

ListEditorBasePlainRenderStrategy.prototype = Object.create(ContainerRenderStrategy.prototype);
ListEditorBasePlainRenderStrategy.prototype.constructor = ListEditorBasePlainRenderStrategy;