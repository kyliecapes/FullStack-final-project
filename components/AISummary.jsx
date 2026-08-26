import { useState } from 'react'

export default function AISummary({ post, comments }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateSummary = async () => {
    setLoading(true)
    setError(null)

    const commentText = comments.length > 0
      ? comments.map(c => `- ${c.content}`).join('\n')
      : 'No comments yet.'

    const prompt = `You are summarizing a travel forum post for the app StampedIn.

Here is the post:
Title: ${post.title}
Content: ${post.content || 'No description provided.'}
Upvotes: ${post.upvotes}
Number of comments: ${comments.length}
Comments:
${commentText}

Please write a short, friendly "Trip Report" summary (3-4 sentences max) that captures:
- What the trip or story is about
- The overall community reaction based on upvotes and comments
- Any highlights or themes from the comments

Keep the tone warm, casual, and travel-inspired. Start with a passport stamp emoji.`

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'StampedIn'
        },
        body: JSON.stringify({
          model: 'google/gemma-3-4b-it:free',
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await response.json()
      console.log('API response:', data)

      const text = data?.choices?.[0]?.message?.content
      if (text) {
        setSummary(text)
      } else {
        setError('Could not generate summary.')
      }
    } catch {
      setError('Failed to connect to AI. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg"></span>
          <h2 className="text-lg font-semibold text-gray-800">AI Trip Report</h2>
        </div>
        {!summary && (
          <button
            onClick={generateSummary}
            disabled={loading}
            className="bg-[#1B2B4B] text-[#C9A84C] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#243d6b] transition disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Summary'}
          </button>
        )}
        {summary && (
          <button
            onClick={generateSummary}
            disabled={loading}
            className="bg-[#f5f0e8] border border-[#C9A84C] rounded-xl p-4"
          >
            {loading ? 'Regenerating...' : 'Regenerate'}
          </button>
        )}
      </div>

      {!summary && !loading && !error && (
        <p className="text-sm text-gray-400">
          Click "Generate Summary" to get an AI-powered overview of this trip story including comments and community reaction.
        </p>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          Generating your trip report...
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {summary && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  )
}