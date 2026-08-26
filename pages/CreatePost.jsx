import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('You must be logged in to create a post')
      setLoading(false)
      return
    }
    const { data, error } = await supabase.from('posts').insert([{
      title,
      content: content || null,
      image_url: imageUrl || null,
      upvotes: 0,
      user_id: user.id
    }]).select().single()
    if (error) {
      setError(error.message)
    } else {
      navigate(`/post/${data.id}`)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B] mb-1">Share a Story </h1>
        <p className="text-gray-500 text-sm">Tell the world about your adventure</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-bold text-[#1B2B4B] mb-1.5">Title *</label>
          <input
            type="text"
            placeholder="e.g. 2 weeks backpacking through Southeast Asia"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1B2B4B] mb-1.5">Content <span className="font-normal text-gray-400">(optional)</span></label>
          <textarea
            placeholder="Share the details of your trip..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={5}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1B2B4B] mb-1.5">Image URL <span className="font-normal text-gray-400">(optional)</span></label>
          <input
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1B2B4B] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#243d6b] transition disabled:opacity-50"
        >
          {loading ? 'Posting...' : '✈ Create Post'}
        </button>
      </form>
    </div>
  )
}