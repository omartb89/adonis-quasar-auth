import { Notify } from 'quasar'
import { ref } from 'vue'
export const useHerald = () => {
  const iconSet = ref({
    login: 'login',
    logout: 'logout',
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    download: 'download'
  })
  const postAction = ref({
    login: 'logged in',
    logout: 'logged out',
    add: 'added',
    edit: 'updated',
    delete: 'deleted',
    download: 'downloaded'
  })
  function positive (model, action) {
    Notify.create({
      message: `<span class="text-white">
                ${action === 'login' || action === 'logout' ? 'The user ' : 'The '}
                <span class="text-red-2 text-bold">${model}</span> has
                <span class="text-yellow-2">${postAction.value[action]}</span>
                </span>`,
      color: 'green-6',
      icon: iconSet.value[action],
      textColor: 'white',
      html: true
    })
  }
  return {
    positive
  }
}
