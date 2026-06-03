import { isPlatformSlug } from '~/constants/platforms'

export default defineNuxtRouteMiddleware((to) => {
  const slug = to.params.platform
  if (typeof slug !== 'string' || !isPlatformSlug(slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Platform not found' })
  }
})
