var MessageBox = Backbone.View.extend({
    tagName: 'div',

    className: 'modal hide fade messagebox',

    events: {
        'click .btn': 'btnHandler'
    },

    template: _.template(
            ' <div class="modal-dialog">' +
            '  <div class="modal-content">' +
            '   <div class="modal-body">' +
            '       <p>' +
            '           <i class="fa-lg fa fa-warning" style="color: <%= color %>"></i>' +
            '           <%= text %>' +
            '       </p>' +
            '   </div>' +
            '   <div class="modal-footer">' +
            '       <% _.each( buttons, function(button, i){ %>' +
            '           <% if (i==0){%> <a href="javascript:;" tabindex="0" class="btn firstfocuselementinmodal <%= button.classes %> <%= button.type %>-modal" data-index="<%= i %>"><%= button.name %></a>' +
            '           <% }else{ %> <a href="javascript:;" class="btn <%= button.classes %> <%= button.type %>-modal" data-index="<%= i %>"><%= button.name %></a>'+
            '       <% }}); %>' +
            '   </div>' +
            '  </div>' +
            ' </div>'
    ),

    initialize: function (options) {
        this.options = options;

        this.addButtonClasses();
        this.addColor();

        this.render();

        this.$el
            .modal({show: true})
            .removeClass('hide')
            .css({
                top: '25%'
            });
    },

    render: function () {
        var $parent = this.options.$parent || $('body');

        this.$el
            .html($(this.template(this.options)));


        //FOCUS IN MODAL WITHOUT FALL

        var self = this;
        var $container = this.$el.find('.modal-footer');

        this.$el.on('shown.bs.modal', function (e) {
            $(e.target).find('.firstfocuselementinmodal').focus();
        });

        $container.append('<div class="lastfocuselementinmodal" tabindex="0">');
        this.$el.find('.lastfocuselementinmodal').on('focusin', function(){
            self.$el.find('.firstfocuselementinmodal').focus();
        });
        this.$el.on('keydown', function(e){
            if($(document.activeElement).hasClass('lastfocuselementinmodal') && (e.which || e.keyCode) == 9){
                e.preventDefault();
                self.$el.find('.firstfocuselementinmodal').focus();
            }

            if($(document.activeElement).hasClass('firstfocuselementinmodal') && (e.which || e.keyCode) == 9 && e.shiftKey){
                e.preventDefault();
                self.$el.find('.lastfocuselementinmodal').focus();
            }
        });
        //

        $parent
            .append(this.$el);

        return this;
    },

    addColor: function(){
        if(this.options.type){
            if(this.options.type == 'error'){
                this.options.color = '#E74C3C;';
            }
            if(this.options.type == 'warning'){
                this.options.color = '#F1C40F;';
            }
        }else{
            this.options.color = '#2ECC71;';
        }
    },

    addButtonClasses: function(){

        var button;

        for(var k in this.options.buttons){
            button = this.options.buttons[k];

            if(button.type){
                if(button.type == 'action'){
                    button.classes = 'blue';
                }
            }else{
                button.classes = 'default';
            }
        }

    },

    btnHandler: function (e) {
        var $el = $(e.target),
            i = parseInt( $el.data('index') ),
            handler = this.options.buttons[i].onClick;

        if(handler){
            handler.apply(this);
        }

        this.closeAndRemove();
    },

    closeAndRemove: function () {
        if (this.options.onClose) {
            this.options.onClose();
        }

        this.$el.modal('hide');
    }
});

/*new MessageBox({
    type: 'error',
    text:'asdasd',
    buttons:[
        {
            name:'Ok',
            onClick: function(){
                alert('ckicked');
            }
        },
        {
            name:'Error btn',
            type: 'action',
            onClick: function(){
                alert('error ckicked');
            }
        }
    ]
});*/