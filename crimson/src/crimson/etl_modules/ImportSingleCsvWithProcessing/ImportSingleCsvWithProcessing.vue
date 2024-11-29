<template>
<div>
    <component :is="currentComponent" :selected-load-event = "store.selectedLoadEvent" />
</div>
</template>

<script setup>
import { computed, watch } from 'vue';
import TaskDetailsComponent from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/components/TaskDetailsComponent.vue';
import TaskStatusComponent from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/components/TaskStatusComponent.vue';
import store from './store/mainStore.js';

const state = store.state;

watch(() => state.state, (newValue) => {
    store.setState(newValue);
});

watch(() => state.selectedLoadEvent, (newValue) => {
    store.setSelectedLoadEvent(newValue);
});

const currentComponent = computed(() => {
    console.log(state.state);
    return state.state == 'details' ? TaskDetailsComponent : TaskStatusComponent;
});
</script>

<style>
</style>