import { reactive } from 'vue';
import ko from 'knockout';

const sharedState = reactive({
    state: 'details',
    selectedLoadEvent: null,
    activeTab: ko.observable("details")
});

export default sharedState;