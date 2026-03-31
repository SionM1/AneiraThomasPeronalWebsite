import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../keystatic.config'

const keystaticHandlers = makeRouteHandler({ config })

// Vercel runs behind a reverse proxy so request.url shows localhost instead of
// the real domain. Keystatic uses request.url to build the OAuth redirect_uri,
// which causes "Authorization failed" because the URI doesn't match GitHub's
// registered callback. We fix it by rewriting the URL using the forwarded headers
// that Vercel always sets. See: https://github.com/Thinkmill/keystatic/issues/1022
function withCorrectUrl(
  handler: (
    req: Request,
    ctx: { params: Promise<Record<string, string | string[]>> }
  ) => Promise<Response>
) {
  return (request: Request, ctx: { params: Promise<Record<string, string | string[]>> }) => {
    const forwardedHost = request.headers.get('x-forwarded-host')
    const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'

    if (forwardedHost) {
      const url = new URL(request.url)
      url.protocol = forwardedProto + ':'
      url.host = forwardedHost

      const fixedRequest = new Request(url.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      })

      return handler(fixedRequest, ctx)
    }

    return handler(request, ctx)
  }
}

export const GET = withCorrectUrl(keystaticHandlers.GET)
export const POST = withCorrectUrl(keystaticHandlers.POST)
