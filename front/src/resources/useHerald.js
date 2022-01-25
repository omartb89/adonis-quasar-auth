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
      highlight: 'blue-2',
      color: 'grey-9',
      iconColor: 'blue-4'
    },
    logout: {
      message: 'logged out',
      highlight: 'blue-2',
      color: 'grey-9',
      iconColor: 'blue-4'
    },
    add: {
      message: 'added',
      highlight: 'light-green-2',
      color: 'grey-9',
      iconColor: 'light-green-6'
    },
    edit: {
      message: 'updated',
      highlight: 'amber-2',
      color: 'grey-9',
      iconColor: 'amber-6'
    },
    delete: {
      message: 'deleted',
      highlight: 'red-2',
      color: 'grey-9',
      iconColor: 'red-4'
    },
    download: {
      message: 'downloaded',
      highlight: 'deep-purple-2',
      color: 'grey-9',
      iconColor: 'deep-purple-4'
    },
    upload: {
      message: 'uploaded',
      highlight: 'deep-orange-2',
      color: 'grey-9',
      iconColor: 'deep-orange-4'
    }
  })
  function positive (model, action, target) {
    Notify.create({
      message: `<span class="text-white">
                The
                <span class="text-${actionClass.value[action].highlight} text-bold">${model} </span>
                <span class="text-${actionClass.value[action].iconColor} text-bold">${target} </span>
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
  function negative (message, code, error) {
    Notify.create({
      message: `${error ? 'Error:' : 'Warning'} ${message}, (${code})`,
      type: error ? 'negative' : 'warning'
    })
  }
  return {
    positive,
    negative
  }
}
