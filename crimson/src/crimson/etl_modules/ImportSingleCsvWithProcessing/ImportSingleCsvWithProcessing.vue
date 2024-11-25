<template>
<div>
    <component :is="currentComponent" />
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TaskDetailsComponent from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/components/TaskDetailsComponent.vue';
import TaskStatusComponent from '@/crimson/etl_modules/ImportSingleCsvWithProcessing/components/TaskStatusComponent.vue';

const state = ref('taskDetails');
const selectedLoadEvent = ref(null);

onMounted(() => {
    const mountPoint = document.getElementById('processing-import-mounting-point');
    if (mountPoint) {
        const stateData = mountPoint.getAttribute('data-state');
        const selectedLoadEventData = mountPoint.getAttribute('data-selected-load-event');
        if (stateData) {
            state.value = stateData;
        }
        if(selectedLoadEventData) {
            selectedLoadEvent.value = selectedLoadEventData;
        }
    }
});
const currentComponent = computed(() => {
    return state.value == 'details' ? TaskDetailsComponent : TaskStatusComponent;
});
</script>

<style>
</style>