
export default {
  namespaced: true,
  state: {
    roles: [
      'guitar',
      'keyboard',
      'drummer',
      'sound-engineer'
    ]
  },
  getters:{
    roleTags: state => state.roles.map(role => `role-${role}`)
  }
}
