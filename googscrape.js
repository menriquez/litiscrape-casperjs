var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('https://google.com/', function() {
    // Wait for the page to be loaded
    this.waitForSelector('.gLFyf');
});

casper.then(function() {
    // search for 'casperjs' from google form
    this.fill('.gLFyf', { q: 'shark tank' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    this.fill('.gLFyf', { q: 'shark tank' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});

var startURL = 'http://localhost:8000',
    xPaths
x = require('casper').selectXPath;

casper.start(startURL);

casper.then(function getLinks(){
    xPaths = this.evaluate(function(){
        // copied from https://stackoverflow.com/a/5178132/1816580
        function createXPathFromElement(elm) {
            var allNodes = document.getElementsByTagName('*');
            for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
                if (elm.hasAttribute('id')) {
                    var uniqueIdCount = 0;
                    for (var n=0;n < allNodes.length;n++) {
                        if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                        if (uniqueIdCount > 1) break;
                    };
                    if ( uniqueIdCount == 1) {
                        segs.unshift('id("' + elm.getAttribute('id') + '")');
                        return segs.join('/');
                    } else {
                        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                    }
                } else if (elm.hasAttribute('class')) {
                    segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
                } else {
                    for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                        if (sib.localName == elm.localName)  i++; };
                    segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
                };
            };
            return segs.length ? '/' + segs.join('/') : null;
        };
        var links = document.getElementsByTagName('a');
        var xPaths = Array.prototype.map.call(links, createXPathFromElement);
        return xPaths;
    });
});
casper.then(function(){
    this.each(xPaths, function(self, xpath){
        self.thenOpen(startURL);
        self.thenClick(x(xpath));
        // waiting some time may be necessary for single page applications
        self.wait(1000);
        self.then(function(a){
            // do something meaningful here
            this.echo(this.getCurrentUrl());
        });

        // Uncomment the following line in case each click opens a new page instead of staying at the same page
        //self.back()
    });
});
casper.run(function(){
    this.exit();
});