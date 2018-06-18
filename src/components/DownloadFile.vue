<template>
    <a :href="downloadLink" target="_blank">{{fileName}}</a>
</template>

<script>
export default {
    props: {
        fileId: {
            default: "public/"
        }
    },
    computed: {
        fileName() {
            return this.fileId.substr(7);
        },
        downloadLink() {
            return "/storage/" + this.fileId.substr(7);
        }
    }
};
</script>

<style>
</style>
