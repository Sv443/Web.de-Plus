// ==UserScript==
// @name           Web.de-Plus > Instant Link Redirect
// @version        0.1.0
// @description    Sofortige Weiterleitung beim Klicken eines Links
// @namespace      https://github.com/Sv443/Web.de-Plus
// @author         Sv443
// @license        MIT
// @copyright      2019, Sv443 (https://sv443.net/)
// @match          http*://*.deref-web-02.de/*
// @match          http*://github.com/Sv443/Web.de-Plus*
// @icon           https://raw.githubusercontent.com/Sv443/Web.de-Plus/master/icons/icon_1200x1200.png
// @run-at         document-start
// @connect        self
// @connect        *
// @grant          GM_openInTab
// @grant          unsafeWindow
// @grant          window.close
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

    if(window.location.href.toLowerCase().includes("/sv443/web.de-plus"))
    {
        document.addEventListener("DOMContentLoaded", function() {
            var imgTags = document.getElementsByTagName("img");

            for(var i = 0; i < imgTags.length; i++)
            {
                var el = imgTags[i];
                if(el.alt == "ilr-nein")
                {
                    el.src = "https://camo.githubusercontent.com/04ad962ec94024ab03a6cd66d37eaf990bde2a08/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a612d2545322539432539332d627269676874677265656e";
                    el.alt = "ilr-ja";
                }
            }
        });
    }

    var foundUrl = false;

    var instantRedirect = function() {
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
                GM_openInTab(redirUrl);
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