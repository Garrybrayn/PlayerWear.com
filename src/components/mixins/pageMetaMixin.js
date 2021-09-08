export default {
  watch: {
    pageTitle:{
      immediate: true,
      handler(){
        this.updatePageMetadata();
      }
    },
    pageDescription:{
      immediate: true,
      handler(){
        this.updatePageMetadata();
      }
    }
  },
  methods: {
    updatePageMetadata(){
      this.$emit('pageMetadata', {
        title: this.pageTitle || "",
        description: this.pageDescription || ""
      })
    }
  }
}
