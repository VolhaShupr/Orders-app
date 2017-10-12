sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
    "use strict";
    var myBlock = BlockBase.extend("Olga.Shupranova.app.block.products.BlockProducts", {
        metadata: {
            views: {
                Collapsed: {
                    viewName: "Olga.Shupranova.app.block.products.BlockProducts",
                    type: "XML"
                },
                Expanded: {
                    viewName: "Olga.Shupranova.app.block.products.BlockProducts",
                    type: "XML"
                }
            }
        }
    });
    return myBlock;
}, true);