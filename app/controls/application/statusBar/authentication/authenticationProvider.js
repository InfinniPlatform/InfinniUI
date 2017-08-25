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
        this.sendPostRequestForServiceResult('/Auth/GetCurrentUser', {}, resultCallback, errorCallback);
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

        this.sendPostRequestForServiceResult('/Auth/ChangePassword', changePasswordForm, resultCallback, errorCallback);
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

        this.sendPostRequestForServiceResult('/Auth/ChangeProfile', changeProfileForm, resultCallback, errorCallback);
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

        this.sendPostRequestForServiceResult('/Auth/ChangeActiveRole', changeActiveRoleForm, function(){
            var args = _.toArray(arguments);
            args.push(activeRole);
            if(resultCallback){
                resultCallback.apply(this, args);
            }

            this.handlers.onActiveRoleChanged.fire.apply(this.handlers.onActiveRoleChanged, args);
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

        this.sendPostRequestForServiceResult('/Auth/SignInInternal', signInInternalForm, resultCallback, errorCallback);
    },

    /**
     * Осуществляет вход пользователя в систему по любому идентификатору
     *
     * @param {string} userKey - идентификатор (id, имя пользователя, email, номер телефона)
     * @param {string} password - пароль
     * @param {string} remember - запомнить
     * @param {function} resultCallback - при успешном результате
     * @param {function} errorCallback - при неудачном результате
     */
    signIn: function(userKey, password, remember, resultCallback, errorCallback) {
        var signInForm = {
            UserKey: userKey,
            Password: password,
            Remember: remember
        };

        this.sendPostRequest('/Auth/SignIn', signInForm, resultCallback, errorCallback);
    },

    /**
     * Осуществляет вход пользователя в систему Id
     *
     * @param {string} userId - идентификатор пользователя
     * @param {string} password - пароль
     * @param {string} remember - запомнить
     * @param {function} resultCallback - при успешном результате
     * @param {function} errorCallback - при неудачном результате
     */
    signInById: function(userId, password, remember, resultCallback, errorCallback) {
        var signInForm = {
            Id: userId,
            Password: password,
            Remember: remember
        };

        this.sendPostRequest('/Auth/SignInById', signInForm, resultCallback, errorCallback);
    },

    /**
     * Осуществляет вход пользователя в систему по имени
     *
     * @param {string] userName - имя пользователя
     * @param {string} password - пароль
     * @param {string} remember - запомнить
     * @param {function} resultCallback - при успешном результате
     * @param {function} errorCallback - при неудачном результате
     */
    signInByUserName: function(userName, password, remember, resultCallback, errorCallback) {
        var signInForm = {
            UserName: userName,
            Password: password,
            Remember: remember
        };

        this.sendPostRequest('/Auth/SignInByUserName', signInForm, resultCallback, errorCallback);
    },

    /**
     * Осуществляет вход пользователя в систему по электронной почте
     *
     * @param {string} email - электронная почта
     * @param {string} password - пароль
     * @param {string} remember - запомнить
     * @param {function} resultCallback - при успешном результате
     * @param {function} errorCallback - при неудачном результате
     */
    signInByEmail: function(email, password, remember, resultCallback, errorCallback) {
        var signInForm = {
            Email: email,
            Password: password,
            Remember: remember
        };

        this.sendPostRequest('/Auth/SignInByEmail', signInForm, resultCallback, errorCallback);
    },

    /**
     * Осуществляет вход пользователя в систему по номеру телефона
     *
     * @param {string} phoneNumber - номер телефона
     * @param {string} password - пароль
     * @param {string} remember - запомнить
     * @param {function} resultCallback - при успешном результате
     * @param {function} errorCallback - при неудачном результате
     */
    signInByPhoneNumber: function(phoneNumber, password, remember, resultCallback, errorCallback) {
        var signInForm = {
            PhoneNumber: phoneNumber,
            Password: password,
            Remember: remember
        };

        this.sendPostRequest('/Auth/SignInByPhoneNumber', signInForm, resultCallback, errorCallback);
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

        this.sendPostRequestForServiceResult('/Auth/SignOut', null, function(){
            InfinniUI.user.onReadyDeferred = $.Deferred();
            InfinniUI.user.onReadyDeferred.resolve(null);

            var args = _.toArray(arguments);
            if(resultCallback){
                resultCallback.apply(this, args);
            }

            this.handlers.onSignOut.fire.apply(this.handlers.onSignOut, args);

        }.bind(this), errorCallback);
    },

    getExternalLoginForm: function (requestUri, successUrl, failureUrl, resultCallback, errorCallback) {
        var url = this.baseAddress + requestUri;
        this.sendPostRequest('/Auth/GetExternalProviders', {},
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
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest(resultCallback),
            error: this.onErrorRequest(function (error) {
                if(errorCallback) {
                    errorCallback(error.responseJSON);
                }
            })
        });
    },

    sendPostRequest: function (requestUri, requestData, resultCallback, errorCallback) {
        var that = this;

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
            beforeSend: this.onBeforeRequest(),
            success: this.onSuccessRequest(resultCallback),
            error: this.onErrorRequest(function (error) {
                if(error.status != 200) {
                    if(errorCallback) {
                        errorCallback(error.responseJSON);
                    }
                } else {
                    that.onSuccessRequest(resultCallback).apply(that, arguments);
                }
            })
        });
    },

    sendPostRequestForServiceResult: function (requestUri, requestData, successCallback, errorCallback) {
        var resultCallback = function(){
            var args = _.toArray(arguments),
                serviceResult = args[0];

            if(serviceResult['Success']){
                args[0] = serviceResult['Result'];

                if( _.isFunction(successCallback) ){
                    successCallback.apply(this, args);
                }
            } else {
                args[0] = serviceResult['Error'];

                if( _.isFunction(errorCallback) ){
                    errorCallback.apply(this, args);
                }
            }
        };

        this.sendPostRequest(requestUri, requestData, resultCallback, errorCallback);
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

_.extend(AuthenticationProvider.prototype, ajaxRequestMixin);

InfinniUI.global.session = new AuthenticationProvider(InfinniUI.config.serverUrl);