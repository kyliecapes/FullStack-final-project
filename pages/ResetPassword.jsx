import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password'
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a password reset link!')
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen">

      {/* Background planes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute bottom-[-20px] right-[-40px] text-[#1B2B4B] opacity-20 select-none"
          style={{ fontSize: '380px', transform: 'rotate(-20deg)', lineHeight: 1 }}
        >✈</div>
        <div
          className="absolute top-[20px] left-[-40px] text-[#C9A84C] opacity-20 select-none"
          style={{ fontSize: '220px', transform: 'rotate(20deg) scaleX(-1)', lineHeight: 1 }}
        >✈</div>
        <div
          className="absolute bottom-[-20px] left-[-40px] text-[#1B2B4B] opacity-20 select-none"
          style={{ fontSize: '250px', transform: 'rotate(15deg)', lineHeight: 1 }}
        >✈</div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Stamp header */}
        <div
          className="bg-[#1B2B4B] text-white text-center px-8 py-8 mb-6"
          style={{
            clipPath: `polygon(
              0% 4%, 4% 4%, 4% 0%, 8% 0%, 8% 4%, 12% 4%, 12% 0%,
              16% 0%, 16% 4%, 20% 4%, 20% 0%, 24% 0%, 24% 4%, 28% 4%, 28% 0%,
              32% 0%, 32% 4%, 36% 4%, 36% 0%, 40% 0%, 40% 4%, 44% 4%, 44% 0%,
              48% 0%, 48% 4%, 52% 4%, 52% 0%, 56% 0%, 56% 4%, 60% 4%, 60% 0%,
              64% 0%, 64% 4%, 68% 4%, 68% 0%, 72% 0%, 72% 4%, 76% 4%, 76% 0%,
              80% 0%, 80% 4%, 84% 4%, 84% 0%, 88% 0%, 88% 4%, 92% 4%, 92% 0%,
              96% 0%, 96% 4%, 100% 4%,
              100% 8%, 96% 8%, 96% 12%, 100% 12%, 100% 16%, 96% 16%, 96% 20%, 100% 20%,
              100% 24%, 96% 24%, 96% 28%, 100% 28%, 100% 32%, 96% 32%, 96% 36%, 100% 36%,
              100% 40%, 96% 40%, 96% 44%, 100% 44%, 100% 48%, 96% 48%, 96% 52%, 100% 52%,
              100% 56%, 96% 56%, 96% 60%, 100% 60%, 100% 64%, 96% 64%, 96% 68%, 100% 68%,
              100% 72%, 96% 72%, 96% 76%, 100% 76%, 100% 80%, 96% 80%, 96% 84%, 100% 84%,
              100% 88%, 96% 88%, 96% 92%, 100% 92%, 100% 96%, 96% 96%, 96% 100%,
              92% 100%, 92% 96%, 88% 96%, 88% 100%, 84% 100%, 84% 96%, 80% 96%, 80% 100%,
              76% 100%, 76% 96%, 72% 96%, 72% 100%, 68% 100%, 68% 96%, 64% 96%, 64% 100%,
              60% 100%, 60% 96%, 56% 96%, 56% 100%, 52% 100%, 52% 96%, 48% 96%, 48% 100%,
              44% 100%, 44% 96%, 40% 96%, 40% 100%, 36% 100%, 36% 96%, 32% 96%, 32% 100%,
              28% 100%, 28% 96%, 24% 96%, 24% 100%, 20% 100%, 20% 96%, 16% 96%, 16% 100%,
              12% 100%, 12% 96%, 8% 96%, 8% 100%, 4% 100%, 4% 96%, 0% 96%,
              0% 92%, 4% 92%, 4% 88%, 0% 88%, 0% 84%, 4% 84%, 4% 80%, 0% 80%,
              0% 76%, 4% 76%, 4% 72%, 0% 72%, 0% 68%, 4% 68%, 4% 64%, 0% 64%,
              0% 60%, 4% 60%, 4% 56%, 0% 56%, 0% 52%, 4% 52%, 4% 48%, 0% 48%,
              0% 44%, 4% 44%, 4% 40%, 0% 40%, 0% 36%, 4% 36%, 4% 32%, 0% 32%,
              0% 28%, 4% 28%, 4% 24%, 0% 24%, 0% 20%, 4% 20%, 4% 16%, 0% 16%,
              0% 12%, 4% 12%, 4% 8%, 0% 8%
            )`
          }}
        >
          <div className="border-4 border-[#C9A84C] border-dashed px-6 py-6">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">
              ✈ StampedIn
            </p>
            <h1
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reset Password
            </h1>
            <p className="text-gray-300 text-sm">We'll send you a reset link</p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-[#1B2B4B] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1B2B4B] transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1B2B4B] text-white rounded-xl py-3 text-sm font-bold hover:bg-[#243d6b] transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : '✈ Send Reset Link'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Remember your password?{' '}
            <Link to="/login" className="text-[#C9A84C] font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}