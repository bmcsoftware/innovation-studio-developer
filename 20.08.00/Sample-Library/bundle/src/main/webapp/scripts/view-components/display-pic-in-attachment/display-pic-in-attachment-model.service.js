// This code is run at "design" phase, in Innovation Studio.
// used in "comExampleSamplelibraryDisplayPicInAttachmentDesign" factory.
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment').factory('comExampleSamplelibraryDisplayPicInAttachmentModel', function (rxViewComponentModel, rxRecordDefinitionResource) {
        return rxViewComponentModel.extend({
            initialize: function () {
                // launch parent initialize method
                rxViewComponentModel.prototype.initialize.apply(this, arguments);

                // add listener for rxData
                this.listenTo(this, 'change:rxData', this._onChangeRxData);

                this._initRecordDefinition();
            },

            _initRecordDefinition: function () {
                if (this.prop('rxData/recordDefinitionFullName')) {
                    var me = this;

                    // load Record Definition
                    rxRecordDefinitionResource.get(this.prop('rxData/recordDefinitionFullName')).then(function (recordDefinition) {
                        me.recordDefinitionFullName = recordDefinition;
                    }).catch(function () {
                        me.recordDefinitionFullName = null;
                    });
                } else {
                    this.recordDefinitionFullName = null;
                }
            },

            _onChangeRxData: function (model, rxData, changedProperty) {
                if (changedProperty.propertyPath === 'rxData/recordDefinitionFullName') {
                    this._initRecordDefinition();
                }
            }
        });
    });
})();