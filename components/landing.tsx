'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion, useAnimationControls, Variants, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, MessageCircle, Clock, ArrowRight, Menu, X, Brain, FileText, TrendingUp, Bot, ChevronRight, Calendar, User, AlertCircle, Bone, Check, Zap, Shield } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import PricingCard from '@/components/PricingCard'
import { toast } from '@/components/ui/use-toast'

// ... rest of the file remains the same

export default function RadiologyReportingLandingPage() {
  // ... existing code

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-300">
      {/* ... existing JSX */}
    </div>
  )
}