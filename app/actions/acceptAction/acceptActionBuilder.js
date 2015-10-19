function AcceptActionBuilder() {
    this.build = function (context, args) {
        return new AcceptAction(args.parentView);
    }
}