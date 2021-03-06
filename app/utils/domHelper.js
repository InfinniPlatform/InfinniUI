/**
 *
 * @type {{whenReady: domHelper.whenReady}}
 */
var domHelper = {

    /**
     *
     * @param conditionFunction
     * @param onConditionFunction
     * @param n
     */
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

InfinniUI.domHelper = domHelper;
