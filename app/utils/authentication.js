jQuery(document).ready(function () {
    if( InfinniUI.config.enableGetCurrentUser ) {
        InfinniUI.user = {
            onReadyDeferred: $.Deferred(),
            onReady: function(handler){
                this.onReadyDeferred.done(handler);
            }
        };

        refreshUserInfo();
    }
});

function refreshUserInfo() {
    var authProvider = new AuthenticationProvider(InfinniUI.config.serverUrl);
    authProvider.getCurrentUser(
        function (result) {
            InfinniUI.user.onReadyDeferred.resolve(result);
        },
        function (error) {
            InfinniUI.user.onReadyDeferred.resolve(null);
        }
    );
}