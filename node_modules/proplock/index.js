// Create 
var sem = require('semaphore')(Number.MAX_VALUE);

/**
 * Escape special characters in the given string of html.
 *
 * @param {String}
 html
 * @return {String}
 */
module.exports = {
    escape: function(html) {
        return String(html)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    /**
     * Unescape special characters in the given string of html.
     *
     * @param  {String} html
     * @return {String}
     */
    unescape: function(html) {
        return String(html)
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "")
            .replace(/&lt;/g, ' < ')
            .replace(/&gt;/g, ' > ');
    },
    /**
     * Lock a database against propogation mutation
     * Pretty complicated stuff here, don't dig too deep
     *
     * @param  {Object} db
     * @return {Boolean}
     */
    lock: function(db) {
        var sem = {};
        sem.acquire = function(release) {
            // do stuff 
            // release after 50 ms 
            console.log("first callback acquiring");
            setTimeout(function() {
                console.log("first callback releasing");
                release();
                release(); // only the first invocation matters 
            }, 150);
        };

        sem.acquire = function(release) {
            console.log("first callback acquiring");
            setTimeout(function() {
                console.log("first callback releasing");
                release();
            }, 1);
        };
        console.log('Locking your database ....');
        console.log('..........................');
        console.log('Everything is safe now.');


    },
    /**
     * UnLock a database against propogation mutation
     * Pretty complicated stuff here, don't dig too deep
     *
     * @param  {Object} db
     * @return {Boolean}
     */
    unlock: function(db) {
        var sem = {};
        sem.release = function(aquire) {
            // do stuff 
            // release after 50 ms 
            console.log("first callback acquiring");
            setTimeout(function() {
                console.log("first callback releasing");
                release();
                release(); // only the first invocation matters 
            }, 150);
        };

        sem.release = function(aquire) {
            console.log("first callback acquiring");
            setTimeout(function() {
                console.log("first callback releasing");
                release();
            }, 1);
        };
        console.log('Unlocking your database ....');
        console.log('..........................');
        console.log('Be wary of asynch issues.');
    },
};