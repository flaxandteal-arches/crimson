<template>
    <Tabs class="tab-layout" :value="state.detailsTab">
        <TabList class="custom-tab-list">
            <Tab v-for="tab in tabs" :key="tab.label" class="custom-tab" :value="tab.route">
                <a class="flex items-center margin-2">
                    <i :class="tab.icon" />
                    <span>{{ tab.label }}</span>
                </a>
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel v-for="tab in tabs" :key="tab.component" :value="tab.route">
                <component :is="tab.component" />
            </TabPanel>
        </TabPanels>
    </Tabs>
</template>

<script setup>
import { ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import ProcessingComponet from './ProcessingComponet.vue';
import ErrorPreviewComponent from './ErrorPreviewComponent.vue';
import store from '../store/mainStore.js';

const tabs = ref([
    { label: 'Processing', route: 'process', icon: 'fa fa-cogs', component: ProcessingComponet },
    { label: 'Error Check', route: 'errors', icon: 'fa fa-exclamation-triangle', component: ErrorPreviewComponent },
]);

const state = store.state;
console.log(state.detailsTab);
</script>

<style scoped>
    .flex{
        display: flex;
    }
    .items-center{
        justify-content: center;
        align-items: center;
    }
    span{
        margin: 0.75rem;
    }
    .tab-layout {
        width: 100%;
        --p-tabs-tab-active-border-color: #2986b8;
        --p-tabs-tab-active-background-color: #2986b8; 
        --p-tabs-tablist-background: #e8e8e8;
        --p-tabs-tab-active-background: #ffffff;
    }
    .custom-tab {
        flex: 1;
        text-align: center;
    }
    ::v-deep(.p-tablist-active-bar){         
        background: #2986b8;
        border-color: #2986b8;
        height: 2px;
    }

</style>