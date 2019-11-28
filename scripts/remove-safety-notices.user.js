// ==UserScript==
// @name           Web.de-Plus > Remove Safety Notices
// @version        0.1.1
// @description    Entfernt die lästigen Sicherheitshinweise nach dem Login
// @namespace      https://github.com/Sv443/Web.de-Plus
// @author         Sv443
// @license        MIT
// @copyright      2019, Sv443 (https://sv443.net/)
// @match          http*://navigator.web.de/remindlogout*
// @match          http*://bap.navigator.web.de/remindlogout*
// @match          http*://github.com/Sv443/Web.de-Plus*
// @icon           https://raw.githubusercontent.com/Sv443/Web.de-Plus/master/icons/icon_1200x1200.png
// @run-at         document-start
// @connect        self
// @connect        *
// ==/UserScript==

var debug = false;

(function() {
    "use strict";

    if(window.location.href.toLowerCase().includes("/sv443/web.de-plus"))
    {
        document.addEventListener("DOMContentLoaded", function() {
            var imgTags = document.getElementsByTagName("img");

            for(var i = 0; i < imgTags.length; i++)
            {
                var el = imgTags[i];
                if(el.alt == "rsn-nein")
                {
                    el.src = "https://camo.githubusercontent.com/04ad962ec94024ab03a6cd66d37eaf990bde2a08/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a612d2545322539432539332d627269676874677265656e";
                    el.alt = "rsn-ja";
                    el.dataset["canonical-src"] = "https://img.shields.io/badge/ja-%E2%9C%93-brightgreen";
                }
            }
        });
        return;
    }

    if(window.location.href.toLowerCase().includes("remindlogout"))
    {
        window.location.replace(window.location.href.toLowerCase().replace("/remindlogout", "/mail"));
        if(debug)
            alert("[DBG] - RemoveSafetyNotices: Redirecting");
    }
})();
