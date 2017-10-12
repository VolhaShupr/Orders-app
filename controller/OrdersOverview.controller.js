sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'Olga/Shupranova/app/Formatter'
	], function (Controller, Formatter) {
		"use strict";

		return Controller.extend("Olga.Shupranova.app.controller.OrdersOverview", {
            onOrderDetailsPress: function (oEvent) {
                var oSource = oEvent.getSource();
                var oCtx = oSource.getBindingContext("odata");
                var oComponent = this.getOwnerComponent();
                oComponent.getRouter().navTo("OrderDetails", {
                    OrderId: oCtx.getObject("id")
				});
            }
		});
	}
);
