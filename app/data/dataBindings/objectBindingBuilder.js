function ObjectBindingBuilder(){

    this.build = function(builder,parent,metadata){

        return new ObjectBinding(parent, metadata.Value);
    }

}