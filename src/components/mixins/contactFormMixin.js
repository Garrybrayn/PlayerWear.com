import axios from "axios";

export default {

  data(){
    return {
      showProgressSpinner: false,
      errorMessage: null,
      wasSent: false
    }
  },
  watch: {
    wasSent(){
      if(this.wasSent){
        this.resetForm()
      }
    },
    $route:{
      immediate: true,
      handler(to){
        if('contact_posted' in to.query){
          this.wasSent = true;
        }
      }
    }
  },
  mounted(){
    this.email = this.$store.state.customers.email
  },
  methods: {
    submit(){
      this.errorMessage = null;
      if(this.$refs.emailInput.value){
        this.$store.commit('customers/SET_EMAIL', this.$refs.emailInput.value);
      }

      const formData = this.getFormData();
      console.log(formData);

      if(typeof formData === 'object'){
        this.showProgressSpinner = true;

        axios.post('/contact',{
          form_type: 'contact',
          utf8: "✓",
          contact: formData
        })
        .then(results => {
          if(results.data.includes('challenge')){
            window.location.href = '/challenge';
          }else{
            this.showProgressSpinner = false;
            this.wasSent = true;
          }
        })
        .catch(error => {
          console.error(error);
          this.showProgressSpinner = false;
        })
      }else if(typeof formData === 'string'){
        this.errorMessage = formData;
      }
    }
  }
}
