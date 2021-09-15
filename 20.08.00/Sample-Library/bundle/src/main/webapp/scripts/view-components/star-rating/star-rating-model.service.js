/*
This code is run at "design" phase, in Innovation Studio.
used in "comExampleSamplelibraryStarRatingDesign" factory (file "star-rating-design-service.js").
*/
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-rating').factory('comExampleSamplelibraryStarRatingModel', function (rxViewComponentModel, rxRecordDefinitionResource) {
        return rxViewComponentModel.extend({
            initialize: function () {
                // launch parent initialize method
                rxViewComponentModel.prototype.initialize.apply(this, arguments);

                // add listener for rxData
                this.listenTo(this, 'change:rxData', this._onChangeRxData);

                this._initRecordDefinition();
            },

            _initRecordDefinition: function () {
                if (this.prop('rxData/recordDefinitionName')) {
                    var me = this;

                    // load Record Definition
                    rxRecordDefinitionResource.get(this.prop('rxData/recordDefinitionName')).then(function (recordDefinition) {
                        me.recordDefinition = recordDefinition;
                    }).catch(function () {
                        me.recordDefinition = null;
                    });
                } else {
                    this.recordDefinition = null;
                }
            },

            // Validate is used to validate the input entered by an end user.
            // The validation will take place when the view is saved.
            validate: function () {
                var me = this;

                // execute default validation method
                return rxViewComponentModel.prototype.validate.apply(this, arguments).then(function (validationIssues) {
                    // check that the number of stars is at least 5
                    if (me.prop('rxData/stars') < 5) {
                        validationIssues.push({
                            elementId: me.get('guid'),
                            elementName: 'Star Rating',
                            propertyName: 'stars',
                            type: 'error',
                            message: 'The number of stars should be greater or equal to 5.'
                        });
                    }

                    return validationIssues;
                });
            },

            _onChangeRxData: function (model, rxData, changedProperty) {
                if (changedProperty.propertyPath === 'rxData/recordDefinitionName') {
                    this._initRecordDefinition();
                }
            }
        });
    });
})();