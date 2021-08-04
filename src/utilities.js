const data = {
  arrayShuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  tagify: content => content.toLowerCase().replace(' ','-'),
  tagReadable: tag => String(tag || "")
    .toLowerCase()
    .replace('design','')
    .replace('3d','3D')
    .replace(/-/ig,' ') // replace hyphens with spaces
    .replace(' and ', ' & ') // replace "and" with &
    .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, s => s.toUpperCase()) //UC words
};

export default data
