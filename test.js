var casper = require('casper').create();
var mouse = require("mouse").create(casper);

casper.start('https://krksol-miraclebust.com/', function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();