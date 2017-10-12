sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ], function (Controller, History) {
        "use strict";

        return Controller.extend("Olga.Shupranova.app.controller.ProductDetails", {
            /**
             * Controller's "init" lifecycle method.
             */
            onInit: function () {
                var oComponent = this.getOwnerComponent();
                var oRouter = oComponent.getRouter();
                oRouter.getRoute("ProductDetails").attachPatternMatched(this.onPatternMatched, this);
            },

            /**
             * "ProductDetails" route pattern matched event handler.
             *
             * @param {sap.ui.base.Event} oEvent event object.
             */
            onPatternMatched: function (oEvent) {
                var that = this;
                var mRouteArguments = oEvent.getParameter("arguments");
                var sProductID = mRouteArguments.ProductId;
                this.sProductID = sProductID;
                var oODataModel = this.getView().getModel("odata");
                oODataModel.metadataLoaded().then(function () {
                    var sKey = oODataModel.createKey("/OrderProducts", {id: sProductID});
                    that.getView().bindObject({
                        path: sKey,
                        model: "odata"
                    });
                });

                this.oFeedPanel = this.getView().byId('FeedPanel');
                var oEntryCtx = oODataModel.createEntry("/ProductComments", {
                    properties: {
                        productId: that.sProductID
                    }
                });
                this.oFeedPanel.setBindingContext(oEntryCtx);
                this.oFeedPanel.setModel(oODataModel);
            },

            /**
             * Set context to comment block.
             *
             * @param {string} sProductID product id.
             */
            setFeedContext: function (sProductID) {
                var oODataModel = this.getView().getModel("odata");
                var oEntryCtx = oODataModel.createEntry("/ProductComments", {
                    properties: {
                        productId: sProductID
                    }
                });
                this.oFeedPanel.setBindingContext(oEntryCtx);
                this.oFeedPanel.setModel(oODataModel);

                console.log(this.oFeedPanel);
            },

            /**
             * "Post" comment button press event handler.
             */
            onCommentPost: function () {
                var oODataModel = this.getView().getModel("odata");
                var sProductID = this.sProductID;
                oODataModel.submitChanges();
                this.setFeedContext(sProductID);
            },

            /**
             * Go to previous page or if it isn't possible go to the first page
             */
            onNavBack: function () {
                var oODataModel = this.getView().getModel("odata");
                var oCtx = this.oFeedPanel.getBindingContext();
                oODataModel.deleteCreatedEntry(oCtx);

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