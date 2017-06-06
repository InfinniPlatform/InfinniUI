function LoginForm( context, args ) {
    var EVENT_NAME_LOGIN = 'SignIn';
    var exchange = context.messageBus;
    var template = _.template(
        '<form class="login-form"  method="POST" target="dummy<%-uid%>" action="javascript:;">\
        <div class="login-form__row form-group">\
        <label class="login-form__label" for="username<%-uid%>"><%-username%></label>\
        <input class="login-form__input form-control" type="text" id="username<%-uid%>">\
        </div>\
        <div class="login-form__row form-group">\
        <label class="login-form__label" for="password<%-uid%>"><%-password%></label>\
        <input class="login-form__input form-control" type="password" id="password<%-uid%>">\
        </div>\
        <div class="login-form__row login-form__row--submit form-group">\
        <button class="login-form__submit btn btn-default" id="submit<%-uid%>" type="submit"><%-submit%></button>\
        </div>\
        </form>\
        <iframe style="display: none;" src="javascript:;" name="dummy<%-uid%>"></iframe>');

    var uid = InfinniUI.guid();
    var username = 'Электронная почта';
    var password = 'Пароль';
    var submit = 'Войти';
    var $form;

    this.render = render;

    function render() {
        var html = template( {
            uid: uid,
            username: username,
            password: password,
            submit: submit
        } );

        $form = $( html );
        args.$el.append( $form );

        initFormEventsHandler();
    }

    function initFormEventsHandler() {
        $( 'button[type=submit]', $form ).on( 'click', onSubmitHandler );
    }

    function onSubmitHandler() {
        var username = $( 'input[type=text]', $form ).val();
        var password = $( 'input[type=password]', $form ).val();

        exchange.send( EVENT_NAME_LOGIN, { value: { username: username, password: password } } );
    }
}
