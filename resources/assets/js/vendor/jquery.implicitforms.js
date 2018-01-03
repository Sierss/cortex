(function () {

    let implicitForms = (function () {

        return {
            initialize: function () {
                this.methodLinks = $('a[data-method]');
                this.registerEvents();
            },

            registerEvents: function () {
                this.methodLinks.on('click', this.handleMethod);
            },

            handleMethod: function (e) {
                let form;
                let link = $(this);
                let httpMethod = link.data('method').toUpperCase();

                // Ignore if the data-method attribute is not PUT, POST, or DELETE,
                if ($.inArray(httpMethod, ['PUT', 'DELETE', 'POST']) === - 1) {
                    return;
                }

                // Allow user to optionally provide data-confirm="Are you sure?"
                if (link.data('confirm')) {
                    if (! implicitForms.verifyConfirm(link)) {
                        return false;
                    }
                }

                form = implicitForms.createForm(link);
                form.submit();
                e.preventDefault();
            },

            verifyConfirm: function (link) {
                return confirm(link.data('confirm'));
            },

            createForm: function (link) {
                let form = $('<form>', {'method': 'POST', 'action': link.attr('href')});
                let _token = $('<input>', {'type': 'hidden', 'name': '_token', 'value': link.data('token')});
                let _method = $('<input>', {'name': '_method', 'type': 'hidden', 'value': link.data('method')});

                return form.append(_token, _method)
                           .appendTo('body');
            }
        };
    }).call(this);

    /**
     * Expose the class either via AMD, CommonJS or the global object
     */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return implicitForms;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = implicitForms;
    }
    else {
        window.routes = implicitForms;
    }

}).call(this);