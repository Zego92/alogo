<template>
    <div>
        <Header/>
        <Sidebar/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Sidebar from "../components/Sidebar";
    export default {
        name: "MainLayout",
        data() {
            return {

            }
        },
        components: {
            Header,
            Sidebar
        },
        computed: {

        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
