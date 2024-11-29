import ko from 'knockout';
import createVueApplication from 'utils/create-vue-application';
import ImportSingleCsvWithProcessing from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/ImportSingleCsvWithProcessing.vue';
import ImportProcessingTemplate from 'templates/views/components/etl_modules/import_single_csv_with_processing.htm';
import arches from 'arches';
import store from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/store/mainStore';

ko.components.register('import_single_csv_with_processing', {
    viewModel: function(params) {
        // pulls in params for the data manager
        // several of these are needed for the base-import component
        // once this is converted to vue these can be removed
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

        const state = store.state;

        store.setState(ko.toJS(this.state));
        store.setSelectedLoadEvent(ko.toJS(this.selectedLoadEvent));

        ko.computed(() => {
            const newActiveTab = state.activeTab;
            if (!ko.isObservable(params.activeTab)) {
                params.activeTab = ko.observable(newActiveTab);
            } else {
                params.activeTab(newActiveTab);
            }
        });

        createVueApplication(ImportSingleCsvWithProcessing).then(vueApp => {
            vueApp.mount('#processing-import-mounting-point');
        });
    },
    template: ImportProcessingTemplate
});
