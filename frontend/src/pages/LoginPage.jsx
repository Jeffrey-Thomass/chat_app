import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import BorderAnimatedContainer from '../components/BorderAnimatedComponent.jsx'
import { MessageCircle, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    // 1. EXACT SAME WRAPPER AS CHATPAGE
    <div className="relative flex items-center justify-center w-full h-screen px-4 overflow-hidden bg-base-100">
      
      {/* 2. AMBIENT BACKGROUND GLOWS (Copied from ChatPage) */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. MAIN LAYOUT CONSTRAINT */}
      <div className="relative w-full max-w-5xl h-[700px]">
        <BorderAnimatedContainer>
          
          {/* INNER GLASS CARD (Matching ChatPage Texture) */}
          <div className="flex h-full w-full overflow-hidden rounded-xl bg-base-100/40 backdrop-blur-lg shadow-2xl border border-white/5">
            
            {/* --- LEFT SIDE: FORM --- */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-12 relative z-10">
              
              <div className="w-full max-w-sm mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4 animate-pulse">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-base-content">Welcome Back</h2>
                  <p className="text-base-content/60 mt-2">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
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
                        type={showPassword ? "text" : "password"}
                        className="input input-bordered w-full pl-10 pr-10 bg-base-200/50 border-white/10 focus:border-primary focus:bg-base-200/80 transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full shadow-lg shadow-primary/20" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-base-content/60 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="link link-primary no-underline hover:underline">
                      Create account
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* --- RIGHT SIDE: DECORATIVE (Visible on md screens) --- */}
            {/* Using base-200/50 similar to the sidebar in ChatPage */}
            <div className="hidden md:flex w-1/2 bg-base-200/50 items-center justify-center p-8 relative border-l border-white/10">
               
               {/* Subtle Grid Pattern (Same as ChatPage) */}
               <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

               <div className="relative z-10 text-center max-w-md">
                 <img
                    src="/login.png" 
                    alt="Login Preview"
                    className="w-full h-auto drop-shadow-2xl rounded-lg mb-6 hover:scale-[1.02] transition-transform duration-500"
                 />
                 <h3 className="text-xl font-bold text-base-content">Join the Community</h3>
                 <p className="text-base-content/60 mt-2 text-sm">
                   Connect with friends, share moments, and stay in touch with our real-time chat platform.
                 </p>
               </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}