import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="bg-[#1B2B4B] text-white px-8 py-4 flex items-center justify-between shadow-lg">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-[#C9A84C] text-2xl">✈</span>
        <span className="font-bold text-xl tracking-wide text-white">StampedIn</span>
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="text-gray-300 hover:text-[#C9A84C] transition">Home</Link>
        {user ? (
          <>
            <Link to="/create" className="text-gray-300 hover:text-[#C9A84C] transition">Create Post</Link>
            <button
              onClick={handleLogout}
              className="bg-[#C9A84C] text-[#1B2B4B] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#b8943d] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-[#C9A84C] transition">Log In</Link>
            <Link
              to="/signup"
              className="bg-[#C9A84C] text-[#1B2B4B] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#b8943d] transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}