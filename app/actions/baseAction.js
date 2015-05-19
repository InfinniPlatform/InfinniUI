function BaseAction(view) {
    var action;

    this.setAction = function (actionFunc) {
        action = actionFunc;
    };

    this.getAction = function () {
        return action;
    };

    this.execute = function (callback) {
        action(callback);
    };
}