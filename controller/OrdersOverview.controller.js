sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "Olga/Shupranova/app/Formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
	], function (Controller, Formatter, JSONModel, Filter, FilterOperator, MessageToast, MessageBox) {
		"use strict";
		return Controller.extend("Olga.Shupranova.app.controller.OrdersOverview", {
		    onInit: function() {
                var oOrdersViewModel = new JSONModel({
                    allOrdersCount: 0,
                    pendingCount: 0,
                    acceptedCount: 0
                });
                this.oOrdersViewModel = oOrdersViewModel;
                this.getView().setModel(oOrdersViewModel, "ordersView");
            },

            onAfterRendering: function () {
		        var that = this;
                var oOrdersTable = this.byId("OrdersTable");
                var oItemsBinding = oOrdersTable.getBinding("items");
                oItemsBinding.attachDataReceived(function (oEvent) {
                    var mData = oEvent.getParameter("data");
                    this.oOrdersViewModel.setProperty("/allOrdersCount", mData.__count);
                }, this);

                var oODataModel = this.getView().getModel("odata");
                oODataModel.read("/Orders/$count", {
                    success: function(iCount){
                        that.oOrdersViewModel.setProperty("/pendingCount", iCount);
                    },
                    filters: [new Filter("summary/status", FilterOperator.EQ, "'Pending'")]
                });
                oODataModel.read("/Orders/$count", {
                    success: function(iCount){
                        that.oOrdersViewModel.setProperty("/acceptedCount", iCount);
                    },
                    filters: [new Filter("summary/status", FilterOperator.EQ, "'Accepted'")]
                });
            },

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

            onAddOrderPress: function() {
                var oView = this.getView();

                if (!this.oDialog) {
                    this.oDialog = sap.ui.xmlfragment(oView.getId(), "Olga.Shupranova.app.view.fragments.OrderDialog", this);
                    oView.addDependent(this.oDialog);
                }
                // set context to the dialog
                this.oDialog.bindObject({
                    path: "/Orders"
                });

                // open the dialog
                this.oDialog.open();

                sap.ui.getCore().getMessageManager().registerObject(oView.byId('OrderDialog'), true);

                var oOrderDialogFields = new JSONModel({
                    "summary": {
                        "createdAt": "10.08.1991",
                        "customer": "Alfreds Futterkiste",
                        "status": "Accepted",
                        "shippedAt": "8.09.1991",
                        "totalPrice": 100,
                        "currency": "EUR"
                    },
                    "shipTo": {
                        "name": "Maria Anders",
                        "address": "Obere Str. 57",
                        "ZIP": "12209",
                        "region": "Germany",
                        "country": "Germany"
                    },
                    "customerInfo": {
                        "firstName": "Maria",
                        "lastName": "Anders",
                        "address": "Obere Str. 57",
                        "phone": "030-0074321",
                        "email": "Maria.Anders@company.com"
                    }
                });
                this.oOrderDialogFields = oOrderDialogFields;
                oView.setModel(oOrderDialogFields, "orderDialog");
            },

            onSaveDialogPress: function() {
                //console.log(this.oOrderDialogFields);
                var oForm =this.getView().byId('OrderForm');
                var content = oForm.getContent();
                var bValidationError = false;
                for (var i=0; i<content.length; i++) {
                    if (content[i].getId().indexOf('input') !== -1) {
                        var oBinding = content[i].getBinding('value');
                        try {
                            oBinding.getType().validateValue(content[i].getValue());
                            content[i].getValue()
                        } catch (oException) {
                            content[i].setValueState("Error");
                            bValidationError = true;
                        }
                    }
                }

                var oODataModel = this.getView().getModel("odata");
                var oOrderFields = this.oOrderDialogFields.getData();

                if (!bValidationError) {
                    oODataModel.create("/Orders", oOrderFields, {
                        success: function () {
                            MessageToast.show("Order was successfully created!")
                        },
                        error: function () {
                            MessageBox.error("Error while creating order!");
                        }
                    });
                } else {
                    MessageBox.alert("A validation error has occured. Complete your input first");
                }

            },

            onCancelDialogPress: function () {
                this.oDialog.close();
            },

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
