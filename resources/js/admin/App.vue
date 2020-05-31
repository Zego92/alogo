<template>
    <div>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
    import AuthLayout from "./layouts/AuthLayout";
    import MainLayout from "./layouts/MainLayout";
    export default {
        name: "App",
        data() {
            return {

            }
        },
        components: {
            AuthLayout,
            MainLayout,
        },
        computed: {
            layout() {
                return (this.$route.meta.layout || 'auth') + '-layout';
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
