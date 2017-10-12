sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("Olga.Shupranova.app.controller.BlockProducts", {
        /**
         * Open product details page press event handler, send product Id to parent block.
         *
         * @param {sap.ui.base.Event} oEvent event object
         */
        onInnerProductDetailsPress: function (oEvent) {
            var sId = 'ProductDetails';
            var oCtx = oEvent.getSource().getBindingContext("odata");
            var nProductId = oCtx.getObject('id');
            this.oParentBlock.fireInnerPress({
                sEventId: sId,
                prodId: nProductId
            });
        },

        /**
         * "Add product" button press event handler, send information about pressed button to parent block
         */
        onInnerAddProductPress: function () {
            var sId = 'AddProduct';
            this.oParentBlock.fireInnerPress({
                sEventId: sId
            });

        },

        /**
         * "Delete" product button press event handler, send context to parent block.
         *
         * @param {sap.ui.base.Event} oEvent event object
         */
        onInnerDeleteProductPress: function (oEvent) {
            var sId = 'DeleteProduct';
            var oCtx = oEvent.getSource().getBindingContext("odata");
            this.oParentBlock.fireInnerPress({
                sEventId: sId,
                oContext: oCtx
            });
        }
    })
});



