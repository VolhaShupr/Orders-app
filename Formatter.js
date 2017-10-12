sap.ui.define(function() {
    "use strict";

    var Formatter = {
        dateFormatter: function(date) {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                pattern: "MMM d, yyyy"
            });
            var formatDate = oDateFormat.format(new Date(date));
            if (formatDate) {
                return formatDate;
            }
            return date;
        },
        orderHeaderFormatter: function(order, date) {
            return "Order (" + order + "), from " + Formatter.dateFormatter(date);
        }
    };

    return Formatter;

}, true);