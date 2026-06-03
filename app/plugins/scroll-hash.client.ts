export default defineNuxtPlugin((nuxtApp) => {
  const scrollToHash = () => {
    const hash = window.location.hash
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  nuxtApp.hook('page:finish', () => {
    setTimeout(scrollToHash, 100)
  })

  if (import.meta.client) {
    window.addEventListener('hashchange', scrollToHash)
  }
})
