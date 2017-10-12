sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
    var myBlock = BlockBase.extend("Olga.Shupranova.app.block.shipInfo.BlockShipInfo", {
        metadata: {
            views: {
                Collapsed: {
                    viewName: "Olga.Shupranova.app.block.shipInfo.BlockShipInfo",
                    type: "XML"
                },
                Expanded: {
                    viewName: "Olga.Shupranova.app.block.shipInfo.BlockShipInfo",
                    type: "XML"
                }
            }
        }
    });
    return myBlock;
}, true);