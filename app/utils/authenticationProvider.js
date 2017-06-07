/**
 * Провайдер аутентификации.
 * @mixes ajaxRequestMixin
 * @constructor
 */
function AuthenticationProvider( baseAddress ) {
    this.baseAddress = baseAddress;
}

_.extend( AuthenticationProvider.prototype, {

    handlers: {
        onActiveRoleChanged: $.Callbacks(),
        onSignInInternal: $.Callbacks(),
        onSignOut: $.Callbacks()
    },

    /**
     * Возвращает информацию о текущем пользователе.
     * @param resultCallback
     * @param errorCallback
     * @public
     */
    getCurrentUser: function( resultCallback, errorCallback ) {
        this.sendPostRequestForServiceResult( '/Auth/GetCurrentUser', {}, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Изменяет пароль текущего пользователя.
     * @param oldPassword
     * @param newPassword
     * @param resultCallback
     * @param errorCallback
     */
    changePassword: function( oldPassword, newPassword, resultCallback, errorCallback ) {
        var changePasswordForm = {
            OldPassword: oldPassword,
            NewPassword: newPassword
        };

        this.sendPostRequestForServiceResult( '/Auth/ChangePassword', changePasswordForm, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Изменяет персональную информацию текущего пользователя.
     * @param displayName
     * @param description
     * @param resultCallback
     * @param errorCallback
     */
    changeProfile: function( displayName, description, resultCallback, errorCallback ) {
        var changeProfileForm = {
            DisplayName: displayName,
            Description: description
        };

        this.sendPostRequestForServiceResult( '/Auth/ChangeProfile', changeProfileForm, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Осуществляет вход пользователя в систему через внутренний провайдер.
     * @param userName
     * @param password
     * @param remember
     * @param resultCallback
     * @param errorCallback
     */
    signInInternal: function( userName, password, remember, resultCallback, errorCallback ) {
        var signInInternalForm = {
            UserName: userName,
            Password: password,
            Remember: remember
        };

        this.sendPostRequestForServiceResult( '/Auth/SignInInternal', signInInternalForm, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Возвращает форму входа пользователя в систему через внешний провайдер.
     * @param successUrl
     * @param failureUrl
     * @param resultCallback
     * @param errorCallback
     */
    getSignInExternalForm: function( successUrl, failureUrl, resultCallback, errorCallback ) {
        this.getExternalLoginForm( '/Auth/SignInExternal', successUrl, failureUrl, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Возвращает форму добавления текущему пользователю имени входа у внешнего провайдера.
     * @param successUrl
     * @param failureUrl
     * @param resultCallback
     * @param errorCallback
     */
    getLinkExternalLoginForm: function( successUrl, failureUrl, resultCallback, errorCallback ) {
        this.getExternalLoginForm( '/Auth/LinkExternalLogin', successUrl, failureUrl, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Удаляет у текущего пользователя имя входа у внешнего провайдера.
     * @param provider
     * @param providerKey
     * @param resultCallback
     * @param errorCallback
     */
    unlinkExternalLogin: function( provider, providerKey, resultCallback, errorCallback ) {
        var unlinkExternalLoginForm = {
            Provider: provider,
            ProviderKey: providerKey
        };

        this.sendPostRequest( '/Auth/UnlinkExternalLogin', unlinkExternalLoginForm, resultCallback, errorCallback );
    },

    /**
     * @public
     * @description Выход пользователя из системы.
     * @param resultCallback
     * @param errorCallback
     */
    signOut: function( resultCallback, errorCallback ) {
        var signOutInternalForm = {
            'id': null,
            'changesObject': {},
            'replace': false
        };

        this.sendPostRequestForServiceResult( '/Auth/SignOut', null, function() {
            InfinniUI.user.onReadyDeferred = $.Deferred();
            InfinniUI.user.onReadyDeferred.resolve( null );

            var args = _.toArray( arguments );
            if( resultCallback ) {
                resultCallback.apply( this, args );
            }

            this.handlers.onSignOut.fire.apply( this.handlers.onSignOut, args );
        }.bind( this ), errorCallback );
    },

    /**
     * @public
     * @param requestUri
     * @param successUrl
     * @param failureUrl
     * @param resultCallback
     * @param errorCallback
     */
    getExternalLoginForm: function( requestUri, successUrl, failureUrl, resultCallback, errorCallback ) {
        var url = this.baseAddress + requestUri;

        this.sendPostRequest( '/Auth/GetExternalProviders', {},
            function( result ) {
                var formElement = $( document.createElement( 'form' ) );
                formElement.attr( 'method', 'POST' );
                formElement.attr( 'action', url );

                var successUrlElement = $( document.createElement( 'input' ) );
                successUrlElement.attr( 'type', 'hidden' );
                successUrlElement.attr( 'name', 'SuccessUrl' );
                successUrlElement.attr( 'value', successUrl );
                formElement.append( successUrlElement );

                var failureUrlElement = $( document.createElement( 'input' ) );
                failureUrlElement.attr( 'type', 'hidden' );
                failureUrlElement.attr( 'name', 'FailureUrl' );
                failureUrlElement.attr( 'value', failureUrl );
                formElement.append( failureUrlElement );

                if( result !== null && typeof result !== 'undefined' ) {
                    for( var i = 0; i < result.length; ++i ) {
                        var providerInfo = result[ i ];
                        var providerType = providerInfo.Type;
                        var providerName = providerInfo.Name;

                        var loginButton = $( document.createElement( 'button' ) );
                        loginButton.attr( 'type', 'submit' );
                        loginButton.attr( 'name', 'Provider' );
                        loginButton.attr( 'value', providerType );
                        loginButton.text( providerName );
                        formElement.append( loginButton );
                    }
                }

                resultCallback( formElement );
            },
            errorCallback
        );
    },

    /**
     *
     * @param requestUri
     * @param resultCallback
     * @param errorCallback
     */
    sendGetRequest: function( requestUri, resultCallback, errorCallback ) {
        $.ajax( this.baseAddress + requestUri, {
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest( resultCallback ),
            error: this.onErrorRequest( function( error ) {
                if( errorCallback ) {
                    errorCallback( error.responseJSON );
                }
            } )
        } );
    },

    /**
     *
     * @param requestUri
     * @param requestData
     * @param resultCallback
     * @param errorCallback
     */
    sendPostRequest: function( requestUri, requestData, resultCallback, errorCallback ) {
        var that = this;

        if( requestData !== null ) {
            requestData = JSON.stringify( requestData );
        }
        $.ajax( this.baseAddress + requestUri, {
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: requestData,
            contentType: 'application/json',
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest( resultCallback ),
            error: this.onErrorRequest( function( error ) {
                if( error.status != 200 ) {
                    if( errorCallback ) {
                        errorCallback( error.responseJSON );
                    }
                } else {
                    that.onSuccessRequest( resultCallback ).apply( that, arguments );
                }
            } )
        } );
    },

    /**
     *
     * @param requestUri
     * @param requestData
     * @param successCallback
     * @param errorCallback
     */
    sendPostRequestForServiceResult: function( requestUri, requestData, successCallback, errorCallback ) {
        var resultCallback = function() {
            var args = _.toArray( arguments ),
                serviceResult = args[ 0 ];

            if( serviceResult[ 'Success' ] ) {
                args[ 0 ] = serviceResult[ 'Result' ];

                if( typeof successCallback === 'function' ) {
                    successCallback.apply( this, args );
                }
            } else {
                args[ 0 ] = serviceResult[ 'Error' ];

                if( typeof errorCallback === 'function' ) {
                    errorCallback.apply( this, args );
                }
            }
        };

        this.sendPostRequest( requestUri, requestData, resultCallback, errorCallback );
    },

    /**
     *
     * @param handler
     */
    onActiveRoleChanged: function( handler ) {
        this.handlers.onActiveRoleChanged.add( handler );
    },

    /**
     *
     * @param handler
     */
    onSignInInternal: function( handler ) {
        this.handlers.onSignInInternal.add( handler );
    },

    /**
     *
     * @param handler
     */
    onSignOut: function( handler ) {
        this.handlers.onSignOut.add( handler );
    }
} );

_.extend( AuthenticationProvider.prototype, ajaxRequestMixin );

InfinniUI.global.session = new AuthenticationProvider( InfinniUI.config.serverUrl );
