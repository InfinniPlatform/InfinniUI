describe( 'ExtensionPanels', function() {
    it( 'should render ExtensionPanel', function( done ) {
        InfinniUI.extensionPanels.register( {
            name: 'TestExtensionPanel',
            initialize: function( context, args ) {
                this.$el = args.$el;
            },
            render: function() {
                this.$el
                    .addClass( 'renderedExtension' );
            }
        } );

        var metadata = {
            'Items': [{
                'ExtensionPanel': {
                    'Name': 'ExtensionPanelName',
                    'ExtensionName': 'TestExtensionPanel'
                }
            }]
        };

        testHelper.applyViewMetadata( metadata, function( view ) {
            var extensionPanel = view.context.controls[ 'ExtensionPanelName' ];
            var $extensionPanel = extensionPanel.control.controlView.$el;

            assert.isTrue( $extensionPanel.hasClass( 'renderedExtension' ) );

            done();

            view.close();
        } );
    } );
} );
