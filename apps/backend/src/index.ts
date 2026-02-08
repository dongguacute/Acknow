import { Hono } from 'hono'

type Bindings = {
  ASSETS: {
    fetch: typeof fetch
  }
}

const app = new Hono<{ Bindings: Bindings }>()

// API Routes
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString(),
  })
})

// Fallback to static assets or frontend dev server
app.all('*', async (c) => {
  // If ASSETS binding is available (Production/Wrangler), use it
  if (c.env.ASSETS) {
    return c.env.ASSETS.fetch(c.req.raw)
  }

  // In local development without Wrangler (e.g., vite dev), 
  // we can proxy to the frontend dev server
  try {
    const url = new URL(c.req.url)
    url.hostname = 'localhost'
    url.port = '5173' // React Router dev server port
    
    // Create a new request to avoid header conflicts (like Host)
    const proxyRequest = new Request(url.toString(), {
      method: c.req.method,
      headers: c.req.raw.headers,
      body: c.req.raw.body,
      // @ts-ignore - duplex is required for streaming bodies in some environments
      duplex: 'half'
    })
    
    return fetch(proxyRequest)
  } catch (e) {
    return c.text('Frontend dev server not found at localhost:5173. Make sure it is running.', 502)
  }
})

export default app
