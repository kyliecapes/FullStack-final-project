import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AISummary from '../components/AISummary'

function timeAgo(timestamp) {
  const now = new Date()
  const then = new Date(timestamp)
  const seconds = Math.floor((now - then) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
  const weeks = Math.floor(days / 7)
  return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
}

export default function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [commenting, setCommenting] = useState(false)

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    if (!error) setPost(data)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    if (!error) setComments(data)
  }

  useEffect(() => {
  fetchPost() // eslint-disable-line
  fetchComments()
  supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
}, [id]) // eslint-disable-line

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single()
    if (!error) setPost(data)
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setCommenting(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('comments').insert([{
      content: newComment,
      post_id: id,
      user_id: user.id
    }])
    if (!error) {
      setNewComment('')
      fetchComments()
    }
    setCommenting(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) navigate('/')
  }

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>
  if (!post) return <div className="text-center py-12 text-gray-400">Post not found</div>

  const isOwner = user && user.id === post.user_id

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#1B2B4B] hover:text-[#C9A84C] font-semibold mb-5 transition">
        ← Back to stories
      </Link>

      {/* Post card */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
          Posted {timeAgo(post.created_at)}
        </p>
        <h1 className="text-3xl font-bold text-[#1B2B4B] mb-4">{post.title}</h1>

        {post.content && (
          <p className="text-gray-600 leading-relaxed mb-5">{post.content}</p>
        )}

        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post"
            className="w-full rounded-xl mb-5 max-h-96 object-cover"
          />
        )}

        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
          <button
            onClick={handleUpvote}
            className="flex items-center gap-2 bg-[#1B2B4B] hover:bg-[#243d6b] text-[#C9A84C] px-5 py-2.5 rounded-xl text-sm font-bold transition"
          >
            ✈ {post.upvotes} upvotes
          </button>

          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/post/${id}/edit`}
                className="text-sm px-4 py-2 rounded-xl border-2 border-[#1B2B4B] text-[#1B2B4B] font-semibold hover:bg-[#1B2B4B] hover:text-white transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-sm px-4 py-2 rounded-xl border-2 border-red-200 text-red-500 font-semibold hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Summary */}
      <AISummary post={post} comments={comments} />

      {/* Comments */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-[#1B2B4B] mb-4">
          Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm mb-4">No comments yet — be the first!</p>
        ) : (
          <div className="flex flex-col gap-4 mb-5">
            {comments.map(comment => (
              <div key={comment.id} className="border-l-4 border-[#C9A84C] pl-4 py-1">
                <p className="text-sm text-gray-700">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-1">{timeAgo(comment.created_at)}</p>
              </div>
            ))}
          </div>
        )}

        {user ? (
          <form onSubmit={handleComment} className="flex flex-col gap-3">
            <textarea
              placeholder="Leave a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition resize-none"
            />
            <button
              type="submit"
              disabled={commenting}
              className="self-end bg-[#C9A84C] text-[#1B2B4B] px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#b8943d] transition"
            >
              {commenting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-400">
            <Link to="/login" className="text-[#1B2B4B] font-semibold hover:text-[#C9A84C] transition">Log in</Link> to leave a comment
          </p>
        )}
      </div>
    </div>
  )
}