import { Notify } from 'quasar'
import { ref } from 'vue'
export const useHerald = () => {
  const actionClass = ref({
    login: {
      message: 'logged in',
      highlight: 'lime-2',
      color: 'grey-9',
      iconColor: 'lime-4'
    },
    logout: {
      message: 'logged out',
      highlight: 'light-blue-2',
      color: 'grey-9',
      iconColor: 'light-blue-4'
    },
    add: {
      message: 'added',
      highlight: 'light-green-2',
      color: 'grey-9',
      iconColor: 'light-green-4'
    },
    edit: {
      message: 'updated',
      highlight: 'yellow-2',
      color: 'grey-9',
      iconColor: 'yellow-4'
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
    },
    error: {
      message: 'Error: ',
      highlight: 'red-2',
      color: 'grey-9',
      iconColor: 'red-4'
    },
    warning: {
      message: 'Warning: ',
      highlight: 'amber-2',
      color: 'grey-9',
      iconColor: 'amber-4'
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
  function negative (report, action, code) {
    Notify.create({
      message: `<span class="text-white">
                <span class="text-${actionClass.value[action].highlight} text-bold">${actionClass.value[action].message} </span>
                ${report}
                </span>` + (code
        ? `<span class="text-white">, (<span class="text-${actionClass.value[action].iconColor} text-bold">${code}</span>)</span>` : ''),
      color: actionClass.value[action].color,
      icon: action,
      textColor: actionClass.value[action].iconColor,
      progress: true,
      html: true
    })
  }
  function mailer (to) {
    Notify.create({
      message: `<span class="text-white">
                A mail has been sent to <span class="text-pink-2 text-bold">${to}</span>
                </span>`,
      color: 'grey-9',
      icon: 'mail',
      textColor: 'pink-4',
      progress: true,
      html: true
    })
  }
  function info (message) {
    Notify.create({
      message: `<span class="text-white">${message}</span>`,
      color: 'grey-9',
      icon: 'info',
      textColor: 'blue-4',
      progress: true,
      html: true
    })
  }
  return {
    positive,
    negative,
    mailer,
    info
  }
}
