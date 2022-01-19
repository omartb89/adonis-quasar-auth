import { Notify } from 'quasar'
import { ref } from 'vue'
export const useHerald = () => {
  /* const iconSet = ref({
    login: 'login',
    logout: 'logout',
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    download: 'download'
  }) */
  const actionClass = ref({
    login: {
      message: 'logged in',
      highlight: 'indigo-2',
      color: 'primary',
      iconColor: 'white'
    },
    logout: {
      message: 'logged out',
      highlight: 'indigo-2',
      color: 'primary',
      iconColor: 'white'
    },
    add: {
      message: 'added',
      highlight: 'indigo-2',
      color: 'light-green',
      iconColor: 'white'
    },
    edit: {
      message: 'updated',
      highlight: 'amber-2',
      color: 'positive',
      iconColor: 'white'
    },
    delete: {
      message: 'deleted',
      highlight: 'text-indigo-2',
      color: 'negative',
      iconColor: 'white'
    },
    download: {
      message: 'downloaded',
      highlight: 'text-indigo-2'
    }
  })
  function positive (model, action) {
    Notify.create({
      message: `<span class="text-white">
                ${action === 'login' || action === 'logout' ? 'The user ' : 'The '}
                <span class="text-${actionClass.value[action].highlight} text-bold">${model}</span>
                ${action === 'login' || action === 'logout' ? 'has ' : 'has been '}
                <span class="text-${actionClass.value[action].highlight} text-bold">${actionClass.value[action].message}</span>
                </span>`,
      color: actionClass.value[action].color,
      icon: action,
      textColor: actionClass.value[action].iconColor,
      progress: true,
      html: true
    })
  }
  return {
    positive
  }
}
