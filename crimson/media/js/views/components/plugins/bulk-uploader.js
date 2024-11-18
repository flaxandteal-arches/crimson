import ko from 'knockout';
import BulkUploader from '@/plugins/BulkUploader/BulkUploader.vue';
import createVueApplication from 'utils/create-vue-application';
import BulkUploaderTemplate from 'templates/views/components/plugins/bulk-uploader.htm';


ko.components.register('bulk-uploader', {
    viewModel: function() {
        createVueApplication(BulkUploader).then(vueApp => {
            vueApp.mount('#bulk-uploader-mounting-point');
        });
    },
    template: BulkUploaderTemplate,
});
