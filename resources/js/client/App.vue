<template>
    <div>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
    import MainLayout from "./layouts/MainLayout";
    import ClientLayout from "./layouts/ClientLayout";
    export default {
        props: [],
        name: "App",
        data() {
            return {}
        },
        components: {
            MainLayout,
            ClientLayout
        },
        computed: {
            layout() {
                return (this.$route.meta.layout || 'main') + '-layout';
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
