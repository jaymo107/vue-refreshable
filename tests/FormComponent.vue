<template>
    <form v-refreshable:form>
        <input type="text" v-model="form.name" />
        <input type="email" v-model="form.email" />
    </form>
</template>

<script>
    export default {
        name: 'FormComponent',

        data() {
            return {
                name: 'intact',
                form: {
                    name: '',
                    email: ''
                }
            };
        },
    };
</script>