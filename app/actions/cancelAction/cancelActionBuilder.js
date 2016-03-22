function CancelActionBuilder() {
    this.build = function (context, args) {
        return new CancelAction(args.parentView);
    }
}