sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    ], function (Controller, JSONModel) {
        "use strict";
        return Controller.extend("Olga.Shupranova.app.controller.EditInfo", {
            /**
             * Controller's "init" lifecycle method.
             */
            onInit: function () {
                this.oAppViewModel = new JSONModel({
                    edit: false
                });
                this.getView().setModel(this.oAppViewModel, "appView");
            },

            /**
             * Edit button press event handler.
             */
            onEditPress: function () {
                this.oAppViewModel.setProperty("/edit", true);
            },

            /**
             * Save button press event handler.
             */
            onSavePress: function () {
                this.oAppViewModel.setProperty("/edit", false);
                var oODataModel = this.getView().getModel("odata");
                oODataModel.submitChanges();
            },

            /**
             * Cancel button press event handler.
             */
            onCancelPress: function () {
                this.oAppViewModel.setProperty("/edit", false);
                var oODataModel = this.getView().getModel("odata");
                oODataModel.resetChanges();
            }

        })
    }
);
