sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    'Olga/Shupranova/app/Formatter'
    ], function (Controller, History, MessageToast, MessageBox) {
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

            onEditPress: function (oEvent) {
                var oCtx = oEvent.getParameters()['context'];
                var oODataModel = oCtx.getModel();

                var sKey = oODataModel.createKey("/Orders", oCtx.getObject());
                var mPayload = jQuery.extend(true, {}, oCtx.getObject());
                var oData = {
                    "summary": mPayload['summary'],
                    "shipTo": mPayload['shipTo'],
                    "customerInfo": mPayload['customerInfo']
                };

                oODataModel.update(sKey, oData, {
                    success: function () {
                        MessageToast.show("Form was successfully updated!");
                    },
                    error: function () {
                        MessageBox.error("Error while updating form!");
                    }
                });
            },

            onAddProductPress: function() {
                console.log('add');
                var oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = sap.ui.xmlfragment(oView.getId(), "Olga.Shupranova.app.view.fragments.ProductDialog", this);
                    oView.addDependent(this.oDialog);
                }
                // set context to the dialog
                this.oDialog.bindObject({
                    path: "/OrderProducts"
                });

                // open the dialog
                this.oDialog.open();
            },

            onCancelDialogPress: function () {
                this.oDialog.close();
            },

            onDeleteProductPress: function() {

            },

            onProductDetailsPress: function (oEvent) {
                var productId = oEvent.getParameters()['prodId'];
                var oComponent = this.getOwnerComponent();
                oComponent.getRouter().navTo("ProductDetails", {
                    ProductId: productId
                });
            },

            productBlockEventsFactory: function (oEvent) {
                var sId = oEvent.getParameters()['sEventId'];
                console.log(sId);
                switch(sId) {
                    case 'ProductDetails': {
                        this.onProductDetailsPress(oEvent);
                        break;
                    }
                    case 'AddProduct': {
                        this.onAddProductPress(oEvent);
                        break;
                    }
                    case 'DeleteProduct': {
                        this.onDeleteProductPress(oEvent);
                        break;
                    }
                }
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