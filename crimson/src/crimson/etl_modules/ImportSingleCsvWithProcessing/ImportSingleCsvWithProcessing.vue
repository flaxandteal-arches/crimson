<template>
<div>
    <component :is="currentComponent" :selected-load-event = "selectedLoadEvent" />
</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TaskDetailsComponent from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/components/TaskDetailsComponent.vue';
import TaskStatusComponent from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/components/TaskStatusComponent.vue';
import sharedState from './state/sharedState.js';

const state = ref(sharedState.state);

const selectedLoadEvent = ref(sharedState.selectedLoadEvent);

watch(() => sharedState.state, (newValue) => {
    state.value = newValue;
});

watch(() => sharedState.selectedLoadEvent, (newValue) => {
    selectedLoadEvent.value = newValue;
});

const currentComponent = computed(() => {
    return state.value == 'details' ? TaskDetailsComponent : TaskStatusComponent;
});
</script>

<style>
</style>