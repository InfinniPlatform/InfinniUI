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
        var container = $form.get(0);

        this.editor = new JSONEditor(container);
        this.editor.set(this.templateJSON);

        this.target.append($form);
    };
}
