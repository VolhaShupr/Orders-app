(function () {
    'use strict';
    jQuery.sap.declare({modName: "Olga.Shupranova.app.controller.BlockProducts", "type": "controller"});

    sap.ui.core.mvc.Controller.extend("Olga.Shupranova.app.controller.BlockProducts", {
        onInnerProductDetailsPress: function (oEvent) {
            var sId = 'ProductDetails';
            var oCtx = oEvent.getSource().getBindingContext("odata");
            var productId = oCtx.getObject('id');
            this.oParentBlock.fireDummy({
                sEventId: sId,
                prodId: productId
                });
        },

        onInnerAddProductPress: function (oEvent) {
            var sId = 'AddProduct';
            this.oParentBlock.fireDummy({
                sEventId: sId
            });

        },

        onInnerDeleteProductPress: function (oEvent) {
            var sId = 'DeleteProduct';
            this.oParentBlock.fireDummy({
                sEventId: sId
            });

        }
    });
}());