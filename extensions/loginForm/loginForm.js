function LoginForm(context, args) {

    var EVENT_NAME_LOGIN = 'SignIn';
    var exchange = context.messageBus;
    var template = InfinniUI.Template["extensions/loginForm/template/loginForm.tpl.html"];
    var uid = guid();
    var username = 'Электронная почта';
    var password = 'Пароль';
    var submit = 'Войти';

    var $form;
    this.render = render;

    function render() {

        var html = template({
            uid: uid,
            username: username,
            password: password,
            submit: submit
        });

        $form = $(html);

        args.$el.append($form);

        initFormEventsHandler();

    }

    function initFormEventsHandler() {
        $("button[type=submit]", $form).on('click', onSubmitHandler);
    }

    function onSubmitHandler() {
        var username = $("input[type=text]", $form).val();
        var password = $("input[type=password]", $form).val();

        exchange.send(EVENT_NAME_LOGIN, {value: {username: username, password: password}});
    }
}
