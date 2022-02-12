<script setup>
import{ defineProps, computed } from "vue"
const props = defineProps(
    {
        properties: {
            type: Object,
            required: true
        }
    }
)

const sortedProperties = computed(
    function() {
        return Object.entries(props.properties).sort((a, b) => a[0].localeCompare(b[0]))
    }
)

function getPropertyTypeName(type) {
    if(Array.isArray(type)) {
        return type.map(t => t.name).join(", ")
    }
    return type.name
}

function getPropertyDefault(defaultValue) {
    if(typeof defaultValue === "function") {
        return defaultValue()
    }
    return defaultValue
}

function getIcon(required) {
    return required ? "icon-check" : "icon-cancel"
}

function getTooltip(required) {
    return required ? "Property is required" : "Property is not required"
}
</script>

<template>
    <h3>Properties</h3>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Required</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="([propertyName, property]) in sortedProperties" :key="propertyName">
                <td>
                    {{ propertyName }}
                </td>
                <td>
                    {{ getPropertyTypeName(property.type) }}
                </td>
                <td>
                    <template v-if="getPropertyDefault(property.default)">
                        {{getPropertyDefault(property.default) }}
                    </template>
                    <template v-else>
                        <em>(none)</em>
                    </template>
                </td>
                <td>
                    <span :class="getIcon(property.required)" :title="getTooltip(property.required)"></span>
                </td>
            </tr>
        </tbody>
    </table>
</template>