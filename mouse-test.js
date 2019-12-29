var _ = require('underscore');
var utils = require('utils');
var casper = require('casper').create();

casper.withPopup(0, function() {
    this.echo("withPopup (this) TITLE context: " + this.getTitle(),"INFO");
});

casper.start('https://krksol-miraclebust.com/', function() {
    this.echo(this.getTitle());
});
casper.then(function() {
    this.clickLabel('Customer service', 'a');
});
casper.then(function() {
    this.echo(this.getCurrentUrl());
});

casper.run();