import { TYPE_STRING, GENERAL_ERROR } from './constants'

const handleResponse = async (response) => {
  if (!response?.ok) {
    const error = await response.json()

    throw new Error(`${response?.status} ${error?.status_message || error?.errors[0] || GENERAL_ERROR}`)
  }

  return response.json()
}


export const fetchData = (url = '', { ...options }) => {
  return fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  })
    .then(response => handleResponse(response))
}


export const formatDate = (date) => {
  if (!date || typeof date !== TYPE_STRING) {
    return "-"
  }

  return date.split('-').reverse().join('-')
}


export const debounce = (func, wait = 0) => {
  let timer

  return (...args) => {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, wait)
  }
}


export const truncate = (text, maxLength = 25) => {
  if (!text || typeof text !== TYPE_STRING) return

  return text.length > maxLength
    ? `${text.substring(0, maxLength)}…`
    : text
}
