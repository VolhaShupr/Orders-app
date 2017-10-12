sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "Olga/Shupranova/app/model/Formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
	], function (Controller, Formatter, JSONModel, Filter, FilterOperator, MessageToast, MessageBox) {
		"use strict";
		return Controller.extend("Olga.Shupranova.app.controller.OrdersOverview", {
            /**
             * Controller's "init" lifecycle method.
             */
		    onInit: function() {
                var oOrdersViewModel = new JSONModel({
                    allOrdersCount: 0,
                    pendingCount: 0,
                    acceptedCount: 0
                });
                this.oOrdersViewModel = oOrdersViewModel;
                this.getView().setModel(oOrdersViewModel, "ordersView");
            },

            /**
             * "View" after rendering lifecycle method. (wait until bindings are established)
             */
            onAfterRendering: function () {
		        var that = this;
                var oOrdersTable = this.byId("OrdersTable");
                var oItemsBinding = oOrdersTable.getBinding("items");
                oItemsBinding.attachDataReceived(function (oEvent) {
                    var mData = oEvent.getParameter("data");
                    this.oOrdersViewModel.setProperty("/allOrdersCount", mData.__count);
                    var oODataModel = this.getView().getModel("odata");
                    oODataModel.read("/Orders/$count", {
                        success: function(nCount){
                            that.oOrdersViewModel.setProperty("/pendingCount", nCount);
                        },
                        filters: [new Filter("summary/status", FilterOperator.EQ, "'Pending'")]
                    });
                    oODataModel.read("/Orders/$count", {
                        success: function(nCount){
                            that.oOrdersViewModel.setProperty("/acceptedCount", nCount);
                        },
                        filters: [new Filter("summary/status", FilterOperator.EQ, "'Accepted'")]
                    });
                }, this);
            },

            /**
             * "Filter" event handler of the IconTabBar.
             *
             * @param {sap.ui.base.Event} oEvent event object.
             */
            onFilterOrdersPress: function (oEvent) {
                var oOrdersTable = this.byId("OrdersTable");
                var oItemsBinding = oOrdersTable.getBinding("items");
                var sKey = oEvent.getParameter('selectedKey');
                var oStatusFilter = [];
                if (sKey !== 'All') {
                    sKey = "'" + sKey + "'";
                    oStatusFilter = new Filter("summary/status", FilterOperator.EQ, sKey);
                }
                oItemsBinding.filter(oStatusFilter);
            },

            /**
             * "Add order" button press event handler.
             */
            onAddOrderPress: function() {
                var oView = this.getView();
                var oODataModel = oView.getModel("odata");
                if (!this.oDialog) {
                    this.oDialog = sap.ui.xmlfragment(oView.getId(), "Olga.Shupranova.app.view.fragments.OrderDialog", this);
                    oView.addDependent(this.oDialog);
                }

                var oEntryCtx = oODataModel.createEntry("/Orders", {
                    properties: {
                        summary: {},
                        shipTo: {},
                        customerInfo: {}
                    }
                });

                this.oDialog.setBindingContext(oEntryCtx);
                this.oDialog.setModel(oODataModel);
                this.oDialog.open();
            },

            /**
             * Dialog "Save" button press event handler.
             */
            onSaveDialogPress: function() {
                var oODataModel = this.getView().getModel("odata");
                oODataModel.submitChanges();
                this.oDialog.close();
            },

            /**
             * Dialog "Close" button press event handler.
             */
            onCancelDialogPress: function () {
                var oODataModel = this.getView().getModel("odata");

                var oCtx = this.oDialog.getBindingContext();

                oODataModel.deleteCreatedEntry(oCtx);
                this.oDialog.close();
            },


            /**
             * "Delete" order button press event handler.
             *
             * @param {sap.ui.base.Event} oEvent event object
             */
            onDeleteOrderPress: function (oEvent) {
                var oCtx = oEvent.getSource().getBindingContext("odata");
                var oODataModel = oCtx.getModel();
                var sKey = oODataModel.createKey("/Orders", oCtx.getObject());
                oODataModel.remove(sKey, {
                    success: function () {
                        MessageToast.show("Order was successfully removed!")
                    },
                    error: function () {
                        MessageBox.error("Error while removing order!");
                    }
                });
            },

            /**
             * Open order details page press event handler.
             *
             * @param {sap.ui.base.Event} oEvent event object.
             */
            onOrderDetailsPress: function (oEvent) {
                var oCtx = oEvent.getSource().getBindingContext("odata");
                var oComponent = this.getOwnerComponent();
                oComponent.getRouter().navTo("OrderDetails", {
                    OrderId: oCtx.getObject("id")
				});
            }
		});
	}
);
