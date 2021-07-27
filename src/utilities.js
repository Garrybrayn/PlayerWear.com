export default {
  tagReadable: tag => tag
    .toLowerCase()
    .replace('design','')
    .replace('3d','3D')
    .replace(/-/ig,' ') // replace hyphens with spaces
    .replace(' and ', ' & ') // replace "and" with &
    .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, s => s.toUpperCase()) //UC words
}
