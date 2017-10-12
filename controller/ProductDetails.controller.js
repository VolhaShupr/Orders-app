sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ], function (Controller, History) {
        "use strict";

        return Controller.extend("Olga.Shupranova.app.controller.ProductDetails", {
            onInit: function () {
                var oComponent = this.getOwnerComponent();
                var oRouter = oComponent.getRouter();
                oRouter.getRoute("ProductDetails").attachPatternMatched(this.onPatternMatched, this);
            },
            onPatternMatched: function (oEvent) {
                var that = this;
                var mRouteArguments = oEvent.getParameter("arguments");
                var sProductID = mRouteArguments.ProductId;
                var oODataModel = this.getView().getModel("odata");
                oODataModel.metadataLoaded().then(function () {
                    var sKey = oODataModel.createKey("/OrderProducts", {id: sProductID});
                    that.getView().bindObject({
                        path: sKey,
                        model: "odata"
                    });
                });
            },
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("OrdersOverview", {}, true);
                }
            }
        });
    }
);