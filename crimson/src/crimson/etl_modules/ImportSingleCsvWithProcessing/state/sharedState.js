import { reactive } from 'vue';

const sharedState = reactive({
    state: 'details',
    selectedLoadEvent: null
});

export default sharedState;