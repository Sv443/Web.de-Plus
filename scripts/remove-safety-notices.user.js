// ==UserScript==
// @name           Web.de Plus > Remove Safety Notices
// @version        0.1.0
// @description    Entfernt die lästigen Sicherheitshinweise nach dem Login
// @namespace      https://github.com/Sv443/Web.de-Plus
// @author         Sv443
// @license        MIT
// @copyright      2019, Sv443 (https://sv443.net/)
// @match          http*://navigator.web.de/remindlogout*
// @icon           https://raw.githubusercontent.com/Sv443/Web.de-Plus/master/icons/icon_1200x1200.png
// @run-at         document-start
// @connect        self
// @connect        *
// ==/UserScript==

var debug = true;

(function() {
    "use strict";

    if(debug)
        alert("[DBG] - RemoveSafetyNotices: Redirecting");

    if(window.location.href.includes("remindlogout"))
        window.location.replace(window.location.href.replace("/remindlogout", "/mail"));
})();