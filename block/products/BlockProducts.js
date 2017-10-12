sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
    var oBlock = BlockBase.extend("Olga.Shupranova.app.block.products.BlockProducts", {
        metadata: {
            events: {
                "innerPress": {}
            }
        }
    });
    return oBlock;
}, true);