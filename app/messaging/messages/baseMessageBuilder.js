function BaseMessageBuilder() {

    this.build = function (builder, parent, metadata, collectionProperty, params) {
        params = params || {};
        if (typeof params.source === 'undefined' || params.source === null) {
            throw new Error('Не передан обязательный параметр BaseMessage.source');
        }
        return new BaseMessage(params.source, params.value);
    }
}
