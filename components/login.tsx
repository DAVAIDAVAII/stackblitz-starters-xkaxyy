'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const translations = {
  pt: {
    help: "Ajuda",
    loginTitle: "Entrar no Laudos.AI",
    loginDescription: "Acesse a plataforma de laudos",
    email: "E-mail",
    password: "Senha",
    login: "Entrar",
    noAccount: "Não tem uma conta?",
    signUp: "Cadastre-se",
    forgotPassword: "Esqueceu a senha?",
    magicLink: "Entrar com Magic Link",
  },
  en: {
    help: "Help",
    loginTitle: "Login to Laudos.AI",
    loginDescription: "Access the medical report platform",
    email: "Email",
    password: "Password",
    login: "Log In",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    forgotPassword: "Forgot password?",
    magicLink: "Sign in with Magic Link",
  }
}

export function LaudosAiLogin() {
  const [lang, setLang] = useState('pt')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const t = translations[lang]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans relative overflow-hidden">
      <main className="relative flex-grow flex flex-col items-center justify-center px-6 z-10">
        <div className="w-full max-w-lg space-y-10">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight mb-3">
              {t.loginTitle}
            </h1>
            <p className="text-gray-300 text-xl">
              {t.loginDescription}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 text-white"
              />
            </div>
            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 text-white"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              {t.login}
            </Button>
          </form>
          <div className="text-center">
            <p>{t.noAccount} <Link href="/signup" className="text-teal-400 hover:underline">{t.signUp}</Link></p>
            <p className="mt-2"><Link href="/forgot-password" className="text-teal-400 hover:underline">{t.forgotPassword}</Link></p>
          </div>
        </div>
      </main>
    </div>
  )
}