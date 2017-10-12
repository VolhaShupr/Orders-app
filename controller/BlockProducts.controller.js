(function () {
    'use strict';
    jQuery.sap.declare({modName: "Olga.Shupranova.app.controller.BlockProducts", "type": "controller"});

    sap.ui.core.mvc.Controller.extend("Olga.Shupranova.app.controller.BlockProducts", {
        onInnerProductDetailsPress: function (oEvent) {
            console.log(oEvent);
            var oSource = oEvent.getSource();
            var oCtx = oSource.getBindingContext("odata");
            var productId = oCtx.getObject('id');
            this.oParentBlock.fireDummy({prodId: productId});
        }
    });
}());