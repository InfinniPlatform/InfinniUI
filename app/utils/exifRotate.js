var exifRotate = {

    rotation: {
        1: 'rotate(0deg)',
        3: 'rotate(180deg)',
        6: 'rotate(90deg)',
        8: 'rotate(270deg)'
    },

    _arrayBufferToBase64: function( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for( var i = 0; i < len; i++ ) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    },

    orientation: function( file, callback ) {
        var that = this;
        var fileReader = new FileReader();
        fileReader.onloadend = function() {
            var base64img = 'data:' + file.type + ';base64,' + that._arrayBufferToBase64( fileReader.result );
            var scanner = new DataView( fileReader.result );
            var idx = 0;
            var value = 1; // Non-rotated is the default
            if( fileReader.result.length < 2 || scanner.getUint16( idx ) != 0xFFD8 ) {
                // Not a JPEG
                if( callback ) {
                    callback( base64img, value );
                }
                return;
            }
            idx += 2;
            var maxBytes = scanner.byteLength;
            while( idx < maxBytes - 2 ) {
                var uint16 = scanner.getUint16( idx );
                idx += 2;
                switch( uint16 ) {
                    case 0xFFE1: // Start of EXIF
                        var exifLength = scanner.getUint16( idx );
                        maxBytes = exifLength - idx;
                        idx += 2;
                        break;
                    case 0x0112: // Orientation tag
                        value = scanner.getUint16( idx + 6, false );
                        maxBytes = 0; // Stop scanning
                        break;
                    default:
                        break;
                }
            }
            if( callback ) {
                callback( base64img, value );
            }
        };

        fileReader.readAsArrayBuffer( file );
    }

};

InfinniUI.exifRotate = exifRotate;
