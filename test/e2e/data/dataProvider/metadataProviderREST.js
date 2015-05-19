describe('MetadataProviderREST', function () {

    var host = 'http://ic:9900';

    window.providerRegister.register('MetadataDataSource', function (metadataValue) {
        return new MetadataProviderREST(new QueryConstructorMetadata(host, metadataValue));
    });

    var metadataView = {
        Name: 'HomePageView',
        ConfigId: 'Structure',
        DocumentId: 'Common',
        ViewType: 'HomePage'
    };

    var metadataMenu = {
        MetadataName: "MainMenu",
        ConfigId: "VeteransHospital"
    };

    it('should MetadataProviderREST get view metadata', function (done) {
        window.providerRegister.build('MetadataDataSource', metadataView).getViewMetadata(function (data) {
            assert.ok(data);
            done();
        });

    });
    it('should MetadataProviderREST get menu metadata', function (done) {
        
        window.providerRegister.build('MetadataDataSource', metadataMenu).getMenuMetadata(function (data) {
            assert.ok(data);
            done();
        } );
    });


});