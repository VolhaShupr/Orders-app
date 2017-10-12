sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		return Controller.extend("Olga.Shupranova.app.controller.OrdersOverview", {
            onOrderDetailsPress: function (oEvent) {
                //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //oRouter.navTo("OrderDetails");
                var oComponent = this.getOwnerComponent();
                oComponent.getRouter().navTo("OrderDetails");
            }

		});
	}
);
