const data = {
  houseBrand: 'player-wear',
  thirdPartyBrands: [
    'korg','vox','blackstar','tascam'
  ],
  brandFamilies: {
    'korg-usa': ['korg','vox','blackstar']
  },
  arrayShuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  getBrandFamily(brand){
    brand = this.tagify(brand);
    if(this.brandFamilies[brand]){
      return this.brandFamilies[brand]
    }
    return Object.values(this.brandFamilies).find(family => family.indexOf(brand) !== -1)
  },
  getBrandFromCollectionHandle(collectionHandle){
    if(collectionHandle){
      collectionHandle = this.tagify(collectionHandle);
      if(this.allBrands.indexOf(collectionHandle) !== -1){
        return collectionHandle
      }
    }
    return this.houseBrand;
  },
  tagify: content => content.toLowerCase().replace(' ','-'),
  tagReadable: tag => tag
    .toLowerCase()
    .replace('design','')
    .replace('3d','3D')
    .replace(/-/ig,' ') // replace hyphens with spaces
    .replace(' and ', ' & ') // replace "and" with &
    .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, s => s.toUpperCase()) //UC words
};

data.allBrands = data.thirdPartyBrands.concat([data.houseBrand])

export default data
