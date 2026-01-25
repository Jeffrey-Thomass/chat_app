import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import BorderAnimatedContainer from '../components/BorderAnimatedComponent.jsx'
import { MessageCircle, Mail, Lock, User, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const signup = useAuthStore(state => state.signup)
  const isSigningUp = useAuthStore(state => state.isSigningUp)

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(formData)
  }

  return (
    <div className="relative flex items-center justify-center w-full h-screen px-4 overflow-hidden bg-base-100">

      {/* Ambient glows – SAME as Login */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-5xl h-[700px]">
        <BorderAnimatedContainer>

          <div className="flex h-full w-full overflow-hidden rounded-xl bg-base-100/40 backdrop-blur-lg shadow-2xl border border-white/5">

            {/* LEFT — SIGNUP FORM */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-12 relative z-10">
              <div className="w-full max-w-sm mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4 animate-pulse">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-base-content">Create Account</h2>
                  <p className="text-base-content/60 mt-2">Sign up to get started</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="text"
                        className="input input-bordered w-full pl-10 bg-base-200/50 border-white/10 focus:border-primary focus:bg-base-200/80 transition-all"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="email"
                        className="input input-bordered w-full pl-10 bg-base-200/50 border-white/10 focus:border-primary focus:bg-base-200/80 transition-all"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="password"
                        className="input input-bordered w-full pl-10 bg-base-200/50 border-white/10 focus:border-primary focus:bg-base-200/80 transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full shadow-lg shadow-primary/20"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-base-content/60 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary no-underline hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT — DECORATIVE (same as Login) */}
            <div className="hidden md:flex w-1/2 bg-base-200/50 items-center justify-center p-8 relative border-l border-white/10">

              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 text-center max-w-md">
                <img
                  src="/signup.png"
                  alt="Signup Preview"
                  className="w-full h-auto drop-shadow-2xl rounded-lg mb-6 hover:scale-[1.02] transition-transform duration-500"
                />
                <h3 className="text-xl font-bold text-base-content">Start Your Journey</h3>
                <p className="text-base-content/60 mt-2 text-sm">
                  Create an account and start chatting with friends in real time.
                </p>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}
