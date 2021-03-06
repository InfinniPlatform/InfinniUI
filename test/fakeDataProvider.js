function FakeDataProvider( mode ) {

    var items = [
        {
            'Id': '1',
            'FirstName': 'Иван',
            'LastName': 'Иванов'
        },
        {
            'Id': '2',
            'FirstName': 'Петр',
            'LastName': 'Петров'
        },
        {
            'Id': '3',
            'FirstName': 'Иван1',
            'LastName': 'Иванов1'
        },
        {
            'Id': '4',
            'FirstName': 'Петр2',
            'LastName': 'Петров2'
        },
        {
            'Id': '5',
            'FirstName': 'Иван3',
            'LastName': 'Иванов3'
        },
        {
            'Id': '6',
            'FirstName': 'Петр4',
            'LastName': 'Петров5'
        },
        {
            'Id': '10',
            'FirstName': 'Анна',
            'LastName': 'Сергеева'

        }
    ];

    var itemsUpdated = [
        {
            'Id': '4',
            'FirstName': 'Федор',
            'LastName': 'Федоров'
        },
        {
            'Id': '5',
            'FirstName': 'Сидор',
            'LastName': 'Сидоров'
        }
    ];

    this.getItems = function( resultCallback ) {
        if ( typeof mode === 'undefined' || mode() === 'Created' ) {

            var result = items;

            setTimeout( function() {
                resultCallback( { data: result } );
            }, 100 );

        }
        else {
            setTimeout( function() {
                resultCallback( itemsUpdated );
            }, 100 );
        }
    };

    this.createItem = function( resultCallback ) {
        setTimeout( function() {
            resultCallback( { prefilledField: 1, Id: 1, __Id: 1 } );
        }, 100 );

    };

    this.saveItem = function( value, resultCallback, warnings ) {

        var itemIndex = -1;

        for ( var i = 0; i < items.length; i++ ) {
            if ( items[ i ]._id === value._id ) {
                itemIndex = i;
                break;
            }
        }

        if ( itemIndex !== -1 ) {
            items[ itemIndex ] = value;
        }
        else {
            items.push( value );
        }

        setTimeout( function() {
            resultCallback( items );
        }, 90 );
    };

    this.deleteItem = function( value, resultCallback ) {
        var itemIndex = items.indexOf( value );
        items.splice( itemIndex, 1 );
        resultCallback( items );
    };

    this.getItem = function( itemId, resultCallback ) {
        for ( var i = 0; i < items.length; i++ ) {
            if ( items[ i ].Id === itemId ) {
                resultCallback( [items[ i ]] );
                return;
            }
        }
        resultCallback( null );
    };

    this.createIdFilter = function( id ) {
        return [{
            'Property': 'Id',
            'Value': id,
            'CriteriaType': 1
        }];
    };

    this.setCreateAction = function() {};
    this.setUpdateAction = function() {};
    this.setReadAction = function() {};
    this.setDeleteAction = function() {};
}
