
const module = {
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


export const state = () => module.state
export const mutations = module.mutations;
export const actions = module.actions;
export const getters = module.getters;

export default {
  state,
  mutations,
  actions,
  getters
}
