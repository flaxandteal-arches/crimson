import { reactive } from 'vue';

const state = reactive({
    state: 'details',
    activeTab: 'details',
    detailsTab: 'process',
    selectedLoadEvent: null
});

const setActiveTab = (tab) => {
    state.activeTab = tab;
};

const setState = (newState) => {
    state.state = newState;
};

const setSelectedLoadEvent = (event) => {
    console.log("this", event);
    state.selectedLoadEvent = event;
};

const setDetailsTab = (tab) => {
    state.detailsTab = tab;
};

export default {
    state,
    setActiveTab,
    setState,
    setSelectedLoadEvent,
    setDetailsTab
};


