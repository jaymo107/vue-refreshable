<template>
    <form @submit.prevent="onSubmit" class="col-md-6 offset-3" v-refreshable:form>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="form.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="form.name" id="name" placeholder="Name">
        </div>
        <div class="form-group">
            <label class="form-check-label" for="account_type">Account Type</label>
            <select class="form-control" id="account_type" v-model="form.account_type">
                <option value="basic">Basic</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
            </select>
        </div>
        <div class="form-check form-group">
            <input type="checkbox" v-model="form.tos" class="form-check-input" id="tos">
            <label class="form-check-label" for="tos">Terms of Service</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
    export default {
        name: 'FormComponent',

        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    account_type: 'Basic',
                    tos: false
                }
            };
        },

        methods: {
            /**
             * @param {Event} e
             */
            onSubmit() {
                console.table(this.form);
            }
        }
    };
</script>