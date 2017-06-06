/**
 * @mixin
 * @type {{applyAutoFocus: openModeAutoFocusMixin.applyAutoFocus}}
 */
var openModeAutoFocusMixin = {

    /**
     *
     */
    applyAutoFocus: function() {
        var view = this.view;
        var focusOnControl = view && view.getFocusOnControl();

        if( !focusOnControl ) {
            return;
        }

        var focusInterval = setInterval( function() {
            var elements = view.findAllChildrenByName( focusOnControl );
            if( Array.isArray( elements ) && elements.length > 0 ) {
                var element = elements[ 0 ];
                if( !jQuery.contains( document, element.control.controlView.el ) ) {
                    return;
                }

                element.setFocus && element.setFocus();
                clearFocusInterval();
            }
        }, 1000 / 3 );

        setTimeout( clearFocusInterval, 3000 );

        function clearFocusInterval() {
            clearInterval( focusInterval );
        }
    }

};

InfinniUI.openModeAutoFocusMixin = openModeAutoFocusMixin;
