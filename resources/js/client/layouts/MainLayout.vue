<template>
    <div>

        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";


    export default {
        props: [],
        name: "MainLayout",
        data() {
            return {}
        },
        components: {Footer, Header},
        computed: {

        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
