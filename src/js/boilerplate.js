
/**
 * Boilerplate Application class.
 * @constructor
 * @public
 */
function BoilerplateApp() {

    /**
     * @type {!string}
     * @private
     */
    this.version_ = "1.0.0";

    // Add more private properties here.
}


/**
 * @public
 */
BoilerplateApp.prototype.run = function() {

    console.log('BoilerplateApp ' + this.version_);

    // Add more private properties here.

};


/**
 * NOTE!
 * Entry point here.
 */
$(function() {
    /**
     * @type {!BoilerplateApp}
     */
    var app = new BoilerplateApp();

    app.run();

});
