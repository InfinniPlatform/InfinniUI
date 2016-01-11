/**
  * Провайдер аутентификации.
  *
  * @constructor
  */
function AuthenticationProvider(baseAddress) {
    this.baseAddress = baseAddress;
}


_.extend(AuthenticationProvider.prototype, {
    handlers: {
        onActiveRoleChanged: $.Callbacks(),
        onSignInInternal: $.Callbacks(),
        onSignOut: $.Callbacks()
    },

    /**
     * Возвращает информацию о текущем пользователе.
     *
     * @public
     */
    getCurrentUser: function(resultCallback, errorCallback) {
        this.sendGetRequest('/Auth/GetCurrentUser', resultCallback, errorCallback);
    },

    /**
     * Изменяет пароль текущего пользователя.
     *
     * @public
     */
    changePassword: function (oldPassword, newPassword, resultCallback, errorCallback) {
        var changePasswordForm = {
            OldPassword: oldPassword,
            NewPassword: newPassword
        };

        this.sendPostRequest('/Auth/ChangePassword', changePasswordForm, resultCallback, errorCallback);
    },

    /**
     * Изменяет персональную информацию текущего пользователя.
     *
     * @public
     */
    changeProfile: function (displayName, description, resultCallback, errorCallback) {
        var changeProfileForm = {
            DisplayName: displayName,
            Description: description
        };

        this.sendPostRequest('/Auth/ChangeProfile', changeProfileForm, resultCallback, errorCallback);
    },

    /**
     * Изменяет активную роль текущего пользователя.
     *
     * @public
     */
    changeActiveRole: function (activeRole, resultCallback, errorCallback) {
        var changeActiveRoleForm = {
            ActiveRole: activeRole
        };

        this.sendPostRequest('/Auth/ChangeActiveRole', changeActiveRoleForm, function(){
            var args = _.toArray(arguments);
            args.push(activeRole);
            if(resultCallback){
                resultCallback.apply(this, args);
            }

            this.handlers.onActiveRoleChanged.fire.apply(this.handlers.onActiveRoleChanged, args);
            var exchange = messageBus.getExchange('global');
            exchange.send('OnActiveRoleChanged', {value: args});
        }, errorCallback);
    },

    /**
     * Осуществляет вход пользователя в систему через внутренний провайдер.
     *
     * @public
     */
    signInInternal: function (userName, password, remember, resultCallback, errorCallback) {
        var signInInternalForm = {
            UserName: userName,
            Password: password,
            Remember: remember
        };

        this.sendPostRequest('/Auth/SignInInternal', signInInternalForm, resultCallback, errorCallback);
    },

    /**
     * Возвращает форму входа пользователя в систему через внешний провайдер.
     *
     * @public
     */
    getSignInExternalForm: function (successUrl, failureUrl, resultCallback, errorCallback) {
        this.getExternalLoginForm('/Auth/SignInExternal', successUrl, failureUrl, resultCallback, errorCallback);
    },

    /**
     * Возвращает форму добавления текущему пользователю имени входа у внешнего провайдера.
     *
     * @public
     */
    getLinkExternalLoginForm: function (successUrl, failureUrl, resultCallback, errorCallback) {
        this.getExternalLoginForm('/Auth/LinkExternalLogin', successUrl, failureUrl, resultCallback, errorCallback);
    },

    /**
     * Удаляет у текущего пользователя имя входа у внешнего провайдера.
     *
     * @public
     */
    unlinkExternalLogin: function (provider, providerKey, resultCallback, errorCallback) {
        var unlinkExternalLoginForm = {
            Provider: provider,
            ProviderKey: providerKey
        };

        this.sendPostRequest('/Auth/UnlinkExternalLogin', unlinkExternalLoginForm, resultCallback, errorCallback);
    },

    addClaim: function(userName, claimName, claimValue, resultCallback, errorCallback) {
        var claim = {
            "id" : null,
            "changesObject" : {
                "UserName" : userName,
                "ClaimType": claimName,
                "ClaimValue": claimValue
            },
            "replace" : false
        };

        this.sendPostRequest('/SystemConfig/StandardApi/authorization/setsessiondata', claim, resultCallback, errorCallback);
    },

    setSessionData: function(claimType, claimValue, resultCallback, errorCallback) {
        var claim = {
            "id" : null,
            "changesObject" : {                
                "ClaimType": claimType,
                "ClaimValue": claimValue
            },
            "replace" : false
        };

        this.sendPostRequest('/SystemConfig/StandardApi/authorization/setsessiondata', claim, resultCallback, errorCallback);
    },

    getSessionData: function(claimType, resultCallback, errorCallback) {
        var claim = {
            "id" : null,
            "changesObject" : {                
                "ClaimType": claimType,                
            },
            "replace" : false
        };

        this.sendPostRequest('/SystemConfig/StandardApi/authorization/getsessiondata', claim, resultCallback, errorCallback);
    },

    /**
     * Выход пользователя из системы.
     *
     * @public
     */
    signOut: function (resultCallback, errorCallback) {
        var signOutInternalForm = {
            "id" : null,
            "changesObject" : {},
            "replace" : false
        };
        
        this.sendPostRequest('/Auth/SignOut', null, function(){
            var args = _.toArray(arguments);
            if(resultCallback){
                resultCallback.apply(this, args);
            }

            this.handlers.onSignOut.fire.apply(this.handlers.onSignOut, args);
            var exchange = messageBus.getExchange('global');
            exchange.send('OnSignOut', {value: args});
        }.bind(this), errorCallback);
    },

    getExternalLoginForm: function (requestUri, successUrl, failureUrl, resultCallback, errorCallback) {
        var url = this.baseAddress + requestUri;
        this.sendGetRequest('/Auth/GetExternalProviders',
            function (result) {
                var formElement = $(document.createElement('form'));
                formElement.attr('method', 'POST');
                formElement.attr('action', url);

                var successUrlElement = $(document.createElement('input'));
                successUrlElement.attr('type', 'hidden');
                successUrlElement.attr('name', 'SuccessUrl');
                successUrlElement.attr('value', successUrl);
                formElement.append(successUrlElement);

                var failureUrlElement = $(document.createElement('input'));
                failureUrlElement.attr('type', 'hidden');
                failureUrlElement.attr('name', 'FailureUrl');
                failureUrlElement.attr('value', failureUrl);
                formElement.append(failureUrlElement);

                if (result !== null && result !== undefined) {
                    for (var i = 0; i < result.length; ++i) {
                        var providerInfo = result[i];
                        var providerType = providerInfo.Type;
                        var providerName = providerInfo.Name;

                        var loginButton = $(document.createElement('button'));
                        loginButton.attr('type', 'submit');
                        loginButton.attr('name', 'Provider');
                        loginButton.attr('value', providerType);
                        loginButton.text(providerName);
                        formElement.append(loginButton);
                    }
                }

                resultCallback(formElement);
            },
            errorCallback
        );
    },

    sendGetRequest: function (requestUri, resultCallback, errorCallback) {
        $.ajax(this.baseAddress + requestUri, {
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if(resultCallback) {
                    resultCallback(data);
                }
            },
            error: function (error) {
                if(errorCallback) {
                    errorCallback(error.responseJSON);
                }
            }
        });
    },

    sendPostRequest: function (requestUri, requestData, resultCallback, errorCallback) {
        if (requestData !== null) {
            requestData = JSON.stringify(requestData);
        }
        $.ajax(this.baseAddress + requestUri, {
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: requestData,
            contentType: 'application/json',
            success: function (data) {
                if(resultCallback) {
                    resultCallback(data);
                }
            },
            error: function (error) {
                if(errorCallback) {
                    errorCallback(error.responseJSON);
                }
            }
        });
    },

    onActiveRoleChanged: function(handler){
        this.handlers.onActiveRoleChanged.add(handler);
    },

    onSignInInternal: function(handler){
        this.handlers.onSignInInternal.add(handler);
    },

    onSignOut: function(handler){
        this.handlers.onSignOut.add(handler);
    }
});