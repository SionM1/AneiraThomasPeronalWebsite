import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../keystatic.config'

const keystaticHandlers = makeRouteHandler({ config })

export async function GET(
  request: Request,
  ctx: { params: Promise<Record<string, string | string[]>> }
) {
  console.log('[keystatic] GET', request.url)
  console.log('[keystatic] x-forwarded-host:', request.headers.get('x-forwarded-host'))
  console.log('[keystatic] x-forwarded-proto:', request.headers.get('x-forwarded-proto'))
  console.log('[keystatic] CLIENT_ID set:', !!process.env.KEYSTATIC_GITHUB_CLIENT_ID)
  console.log('[keystatic] CLIENT_SECRET set:', !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET)
  console.log('[keystatic] SECRET set:', !!process.env.KEYSTATIC_SECRET)
  return keystaticHandlers.GET(request, ctx)
}

export async function POST(
  request: Request,
  ctx: { params: Promise<Record<string, string | string[]>> }
) {
  console.log('[keystatic] POST', request.url)
  return keystaticHandlers.POST(request, ctx)
}
