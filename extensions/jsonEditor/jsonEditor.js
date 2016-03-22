function JsonEditor(context, args) {
    this.template = InfinniUI.Template["extensions/jsonEditor/template/jsonEditor.tpl.html"];
    this.target = args.$el;

    this.editor;

    this.templateJSON = {
        Company: "Infinnity Solutions",
        Address: {
            Country: "Russia",
            City: "Chelyabinsk",
            Town: "North",
            House: "52/2"
        },
        Departaments: [
            "Mountain View",
            "Cupertino"
        ]
    };

    this.render = function () {
        var $form = $(this.template());

        this.editor = new JSONEditor($form.get(0));
        this.editor.set(this.templateJSON);

        this.target.append($form);

        var $buttonGet = $('<button>Get json</button>');
        var that = this;

        $buttonGet.click(function () {
            alert(JSON.stringify(that.editor.get()));
        });

        this.target.append($buttonGet);
    };
}
