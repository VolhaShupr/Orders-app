sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
    var myBlock = BlockBase.extend("Olga.Shupranova.app.block.shipInfo.BlockShipInfo", {
        metadata: {
            events: {
                "dummy": {}
            }
        }
    });
    return myBlock;
}, true);