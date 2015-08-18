function ObjectBindingBuilder(){

    this.build = function (context, args) {

        return new ObjectBinding(args.parent, args.metadata.Value);
    }

}