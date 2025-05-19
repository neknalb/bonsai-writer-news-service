import { Hono } from 'hono'
import { NewsEntry, getNewsData, getAvailableDates } from "./newsData.ts"


// Interface for API response
interface WhatsNewResponse {
  date: string
  news: NewsEntry | null
}

// Create Hono app
const app = new Hono()

// Middleware for CORS (if needed)
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET')
  c.header('Access-Control-Allow-Headers', 'Content-Type')
  await next()
})

// Utility function for date validation
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

// Root route
app.get('/', (c) => {
  return c.json({
    message: 'Whats-New API',
    version: '1.0.0',
    endpoints: {
      'GET /whats-new/:date': 'Get news for a specific date (YYYY-MM-DD)'
    }
  })
})

// Main route for news queries
app.get('/whats-new/:date', (c) => {
  const date = c.req.param('date')
  
  // Date validation
  if (!isValidDate(date)) {
    return c.json({
      error: 'Invalid date format. Please use YYYY-MM-DD format.'
    }, 400)
  }
  
  // Search for news for the given date
  const news = getNewsData(date)
  
  if (!news) {
    return c.json({
      error: `No news found for date ${date}`,
      date: date
    }, 404)
  }
  
  const response: WhatsNewResponse = {
    date: date,
    news: news
  }
  
  return c.json(response)
})

// Route for all available dates
app.get('/whats-new', (c) => {
  const availableDates = getAvailableDates()
  return c.json({
    message: 'Available dates',
    dates: availableDates,
    total: availableDates.length
  })
})

// Error handling for unknown routes
app.notFound((c) => {
  return c.json({
    error: 'Route not found',
    message: 'Use /whats-new/:date to get news for a specific date'
  }, 404)
})

// Export app for testing
export { app }

// Start server
const port = 8000
console.log(`🚀 Whats-New API running on http://localhost:${port}`)

Deno.serve({ port }, app.fetch)