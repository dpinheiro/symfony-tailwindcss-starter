import Vue from 'vue';
import axios from 'axios';
import FixedHeader from 'vue-fixed-header'

const imagesContext = require.context('../images', true, /\.(png|jpg|jpeg|gif|ico|svg|webp)$/);
imagesContext.keys().forEach(imagesContext);

require('../sass/app.scss');

Vue.options.delimiters = ['[[', ']]']

new Vue({
    el: '#app',
    data: {
        errors: {
            name: false,
            email: false,
            phone: false,
            subject: false,
            message: false
        },
        form: {
            name: null,
            email: null,
            phone: null,
            subject: null,
            message: null
        },
        submitSuccess: false,
        submitError: false,
        menuOpen: false,
        langDropdownOpen: false,
        emailLoading: false
    },
    methods: {
        sendContact(e) {
            e.preventDefault();

            if (this.validate()) {
                // submit form
                this.emailLoading = true;
                axios.post(e.target.action, this.form)
                    .then(response => {
                        this.form = {
                            name: null,
                            email: null,
                            phone: null,
                            subject: null,
                            message: null
                        };

                        this.emailLoading = false;

                        if (response.data.success) {
                            this.submitSuccess = true;
                            this.submitError = false;
                        }
                        else {
                            this.submitSuccess = false;
                            this.submitError = true;
                        }
                    })
                    .catch(error => {
                        this.submitSuccess = false;
                        this.submitError = true;
                        this.emailLoading = false;
                    });
            }

            return false;
        },
        validate() {
            let valid = true;
            this.errors = [];

            if (!this.form.name) {
                this.errors.name = true;
                valid = false;
            }

            if (!this.form.email || !this.validEmail(this.form.email)) {
                this.errors.email = true;
                valid = false;
            }

            if (!this.form.subject) {
                this.errors.subject = true;
                valid = false;
            }

            if (!this.form.message) {
                this.errors.message = true;
                valid = false;
            }

            return valid;
        },
        validEmail: function (email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        }
    },
    components: {
        FixedHeader
    }
});