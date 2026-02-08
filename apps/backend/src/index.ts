import { Hono } from 'hono'

const app = new Hono()

// API Routes
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono Standalone Worker!',
  })
})

export default app
