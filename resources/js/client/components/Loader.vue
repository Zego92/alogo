<template>
    <div>
        <div class="background">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [],
        name: "Loader",
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>
    .background{
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 99999;
    }
    .spinner-border{
        position: fixed;
        left: 50%;
        top: 50%;
    }
</style>
