(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-process-js').constant('COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS', {
        processStatus: {
            running: 'RUNNING',
            error: 'ERROR',
            done: 'DONE',
            notFound: 'NOT_FOUND'
        }
    });
})();