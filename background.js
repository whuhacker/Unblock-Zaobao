var unblock_zaobao = {};  // namespace
unblock_zaobao.ip_addr  = "220.181.111.";
unblock_zaobao.ip_addr += Math.floor(Math.random() * 254 + 1); // 1 ~ 254
console.log('faked ip addr: ' + unblock_zaobao.ip_addr);

chrome.webRequest.onBeforeSendHeaders.addListener(
    // callback function
    function(details) {
        details.requestHeaders.push({
            name: "X-Forwarded-For",
            value: unblock_zaobao.ip_addr
        });

        return {requestHeaders: details.requestHeaders};
    },

    // url filters
    {
        urls: [
            "http://www.zaobao.com/*"
        ]
    },

    // extraInfoSpec
    // the request is blocked until the callback function returns
    ["requestHeaders", "blocking"]);
