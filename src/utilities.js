export default {
  tagReadable: tag => tag.replace(/-/ig,' ').replace(' and ', ' & ').replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, s => s.toUpperCase())
}
