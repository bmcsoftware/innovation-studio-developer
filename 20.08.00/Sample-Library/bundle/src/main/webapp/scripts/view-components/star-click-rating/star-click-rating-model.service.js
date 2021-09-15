//This code is run at "design" phase, in Innovation Studio.
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating').factory('comExampleSamplelibraryStarClickRatingModel', function (rxViewComponentModel) {
        return rxViewComponentModel.extend({
            initialize: function () {
                // launch parent initialize method
                rxViewComponentModel.prototype.initialize.apply(this, arguments);

                // add listener for rxData
                this.listenTo(this, 'change:rxData', this._onChangeRxData);
            },

            // Validate is used to validate the input entered by an end user.
            // The validation will take place when the view is saved.
            validate: function () {
                var me = this;

                // execute default validation method
                return rxViewComponentModel.prototype.validate.apply(this, arguments).then(function (validationIssues) {
                    // check that the number of stars is at least 4
                    if (me.prop('rxData/maxAmountOfStars') < 4) {
                        validationIssues.push({
                            elementId: me.get('guid'),
                            elementName: 'Star Rating',
                            propertyName: 'maxAmountOfStars',
                            type: 'error',
                            message: 'The number of stars should be greater or equal to 4.'
                        });
                    }

                    return validationIssues;
                });
            }
        });
    });
})();