var StatusBarControl = function () {
    _.superClass(StatusBarControl, this);
};
_.inherit(StatusBarControl, Control);
_.extend(StatusBarControl.prototype, {
    createControlModel: function () {
        return new StatusBarModel();
    },
    createControlView: function (model) {
        return new StatusBarView({model: model});
    }
});

var StatusBarModel = ControlModel.extend({
    defaults: _.defaults({}, ControlModel.prototype.defaults, {
        time: '',
        date: '',
        result: null
    })
});

var StatusBarView = ControlView.extend({
    className: 'pl-status-bar',

    events: {
        'click .signIn': 'signInHandler',
        'click .signOut': 'signOutHandler',
        'click .status-bar-menu': 'openMenuHandler'
    },

    template: InfinniUI.Template['controls/application/statusBar/template.tpl.html'],
    loginTemplate: InfinniUI.Template['controls/application/statusBar/authentication/loginTemplate.tpl.html'],

    enterTemplate: InfinniUI.Template['controls/application/statusBar/authentication/enterTemplate.tpl.html'],
    successTemplate: InfinniUI.Template['controls/application/statusBar/authentication/successTemplate.tpl.html'],

    initialize: function () {
        var self = this;
        self.model.set('time', moment().format('HH:mm'));
        self.model.set('date', moment().format('D MMMM'));

        window.setInterval(function () {
            self.model.set('time', moment().format('HH:mm'));
            self.model.set('date', moment().format('D MMMM'));
            self.dateRender();
        }, 10 * 1000);

        getUserInfo(this);
        this.listenTo(this.model, 'change:result', this.render);
    },

    dateRender: function () {
        this.$el.find('.time').text(this.model.get('time'));
        this.$el.find('.date').text(this.model.get('date'));
    },

    signInHandler: function () {
        var self = this;
        if (!this.$modal) {
            this.$modal = $(this.loginTemplate({}));
            this.$modal.appendTo('body');
        }

        this.$modal.modal('show');
        this.$modal.on('hidden.bs.modal', function () {
            $(this).find('#password, #userName').val('');
            $(this).find('#remember').attr('checked', false);
        });
        this.$modal.find('.post').on('click', function () {
            signInInternal(self);
        })
    },
    openMenuHandler: function(){
        var menu = $('.app-area').find('.pl-menu');
        var area = menu.closest('.app-area');

        if(menu.length && area.length) {
            if($(area).is(':visible')) {
                area.css({
                    'display': 'none'
                });
            }else{
                area.css({
                    'position': 'absolute',
                    'width': '100%',
                    'display': 'block',
                    'overflow': 'hidden'
                });
            }
        }
    },

    signOutHandler: function () {
        signOut(this);
    },

    render: function () {
        var result = this.model.get('result');
        var header = typeof(launcherConfig) != "undefined" && launcherConfig.header ? launcherConfig.header : '';
        var $wrap = $(this.template({header: header}));
        var $loginTemplate,
            self = this;

        window.adjustLoginResult(result).then(function(r){
            if (result) {
                $loginTemplate = $(self.successTemplate({
                    displayName: r.UserName,
                    activeRole: r.ActiveRole,
                    roles: _.pluck(result.Roles, 'DisplayName').join(', ')
                }));
            } else {
                $loginTemplate = $(self.enterTemplate({}));
            }

            $wrap.find('.page-header-inner').prepend($loginTemplate);
            self.$el
                .empty()
                .append($wrap);
        });

        this.$el.find('.calendar').datepicker({
            todayHighlight: true,
            language: 'ru'
        });

        //~fix DatePicker auto close
        this.$el.find('.dropdown-toggle').on('click.bs.dropdown', function() {
            var clicks = $(this).data('clicks');
            if (clicks) {
                $(this).parent('.dropdown').off('hide.bs.dropdown');
            } else {
                $(this).parent('.dropdown').on('hide.bs.dropdown', function () {return false;});
            }
            $(this).data("clicks", !clicks);
        });

        return this;
    }
});