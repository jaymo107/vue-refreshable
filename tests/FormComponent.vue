<template>
    <form v-refreshable:form>
        <input type="text" v-model="form.name" />
        <input type="email" v-model="form.email" />
        <input type="password" v-model="form.password" />
    </form>
</template>

<script>
    export default {
        name: 'FormComponent',

        props: ['dataName', 'dataEmail'],

        data() {
            return {
                name: 'intact',
                form: {
                    name: this.dataName || '',
                    email: this.dataEmail || '',
                    password: ''
                }
            };
        },
    };
</script>