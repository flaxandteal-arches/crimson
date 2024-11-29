import { reactive } from 'vue';

const state = reactive({
    state: 'details',
    activeTab: 'details',
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

export default {
    state,
    setActiveTab,
    setState,
    setSelectedLoadEvent
};


