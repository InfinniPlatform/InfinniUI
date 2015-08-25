function ObjectBindingBuilder(){

    this.build = function (context, args) {

        return new ObjectBinding(args.view, args.metadata.Value);
    }

}