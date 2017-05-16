function ExtensionPanelsRegister() {
    this.items = {};

    this.register = function( params ) {
        var name = params.name;
        var initializer = params.initialize;

        delete params.name;
        delete params.initialize;

        _.extend( initializer.prototype, params );

        this.items[ name ] = initializer;
    };

    this.getByName = function( name ) {
        return this.items[ name ];
    };
}

InfinniUI.extensionPanels = new ExtensionPanelsRegister();
