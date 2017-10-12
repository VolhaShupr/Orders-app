sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
    var myBlock = BlockBase.extend("Olga.Shupranova.app.block.customerInfo.BlockCustomerInfo", {
        metadata: {
            views: {
                Collapsed: {
                    viewName: "Olga.Shupranova.app.block.customerInfo.BlockCustomerInfo",
                    type: "XML"
                },
                Expanded: {
                    viewName: "Olga.Shupranova.app.block.customerInfo.BlockCustomerInfo",
                    type: "XML"
                }
            }
        }
    });
    return myBlock;
}, true);