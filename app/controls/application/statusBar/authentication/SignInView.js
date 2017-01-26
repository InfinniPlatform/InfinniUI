jQuery(document).ready(function () {
    if( InfinniUI.config.disableSignInExternalForm !== false ) {
        getSignInExternalForm();
    }
});

function signInInternal(self) {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);
    authProvider.signInInternal(
        $('#userName').val(),
        $('#password').val(),
        $('#remember').is(':checked'),
        function (result) {


            window.getCurrentUserName = function(){
                return result.UserName;
            };

            self.model.set('result', result);
            self.$modal.modal('hide');
            location.reload();
        },
        function (error) {
            if(error.Error.indexOf('Invalid username or password') > -1){
                toastr.error('Неверный логин или пароль', "Ошибка!");
            }
            showObject('#signInInternalResult', error);
        }
    );
}

function getSignInExternalForm() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);
    authProvider.getSignInExternalForm(
        getAbsoluteUri('/Home/SignInSuccess'),
        getAbsoluteUri('/Home/SignInFailure'),
        function (result) {
            $('#signInExternalForm').append(result);
        },
        function (error) {
            showObject('#signInExternalResult', error);
        }
    );
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
