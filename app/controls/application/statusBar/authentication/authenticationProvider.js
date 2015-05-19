/**
  * Провайдер аутентификации.
  *
  * @constructor
  */
function AuthenticationProvider(baseAddress) {

    /**
          * Возвращает информацию о текущем пользователе.
          *
          * @public
          */
    this.getCurrentUser = function (resultCallback, errorCallback) {
        this.sendGetRequest('/Auth/GetCurrentUser', resultCallback, errorCallback);
    };

    /**
          * Изменяет пароль текущего пользователя.
          *
          * @public
          */
    this.changePassword = function (oldPassword, newPassword, resultCallback, errorCallback) {
        var changePasswordForm = {
            OldPassword: oldPassword,
            NewPassword: newPassword
        };

        this.sendPostRequest('/Auth/ChangePassword', changePasswordForm, resultCallback, errorCallback);
    };

    /**
          * Изменяет персональную информацию текущего пользователя.
          *
          * @public
          */
    this.changeProfile = function (displayName, description, resultCallback, errorCallback) {
        var changeProfileForm = {
            DisplayName: displayName,
            Description: description
        };

        this.sendPostRequest('/Auth/ChangeProfile', changeProfileForm, resultCallback, errorCallback);
    };

    /**
          * Изменяет активную роль текущего пользователя.
          *
          * @public
          */
    this.changeActiveRole = function (activeRole, resultCallback, errorCallback) {
        var changeActiveRoleForm = {
            ActiveRole: activeRole
        };

        this.sendPostRequest('/Auth/ChangeActiveRole', changeActiveRoleForm, resultCallback, errorCallback);
    };

    /**
          * Осуществляет вход пользователя в систему через внутренний провайдер.
          *
          * @public
          */
    this.signInInternal = function (userName, password, remember, resultCallback, errorCallback) {
        var signInInternalForm = {
            "id" : null,
            "changesObject" : {
                "UserName" : userName,
                "Password" : password,
                "Remember" : remember
            },
            "replace" : false
        };

        this.sendPostRequest('/RestfulApi/StandardApi/authorization/signin', signInInternalForm);
        this.sendPostRequest('/Auth/SignInInternal', signInInternalForm.changesObject, resultCallback, errorCallback);
    };

    /**
          * Возвращает форму входа пользователя в систему через внешний провайдер.
          *
          * @public
          */
    this.getSignInExternalForm = function (successUrl, failureUrl, resultCallback, errorCallback) {
        this.getExternalLoginForm('/Auth/SignInExternal', successUrl, failureUrl, resultCallback, errorCallback);
    };

    /**
          * Возвращает форму добавления текущему пользователю имени входа у внешнего провайдера.
          *
          * @public
          */
    this.getLinkExternalLoginForm = function (successUrl, failureUrl, resultCallback, errorCallback) {
        this.getExternalLoginForm('/Auth/LinkExternalLogin', successUrl, failureUrl, resultCallback, errorCallback);
    };

    /**
          * Удаляет у текущего пользователя имя входа у внешнего провайдера.
          *
          * @public
          */
    this.unlinkExternalLogin = function (provider, providerKey, resultCallback, errorCallback) {
        var unlinkExternalLoginForm = {
            Provider: provider,
            ProviderKey: providerKey
        };

        this.sendPostRequest('/Auth/UnlinkExternalLogin', unlinkExternalLoginForm, resultCallback, errorCallback);
    };

    /**
          * Выход пользователя из системы.
          *
          * @public
          */
    this.signOut = function (resultCallback, errorCallback) {
        var signOutInternalForm = {
            "id" : null,
            "changesObject" : {},
            "replace" : false
        };
        this.sendPostRequest('/RestfulApi/StandardApi/authorization/signout', signOutInternalForm);
        this.sendPostRequest('/Auth/SignOut', null, resultCallback, errorCallback);
    };

    this.getExternalLoginForm = function (requestUri, successUrl, failureUrl, resultCallback, errorCallback) {
        this.sendGetRequest('/Auth/GetExternalProviders',
            function (result) {
                var formElement = $(document.createElement('form'));
                formElement.attr('method', 'POST');
                formElement.attr('action', baseAddress + requestUri);

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
    };

    this.sendGetRequest = function (requestUri, resultCallback, errorCallback) {
        $.ajax(baseAddress + requestUri, {
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
    };

    this.sendPostRequest = function (requestUri, requestData, resultCallback, errorCallback) {
        if (requestData !== null) {
            requestData = JSON.stringify(requestData);
        }
        $.ajax(baseAddress + requestUri, {
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
    };
}