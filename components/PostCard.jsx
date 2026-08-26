import { Link } from 'react-router-dom'

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

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="block group">
      <div className="bg-white border-2 border-transparent rounded-2xl p-5 hover:border-[#C9A84C] hover:shadow-lg transition-all duration-200 flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-[#1B2B4B] rounded-xl flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="#C9A84C" className="w-6 h-6">
            <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
            {timeAgo(post.created_at)}
          </p>
          <h2 className="text-base font-bold text-[#1B2B4B] group-hover:text-[#C9A84C] transition-colors truncate">
            {post.title}
          </h2>
        </div>

        {/* Upvotes */}
        <div className="flex-shrink-0">
          <span className="bg-[#1B2B4B] text-[#C9A84C] text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
            ✈ {post.upvotes}
          </span>
        </div>
      </div>
    </Link>
  )
}