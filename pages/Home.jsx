import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy === 'newest' ? 'created_at' : 'upvotes', { ascending: false })
    if (!error) setPosts(data)
    setLoading(false)
  }, [sortBy])

  useEffect(() => {
    fetchPosts() // eslint-disable-line
  }, [fetchPosts])

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const totalUpvotes = posts.reduce((sum, p) => sum + p.upvotes, 0)

  return (
    <div className="relative">

      {/* Background planes */}
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {/* Large plane bottom right */}
  <div
    className="absolute bottom-[-20px] right-[-40px] text-[#1B2B4B] opacity-20 select-none"
    style={{ fontSize: '380px', transform: 'rotate(-20deg)', lineHeight: 1 }}
  >
    ✈
  </div>
  {/* Small plane top left */}
  <div
    className="absolute top-[20px] left-[-40px] text-[#C9A84C] opacity-20 select-none"
    style={{ fontSize: '220px', transform: 'rotate(20deg) scaleX(-1)', lineHeight: 1 }}
  >
    ✈
  </div>
  {/* Small plane bottom left */}
  <div
    className="absolute bottom-[-20px] left-[-40px] text-[#1B2B4B] opacity-20 select-none"
    style={{ fontSize: '250px', transform: 'rotate(15deg)', lineHeight: 1 }}
  >
    ✈
  </div>

</div>
      <div className="relative z-10">
        {/* Hero - Stamp Shape */}
        <div className="flex justify-center mb-8">
          <div
            className="bg-[#1B2B4B] text-white relative px-10 py-10 text-center max-w-2xl w-full"
            style={{
              clipPath: `polygon(
                0% 4%, 4% 4%, 4% 0%,
                8% 0%, 8% 4%, 12% 4%, 12% 0%,
                16% 0%, 16% 4%, 20% 4%, 20% 0%,
                24% 0%, 24% 4%, 28% 4%, 28% 0%,
                32% 0%, 32% 4%, 36% 4%, 36% 0%,
                40% 0%, 40% 4%, 44% 4%, 44% 0%,
                48% 0%, 48% 4%, 52% 4%, 52% 0%,
                56% 0%, 56% 4%, 60% 4%, 60% 0%,
                64% 0%, 64% 4%, 68% 4%, 68% 0%,
                72% 0%, 72% 4%, 76% 4%, 76% 0%,
                80% 0%, 80% 4%, 84% 4%, 84% 0%,
                88% 0%, 88% 4%, 92% 4%, 92% 0%,
                96% 0%, 96% 4%, 100% 4%,
                100% 8%, 96% 8%, 96% 12%, 100% 12%,
                100% 16%, 96% 16%, 96% 20%, 100% 20%,
                100% 24%, 96% 24%, 96% 28%, 100% 28%,
                100% 32%, 96% 32%, 96% 36%, 100% 36%,
                100% 40%, 96% 40%, 96% 44%, 100% 44%,
                100% 48%, 96% 48%, 96% 52%, 100% 52%,
                100% 56%, 96% 56%, 96% 60%, 100% 60%,
                100% 64%, 96% 64%, 96% 68%, 100% 68%,
                100% 72%, 96% 72%, 96% 76%, 100% 76%,
                100% 80%, 96% 80%, 96% 84%, 100% 84%,
                100% 88%, 96% 88%, 96% 92%, 100% 92%,
                100% 96%, 96% 96%, 96% 100%,
                92% 100%, 92% 96%, 88% 96%, 88% 100%,
                84% 100%, 84% 96%, 80% 96%, 80% 100%,
                76% 100%, 76% 96%, 72% 96%, 72% 100%,
                68% 100%, 68% 96%, 64% 96%, 64% 100%,
                60% 100%, 60% 96%, 56% 96%, 56% 100%,
                52% 100%, 52% 96%, 48% 96%, 48% 100%,
                44% 100%, 44% 96%, 40% 96%, 40% 100%,
                36% 100%, 36% 96%, 32% 96%, 32% 100%,
                28% 100%, 28% 96%, 24% 96%, 24% 100%,
                20% 100%, 20% 96%, 16% 96%, 16% 100%,
                12% 100%, 12% 96%, 8% 96%, 8% 100%,
                4% 100%, 4% 96%, 0% 96%,
                0% 92%, 4% 92%, 4% 88%, 0% 88%,
                0% 84%, 4% 84%, 4% 80%, 0% 80%,
                0% 76%, 4% 76%, 4% 72%, 0% 72%,
                0% 68%, 4% 68%, 4% 64%, 0% 64%,
                0% 60%, 4% 60%, 4% 56%, 0% 56%,
                0% 52%, 4% 52%, 4% 48%, 0% 48%,
                0% 44%, 4% 44%, 4% 40%, 0% 40%,
                0% 36%, 4% 36%, 4% 32%, 0% 32%,
                0% 28%, 4% 28%, 4% 24%, 0% 24%,
                0% 20%, 4% 20%, 4% 16%, 0% 16%,
                0% 12%, 4% 12%, 4% 8%, 0% 8%
              )`
            }}
          >
            <div className="border-4 border-[#C9A84C] border-dashed px-8 py-8">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">
                ✈ Welcome to StampedIn
              </p>
              <h1
                className="text-4xl font-bold mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Where Every Trip <br />
                <span className="text-[#C9A84C]">Tells a Story</span>
              </h1>
              <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
                Share your adventures, discover hidden gems, and connect with fellow travelers from around the world.
              </p>

              <div className="flex justify-center gap-6">
                <div className="bg-white bg-opacity-10 rounded-2xl px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-[#C9A84C]">{posts.length}</p>
                  <p className="text-xs text-gray-300">Stories</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-2xl px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-[#C9A84C]">{totalUpvotes}</p>
                  <p className="text-xs text-gray-300">Upvotes</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-2xl px-4 py-3 text-center min-w-[80px]">
                  <p className="text-2xl font-bold text-[#C9A84C]">{posts.length > 0 ? '✈' : '✈'}</p>
                  <p className="text-xs text-gray-300">Global</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search destinations or stories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                sortBy === 'newest'
                  ? 'bg-[#1B2B4B] text-white shadow-md'
                  : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#1B2B4B]'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy('upvotes')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                sortBy === 'upvotes'
                  ? 'bg-[#1B2B4B] text-white shadow-md'
                  : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#1B2B4B]'
              }`}
            >
              Popular
            </button>
          </div>
        </div>

        {/* Section label */}
        {!loading && filtered.length > 0 && (
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            {filtered.length} {filtered.length === 1 ? 'Story' : 'Stories'} Found
          </p>
        )}

        {/* Posts */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">Loading stories...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-600 font-bold mb-1">No stories found</p>
            <p className="text-gray-400 text-sm">Be the first to share a travel story!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}