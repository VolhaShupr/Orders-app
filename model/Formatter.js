sap.ui.define(function() {
    "use strict";

    var Formatter = {
        /**
         * Order date formatter. It transforms date to "MMM d, yyyy" format.
         * @param {string} sDate date
         * @returns {string} sDate formatted if it possible date.
         */
        dateFormatter: function(sDate) {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MMM d, yyyy"
            });
            var sFormatDate = oDateFormat.format(new Date(sDate));
            if (sFormatDate) {
                return sFormatDate;
            }
            return sDate;
        },

        /**
         * Concatenate header of order details page
         * @param {string} sOrder order
         * @param {string} sId order id
         * @param {string} sFrom from preposition
         * @param {string} sDate order date
         * @returns {string} formatted header.
         */
        orderHeaderFormatter: function(sOrder, sId, sFrom, sDate) {
            return sOrder + ' (' + sId + '), ' + sFrom + ' ' + Formatter.dateFormatter(sDate);
        }
    };

    return Formatter;

}, true);