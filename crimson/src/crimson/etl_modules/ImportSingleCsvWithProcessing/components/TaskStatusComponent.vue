<script setup>
import { onMounted, ref } from "vue";
import { useGettext } from "vue3-gettext";
import arches from 'arches';

const { $gettext } = useGettext();
const props = defineProps({selectedLoadEvent: {type: Object, default: () => {}}});

const graphName = ref();

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
    getGraphName(props.selectedLoadEvent.load_details.graph);
});
</script>

<template>
    <div v-if="props.selectedLoadEvent">
        {{ props.selectedLoadEvent.load_details.file_name }}
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
                    v-text="props.selectedLoadEvent.load_details.file_name"
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
