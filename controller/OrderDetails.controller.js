sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'Olga/Shupranova/app/Formatter'
    ], function (Controller, History) {
        "use strict";

        return Controller.extend("Olga.Shupranova.app.controller.OrderDetails", {
            onInit: function () {
                var oComponent = this.getOwnerComponent();
                var oRouter = oComponent.getRouter();
                oRouter.getRoute("OrderDetails").attachPatternMatched(this.onPatternMatched, this);
            },
            onPatternMatched: function (oEvent) {
                var that = this;
                var mRouteArguments = oEvent.getParameter("arguments");
                var sOrderID = mRouteArguments.OrderId;
                var oODataModel = this.getView().getModel("odata");
                oODataModel.metadataLoaded().then(function () {
                    var sKey = oODataModel.createKey("/Orders", {id: sOrderID});
                    that.getView().bindObject({
                        path: sKey,
                        model: "odata"
                    });
                });
            },
            onProductDetailsPress: function (oEvent) {
                var productId = oEvent.getParameters()['prodId'];
                console.log(productId);
                var oComponent = this.getOwnerComponent();
                oComponent.getRouter().navTo("ProductDetails", {
                    ProductId: productId
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