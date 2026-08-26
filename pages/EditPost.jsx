import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) {
        setTitle(data.title)
        setContent(data.content || '')
        setImageUrl(data.image_url || '')
      }
      setLoading(false)
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const { error } = await supabase
      .from('posts')
      .update({ title, content: content || null, image_url: imageUrl || null })
      .eq('id', id)
    if (error) {
      setError(error.message)
    } else {
      navigate(`/post/${id}`)
    }
    setSaving(false)
  }

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B] mb-1">Edit Story</h1>
        <p className="text-gray-500 text-sm">Update your travel story</p>
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
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1B2B4B] mb-1.5">Content <span className="font-normal text-gray-400">(optional)</span></label>
          <textarea
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
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#1B2B4B] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#243d6b] transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : '✈ Update Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            className="flex-1 border-2 border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-bold hover:border-[#1B2B4B] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}