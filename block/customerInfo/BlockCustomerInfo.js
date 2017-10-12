sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
    var myBlock = BlockBase.extend("Olga.Shupranova.app.block.customerInfo.BlockCustomerInfo", {
        metadata: {
            events: {
                "dummy": {}
            }
        }
    });
    return myBlock;
}, true);