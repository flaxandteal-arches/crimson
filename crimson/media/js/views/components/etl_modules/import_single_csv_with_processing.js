import ko from 'knockout';
import createVueApplication from 'utils/create-vue-application';
import ImportSingleCsvWithProcessing from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/ImportSingleCsvWithProcessing.vue';
import ImportProcessingTemplate from 'templates/views/components/etl_modules/import_single_csv_with_processing.htm';
import arches from 'arches';

ko.components.register('import_single_csv_with_processing', {
    viewModel: function(params) {
        // pulls in params for the data manager
        this.state = params.state;
        this.loadDetails = params.load_details || ko.observable();
        this.selectedLoadEvent = params.selectedLoadEvent ?? null;
        this.editHistoryUrl = `${arches.urls.edit_history}?transactionid=${ko.unwrap(params.selectedLoadEvent)?.loadid}`;
        this.validationErrors = params.validationErrors || ko.observable();
        this.validated = params.validated || ko.observable();
        this.getErrorReport = params.getErrorReport;
        this.getNodeError = params.getNodeError;
        this.formatTime = params.formatTime;
        this.timeDifference = params.timeDifference;

        const mountPoint = document.getElementById('processing-import-mounting-point');
        if(mountPoint) {
            mountPoint.setAttribute('data-state', this.state);
            mountPoint.setAttribute('data-selected-load-event', this.selectedLoadEvent);
            console.log("mount-point: ", mountPoint.getAttribute('data-state'));
        }

        createVueApplication(ImportSingleCsvWithProcessing).then(vueApp => {
            vueApp.mount('#processing-import-mounting-point');
        });
    },
    template: ImportProcessingTemplate
});
