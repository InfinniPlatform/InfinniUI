/**
 * @description
 * Для закачки контента по POST запросу используется подход: {@link http://gruffcode.com/2010/10/28/detecting-the-file-download-dialog-in-the-browser/}
 * @param resultCallback
 * @param successCallback
 * @param failCallback
 * @constructor
 */
function DownloadExecutor( resultCallback, successCallback, failCallback ) {
    this.guid = guid();
    this.options = {
        timeout: 1 * 60 * 1000,
        poll: 100
    };

    this.resultCallback = resultCallback;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
}

window.InfinniUI.DownloadExecutor = DownloadExecutor;

DownloadExecutor.prototype.config = function( options ) {
    _.extend( this.options, options );
};

DownloadExecutor.prototype.run = function( requestData ) {
    var cleanup = this.cleanup.bind( this );
    var onResult = function() {
        if( typeof this.resultCallback === 'function' ) {
            this.resultCallback.apply( this, arguments );
        }
    }.bind( this );
    var onSuccess = function( data ) {
        if( typeof this.successCallback === 'function' ) {
            this.successCallback.call( this, data );
        }
        onResult( data );
    }.bind( this );
    var onError = function( err ) {
        if( typeof this.successCallback === 'function' ) {
            this.successCallback.call( this, data );
        }
        onResult( err );
    };

    this.waitResponse( cleanup )
        .always( function() {
            cleanup();
        } )
        .done( onSuccess )
        .fail( onError );

    this.openWindow( requestData );
};

DownloadExecutor.prototype.openWindow = function( requestData ) {
    var windowName = this.getName( 'window' );
    var form = document.createElement( 'form' );

    this.form = form;

    form.setAttribute( 'method', requestData.method );
    form.setAttribute( 'action', requestData.requestUrl );
    form.setAttribute( 'target', windowName );
    form.setAttribute( 'style', 'display: none;' );

    var dataField = document.createElement( 'input' );
    dataField.setAttribute( 'name', 'data' );
    dataField.setAttribute( 'value', JSON.stringify( requestData.args ) );
    form.appendChild( dataField );

    //Cookie которую долден вернуть сервер с отправкой запрошенного контента
    var tokenField = document.createElement( 'input' );
    tokenField.setAttribute( 'name', 'token' );
    tokenField.setAttribute( 'value', this.getName( 'token' ) );
    form.appendChild( tokenField );

    document.body.appendChild( form );
    this.popup = window.open( 'about:blank', windowName );
    form.submit();
};

DownloadExecutor.prototype.getName = function( name ) {
    return name + this.guid;
};

DownloadExecutor.prototype.cleanup = function() {
    clearInterval( this.intervalId );
    clearTimeout( this.timeout );
    $.removeCookie( this.getName( 'token' ) );
    if( this.form ) {
        this.form.remove();
        this.form = null;
    }
    if( this.popup ) {
        this.popup.close();
        this.popup = null;
    }
};

DownloadExecutor.prototype.waitResponse = function( beforeStart ) {
    var cookieName = this.getName( 'token' );
    var defer = $.Deferred( beforeStart );

    //Check cookie from server's response
    this.intervalId = setInterval( function() {
        var cookie = $.cookie( cookieName );
        if( cookie === cookieName ) {
            defer.resolve();
        }
    }, this.options.poll );

    //Check timeout
    this.timeout = setTimeout( function() {
        defer.reject();
    }, this.options.timeout );

    return defer.promise();
};
