(function () {
    'use strict';
    jQuery.sap.declare({modName: "Olga.Shupranova.app.controller.CustomerInfo", "type": "controller"});

    sap.ui.core.mvc.Controller.extend("Olga.Shupranova.app.controller.CustomerInfo", {
        onInnerCustomerEditPress: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("odata");
            this.oParentBlock.fireDummy({context: oCtx});
        }
    });
}());