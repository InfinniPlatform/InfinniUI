(function (window, document, $) {
    'use strict';

    var DATA_NAME_ATTRIBUTE = 'data-pl-name';
    var DATA_NAME_VIEW_ATTRIBUTE = 'data-pl-name-view';
    var NO_NAME = 'No name';
    var DATA_NAME_SELECTOR = '[' + DATA_NAME_ATTRIBUTE + ']:first';
    var DATA_NAME_VIEW_SELECTOR = '[' + DATA_NAME_VIEW_ATTRIBUTE + ']:first';

    var location = window.location;
    if (location.hash !== '#test') {
        return;
    }

    $(function () {

        patchBootstrapTooltip();
        var info = new InfoElement();

        $(document).on('mouseover', function (event) {
            info.setElement(event.target);
        });

        function patchBootstrapTooltip() {
            $.fn.tooltip.Constructor.prototype.getTitle = function () {
                var $e = this.$element;
                var o  = this.options;

                return o.title;
            }
        }
    });


    /*************************************/

    function InfoElement() {
        this.marker = new Marker();
        this.$currentControl = null;
    }

    InfoElement.prototype.setElement = function (el) {
        var
            $el = $(el),
            $control = getControl($el),
            name = getName($control),
            viewName = getViewName($control);

        this.hideInfo();
        if ($control) {
            this.showInfo($control, viewName, _.isEmpty(name) ? NO_NAME : name);
        }

        function getControl($el) {
            var $control;

            var name = $el.attr(DATA_NAME_ATTRIBUTE);
            if (typeof name !== 'undefined') {
                $control = $el;
            } else {
                $control = $el.parents(DATA_NAME_SELECTOR);
            }
            return $control;
        }

        function getName($el) {
            if ($el.length) {
                return $el.attr(DATA_NAME_ATTRIBUTE);
            }
        }

        function getViewName($el) {
            var $e = $el.parents(DATA_NAME_VIEW_SELECTOR);
            if($e.length) {
                return $e.attr(DATA_NAME_VIEW_ATTRIBUTE);
            }
        }
    };

    InfoElement.prototype.showInfo = function ($control, viewName, name) {
        if (this.$currentControl && this.$currentControl[0]!== $control[0]) {
            this.marker.reset(this.$currentControl);
        }
        this.marker.highlight($control);

        this.$currentControl = $control;

        $control.tooltip({
            title: viewName + ':' + name,
            placement: "auto"
        })
            .tooltip('show');
    };

    InfoElement.prototype.hideInfo = function () {
        if (this.$currentControl) {
            this.marker
                .reset(this.$currentControl);
            this.$currentControl.tooltip('destroy');
        }
    };



    /********************************************/

    function Marker() {
        this.DATA_NAME = 'data-pl-original-style';

        this.css = {
            'box-shadow': 'inset 0 0 1em #ff0000'
        };
    }

    Marker.prototype.highlight = function ($el) {
        var data;

        if ($el) {
            data = $el.data(this.DATA_NAME);
            if (!data) {
                data = Object.create(null);
                for (var i in this.css) {
                    data[i] = $el.css(i);
                }
                $el.data(this.DATA_NAME, data);
            }
            $el.css(this.css);
        }
        return this;
    };

    Marker.prototype.reset = function ($el) {
        var data;
        if ($el) {
            data = $el.data(this.DATA_NAME);
            $el.data(this.DATA_NAME, null);
            if (data) {
                $el.css(data);
            }
        }
        return this;
    };


})(window, document, jQuery);
