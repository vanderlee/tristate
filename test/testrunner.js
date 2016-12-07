var testrunner = require("qunit");

testrunner.run([
    {
        code: "jquery.tristate.js",
        tests: "test/tests.js"
    }
]);