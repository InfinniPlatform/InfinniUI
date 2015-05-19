jQuery(document).ready(function () {
    refreshUserInfo();
});

function getUserInfo(self){
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);
    authProvider.getCurrentUser(
        function (result) {
            self.model.set('result', result);
        },
        function (error) {
            showObject('#signInInternalResult', error);
        }
    );
}

function refreshUserInfo() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);
    authProvider.getCurrentUser(
        function (result) {
            setUserInfo(result);
        },
        function (error) {
            showObject('#getCurrentUserResult', error);
        }
    );
}

function changePassword() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);

    authProvider.changePassword(
        $('#oldPassword').val(),
        $('#newPassword').val(),
        function (result) {
            refreshUserInfo();
        },
        function (error) {
            showObject('#changePasswordResult', error);
        }
    );
}

function changeProfile() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);

    authProvider.changeProfile(
        $('#displayName').val(),
        $('#description').val(),
        function (result) {
            refreshUserInfo();
        },
        function (error) {
            showObject('#changeProfileResult', error);
        }
    );
}

function changeActiveRole() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);

    authProvider.changeActiveRole(
        $('#activeRole').val(),
        function (result) {
            refreshUserInfo();
        },
        function (error) {
            showObject('#сhangeActiveRoleResult', error);
        }
    );
}

function getLinkExternalLoginForm() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);

    authProvider.getLinkExternalLoginForm(
        getAbsoluteUri('/Home/SignInSuccess'),
        getAbsoluteUri('/Home/SignInFailure'),
        function (result) {
            $('#linkExternalLoginForm').append(result);
        },
        function (error) {
            showObject('#linkExternalLoginResult', error);
        }
    );
}

function unlinkExternalLogin(provider, providerKey) {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);

    authProvider.unlinkExternalLogin(
        provider,
        providerKey,
        function (result) {
            refreshUserInfo();
        },
        function (error) {
            showObject('#unlinkExternalLoginResult', error);
        }
    );
}

function signOut(self) {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);

    onSuccessSignOut(getHomePageContext());

    authProvider.signOut(
        function (result) {


            window.getCurrentUserName = function(){
                return null;
            };

            //self.model.set('result', result);
            self.model.set('result', null);
            location.reload();
//            window.location = '/Home/SignIn';
        },
        function (error) {
            showObject('#getCurrentUserResult', error.responseJSON);
        }
    );
}

function setUserInfo(userInfo) {
    //showObject('#getCurrentUserResult', userInfo);
    //$('#displayName').val(userInfo.DisplayName);
    //$('#description').val(userInfo.Description);
    //$('#activeRole').val(userInfo.ActiveRole);

    if (userInfo.Logins !== null && userInfo.Logins !== undefined) {
        var externalLogins = $('#externalLogins');

        for (var i = 0; i < userInfo.Logins.length; ++i) {
            var loginInfo = userInfo.Logins[i];
            var provider = loginInfo.Provider;
            var providerKey = loginInfo.ProviderKey;

            var unlinkButton = $(document.createElement('input'));
            unlinkButton.attr('type', 'button');
            unlinkButton.attr('value', provider);
            unlinkButton.attr('onclick', 'unlinkExternalLogin(\'' + provider + '\', \'' + providerKey + '\')');
            externalLogins.append(unlinkButton);
        }
    }
    getLinkExternalLoginForm();
}

function getAbsoluteUri(relativeUri) {
    return location.protocol + '//' + location.host + relativeUri;
}

function showObject(element, object) {
    var text = formatObject(object);
    $(element).text(text);
}

function formatObject(object) {
    return JSON.stringify(object, null, 4);
}