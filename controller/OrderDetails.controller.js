sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    'Olga/Shupranova/app/model/Formatter'
    ], function (Controller, History, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("Olga.Shupranova.app.controller.OrderDetails", {
            /**
             * Controller's "init" lifecycle method.
             */
            onInit: function () {
                var oComponent = this.getOwnerComponent();
                var oRouter = oComponent.getRouter();
                oRouter.getRoute("OrderDetails").attachPatternMatched(this.onPatternMatched, this);
            },

            /**
             * "OrderDetails" route pattern matched event handler.
             *
             * @param {sap.ui.base.Event} oEvent event object.
             */
            onPatternMatched: function (oEvent) {
                var that = this;
                var mRouteArguments = oEvent.getParameter("arguments");
                var sOrderID = mRouteArguments.OrderId;
                this.sOrderID = sOrderID;
                var oODataModel = this.getView().getModel("odata");
                oODataModel.metadataLoaded().then(function () {
                    var sKey = oODataModel.createKey("/Orders", {id: sOrderID});
                    that.getView().bindObject({
                        path: sKey,
                        model: "odata"
                    });
                });
            },

            /**
             * "Add product" button press event handler.
             */
            onAddProductPress: function() {
                var oView = this.getView();
                var oODataModel = oView.getModel("odata");

                if (!this.oDialog) {
                    this.oDialog = sap.ui.xmlfragment(oView.getId(), "Olga.Shupranova.app.view.fragments.ProductDialog", this);
                    oView.addDependent(this.oDialog);
                }

                var oEntryCtx = oODataModel.createEntry("/OrderProducts", {
                    properties: {
                        orderId: this.sOrderID
                    }
                });

                this.oDialog.setBindingContext(oEntryCtx);
                this.oDialog.setModel(oODataModel);
                this.oDialog.open();
            },

            /**
             * Dialog "Save" button press event handler.
             */
            onSaveDialogPress: function () {
                var oODataModel = this.getView().getModel("odata");
                // inputs validation
                var oForm =this.getView().byId('ProductForm');
                var oContent = oForm.getContent();
                var bValidationError = false;
                for (var i=0; i<oContent.length; i++) {
                    if (oContent[i].getId().indexOf('input') !== -1) {
                        oContent[i].setValueState("None");
                        var oBinding = oContent[i].getBinding('value');
                        var sValue = oContent[i].getValue();
                        try {
                            oBinding.getType().validateValue(sValue);
                        } catch (oException) {
                            if (isNaN(sValue)) {
                                oContent[i].setValueState("Error");
                                bValidationError = true;
                            }
                        }
                    }
                }

                if (!bValidationError) {
                    oODataModel.submitChanges();
                    this.oDialog.close();
                    MessageToast.show("Product was successfully added!")
                } else {
                    MessageToast.show("A validation error has occured. Complete your input first");
                }
            },

            /**
             * "Cancel" button press event handler (in the dialog).
             */
            onCancelDialogPress: function () {
                var oODataModel = this.getView().getModel("odata");
                var oCtx = this.oDialog.getBindingContext();
                oODataModel.deleteCreatedEntry(oCtx);
                this.oDialog.close();
            },

            /**
             * "Delete" supplier button press event handler.
             *
             * @param {sap.ui.base.Event} oEvent event object
             */
            onDeleteProductPress: function(oEvent) {
                var oCtx = oEvent.getParameters()['oContext'];

                var oODataModel = oCtx.getModel();

                var sKey = oODataModel.createKey("/OrderProducts", oCtx.getObject());

                oODataModel.remove(sKey, {
                    success: function () {
                        MessageToast.show("Product was successfully removed!")
                    },
                    error: function () {
                        MessageBox.error("Error while removing product!");
                    }
                });
            },

            /**
             * Open product details page press event handler.
             *
             * @param {sap.ui.base.Event} oEvent event object.
             */
            onProductDetailsPress: function (oEvent) {
                var nProductId = oEvent.getParameters()['prodId'];
                var oComponent = this.getOwnerComponent();
                oComponent.getRouter().navTo("ProductDetails", {
                    ProductId: nProductId
                });
            },

            /**
             * Get the event of inner pressed buttons in Block Product View and depending of it invoke appropriate function
             *
             * @param {sap.ui.base.Event} oEvent event object.
             */
            handleProductBlockEvents: function (oEvent) {
                var sId = oEvent.getParameters()['sEventId'];
                switch(sId) {
                    case 'ProductDetails': {
                        this.onProductDetailsPress(oEvent);
                        break;
                    }
                    case 'AddProduct': {
                        this.onAddProductPress();
                        break;
                    }
                    case 'DeleteProduct': {
                        this.onDeleteProductPress(oEvent);
                        break;
                    }
                }
            },

            /**
             * Go to previous page or if it isn't possible go to the first page
             */
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