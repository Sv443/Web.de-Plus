// ==UserScript==
// @name           Web.de Plus > Instant Redirect
// @version        0.1.0
// @description    Sofortige Weiterleitung beim Klicken eines Links
// @namespace      https://github.com/Sv443/Web.de-Plus
// @author         Sv443
// @license        MIT
// @copyright      2019, Sv443 (https://sv443.net/)
// @match          http*://*.deref-web-02.de/*
// @icon           https://raw.githubusercontent.com/Sv443/Web.de-Plus/master/icons/icon_1200x1200.png
// @run-at         document-start
// @connect        self
// @connect        *
// @grant          GM_openInTab
// @grant          unsafeWindow
// @grant          window.close
// @grant          window.focus
// ==/UserScript==

var debug = false;

(function() {
    "use strict";

    var getQStr = function() {
        var rawQstr = window.location.href.split("?")[1];
        var qstrObj = {};

        var qstrArr = [];
        if(rawQstr != null && rawQstr.includes("&"))
            qstrArr = rawQstr.split("&");
        else if(rawQstr != null)
            qstrArr = [rawQstr];


        if(qstrArr.length > 0)
            qstrArr.forEach(function(qstrEntry) {
                if(qstrEntry.includes("="))
                    qstrObj[qstrEntry.split("=")[0]] = qstrEntry.split("=")[1];
            });
        else qstrObj = null;

        return qstrObj;
    };

    var instantRedirect = function() {
        var foundUrl = false;
        if(!window.location.href.includes("?"))
            return;

        var qStr = getQStr();
        if(debug) alert("[DBG] QStrObj:\n" + JSON.stringify(qStr, null, 4) + "\n\n\n");

        if(qStr != null && qStr["redirectUrl"] != null)
        {
            foundUrl = true;
            var redirUrl = decodeURIComponent(qStr["redirectUrl"]);

            if(redirUrl != undefined)
            {
                var redirWindow = GM_openInTab(redirUrl);

                window.close();
            }
        }
    };



    instantRedirect();

    document.addEventListener("DOMContentLoaded", function() {
        if(!foundUrl)
            instantRedirect();
    });
})();