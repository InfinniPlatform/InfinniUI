function Action() {
    var action;

    this.setAction = function (actionFunc) {
        action = actionFunc;
    };

    this.getAction = function () {
        return action;
    };

    this.execute = function (callback) {
        if(action == undefined){
            logger.error('Action: action is undefined');
            return;
        }

        action(callback);
    };
}
