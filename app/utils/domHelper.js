var domHelper = {

    whenReady: function( conditionFunction, onConditionFunction, n ) {
        var that = this;

        if( typeof n === 'undefined' ) {
            n = 100;
        }

        if( !conditionFunction() ) {
            if( n > 0 ) {
                setTimeout( function() {
                    that.whenReady( conditionFunction, onConditionFunction, n - 1 );
                }, 510 );
            }
        }else{
            onConditionFunction();
        }
    }

};
