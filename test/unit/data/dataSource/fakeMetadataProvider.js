function FakeMetadataProvider() {

    this.getViewMetadata = function (resultCallback) {

        return  {
            ConfigId: 'Structure',
            DocumentId: 'Common',
            ViewType: 'HomePage'
        };
    };


    this.getMenuMetadata = function (resultCallback) {

        throw 'not implemented getMenuMetadata FakeMetadataProvider';

    };


}