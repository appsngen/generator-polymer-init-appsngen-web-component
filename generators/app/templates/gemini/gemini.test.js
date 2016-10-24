'use strict';
gemini.suite('suite', function (suite) {
    suite.setUrl('/gemini/index.html')
        .setCaptureElements('button')
        .before(function (actions, find) {
            actions.waitForElementToShow('button');
            this.button = find('button');
        })
        .capture('plain')
        .capture('hover', function (actions) {
            actions.mouseMove(this.button);
        })
        .capture('pressed', function (actions) {
            actions.mouseDown(this.button);
        });
});
