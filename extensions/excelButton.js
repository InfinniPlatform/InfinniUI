function ExcelButton() {

    this.render = function( target, parameters, context ) {
        var $button = $( '<a>' )
            .attr( 'href', '#' )
            .append( $( '<img src="/launchers/main/excel.png" />' ).css( 'width', '34px' ) )
            .click( function() {
                context.Global.executeAction( {
                    OpenViewAction: {
                        View: {
                            AutoView: {
                                ConfigId: 'Schedule',
                                DocumentId: 'OperationAppointment',
                                MetadataName: 'ExcelView',
                                OpenMode: 'Dialog'
                            }
                        }
                    }
                } );

                return false;
            } );

        target.append( $button );
    };

}
