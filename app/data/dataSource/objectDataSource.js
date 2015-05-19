function ObjectDataSource(view, metadata) {
    var result = new BaseDataSource(view, metadata.IdProperty, window.providerRegister.build('ObjectDataSource',metadata));
    //setTimeout(function(){
        result.eventStore.executeEvent('onItemsUpdated', {}, {value: metadata.Items});
        result.loadingProcessDone();
    //}, 30);

    return result;

}