'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation'

// ... (keep existing translations)

export function LaudosAiSignup() {
  // ... (keep existing state)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Account created successfully",
          description: "You can now log in with your credentials.",
        })
        router.push('/login')
      } else {
        const data = await response.json()
        toast({
          title: "Error creating account",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast({
        title: "Error creating account",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  // ... (keep existing JSX and functions)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white font-sans relative overflow-hidden">
      {/* ... (keep existing JSX) ... */}
      
      <main className="relative flex-grow flex flex-col items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-2xl space-y-8">
          {/* ... (keep existing JSX) ... */}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... (keep existing form fields) ... */}
            
            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline" className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50">
                  {t.previous}
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={nextStep} className="ml-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700">
                  {t.next}
                </Button>
              ) : (
                <Button type="submit" className="ml-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700">
                  {t.signup}
                </Button>
              )}
            </div>
          </form>
          
          {/* ... (keep existing JSX) ... */}
        </div>
      </main>
    </div>
  )
}