(function (window, document, $) {
    'use strict';

    var DATA_NAME_ATTRIBUTE = 'data-pl-name';
    var DATA_NAME_SELECTOR = '[' + DATA_NAME_ATTRIBUTE + ']:first';

    var location = window.location;
    if (location.hash !== '#test') {
        return;
    }

    $(function () {
        var info = new InfoElement();

        $(document).on('mousemove', function (event) {
            info.setElement(event.target);
        });

        setInterval(500, function () {
            info.updatePosition();
        });

    });


    /*************************************/

    function InfoElement() {
        this.popup = new Popup();
        this.marker = new Marker();
        this.currentElement = null;
    }

    InfoElement.prototype.setElement = function (el) {
        var
            $el = $(el),
            name = getName($el);

        if (!name) {
            $el = $el.parents(DATA_NAME_SELECTOR);
            if ($el.length) {
                name = getName($el);
            }
        }

        if ($el && name) {
            this.showInfo($el, name);
        } else {
            this.hideInfo();
        }

        function getName($el) {
            return $el.attr(DATA_NAME_ATTRIBUTE);
        }
    };

    InfoElement.prototype.showInfo = function ($el, name) {
        var el = $el[0];
        if (this.currentElement !== el) {
            this.marker
                .reset(this.$currentElement)
                .highlight($el);

            this.currentElement = el;
            this.$currentElement = $el;
            console.log(name);
        }
        var position = $el.offset();
        var scrollLeft = $(document).scrollLeft();
        var scrollTop = $(document).scrollTop();
        this.popup
            .setText(name)
            .setPosition(position.left - scrollLeft, position.top - scrollTop)
            .show();
    };

    InfoElement.prototype.updatePosition = function () {
        var $el = this.$currentElement;

        if (!$el) {
            return;
        }

        var position = $el.offset();
        var scrollLeft = $(document).scrollLeft();
        var scrollTop = $(document).scrollTop();
        this.popup
            .setPosition(position.left - scrollLeft, position.top - scrollTop);
    };

    InfoElement.prototype.hideInfo = function () {
        this.marker
            .reset(this.$currentElement);

        this.popup.hide();
    };

    /************************************************/

    function Popup() {
        this.id = 'pl-test-mode-popup';
        this.$el = $('<div id="' + this.id +'" style="position:absolute; border: 2px solid red;background: #000000;color: #ffffff;display:none;z-index:99999;"></div>');
    }

    Popup.prototype.render = function () {
        $('body').append(this.$el);
    };

    Popup.prototype.checkDOM = function () {
        if ($("#" + this.id).length === 0) {
            this.render();
        }
    };


    Popup.prototype.hide = function () {
        var $el = this.$el;
        $el.css('display', 'none');
    };

    Popup.prototype.setText = function (text) {
        var $el = this.$el;
        $el.text(text);
        return this;
    };

    Popup.prototype.show = function () {
        this.checkDOM();
        var $el = this.$el;
        $el.css({
            display: 'inline-block'
        });

        return this;
    };

    Popup.prototype.setPosition = function (x, y) {
        var $el = this.$el;
        $el.css({
            top: y,
            left: x
        });

        return this;
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

