<template>
    <div>
<!--        <Loader/>-->
        <Header/>
        <Sidebar/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Sidebar from "../components/Sidebar";
    import Loader from "../components/Loader";
    export default {
        name: "MainLayout",
        data() {
            return {

            }
        },
        components: {
            Loader,
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
