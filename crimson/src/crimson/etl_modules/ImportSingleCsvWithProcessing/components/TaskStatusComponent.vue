<script setup>
import { onMounted, ref } from "vue";
import { useGettext } from "vue3-gettext";
import arches from 'arches';
import store from '../store/mainStore.js';

const { $gettext } = useGettext();

const graphName = ref();
const state = store.state;

const graphs = arches.resources.map((resource) => ({
    name: resource.name,
    graphid: resource.graphid,
}));

const getGraphName = (selectedGraphId) => {
    if (graphs) {
        graphName.value = graphs.find((graph) => graph.graphid === selectedGraphId).name;
    }
};

onMounted(() => {
    getGraphName(state.selectedLoadEvent?.load_details.graph);
});
</script>

<template>
    <div v-if="state.selectedLoadEvent">
        {{ state.selectedLoadEvent.load_details.file_name }}
        <div 
            class="bulk-load-status" 
            style="margin-bottom: 20px"
        >
            <h4 class="summary-title">
                <span 
                    v-text="$gettext('Import Single CSV Summary')"
                />
            </h4>
            <div>
                <span
                    class="etl-loading-metadata-key"
                    v-text="$gettext('File Name') + ':'"
                />
                <span
                    class="etl-loading-metadata-value"
                    v-text="state.selectedLoadEvent.load_details.file_name"
                />
            </div>
            <div>
                <span
                    class="etl-loading-metadata-key"
                    v-text="$gettext('Target Resource') + ':'"
                />
                <span
                    class="etl-loading-metadata-value"
                    v-text="graphName"
                />
            </div>
        </div>
    </div>
</template>
