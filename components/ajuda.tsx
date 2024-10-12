'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, ArrowLeft, Mail, Phone } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router';

export function AjudaPageComponent() {
  const { isSignedIn, user } = useUser()
  const [searchTerm, setSearchTerm] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)
  const router = useRouter();

  const faqItems = [
    {
      question: "O que é o Laudos.AI?",
      answer: "Laudos.AI é uma plataforma de inteligência artificial projetada para otimizar a criação de laudos radiológicos. Utilizamos tecnologia de ponta em IA para auxiliar radiologistas na elaboração de laudos mais precisos e eficientes."
    },
    {
      question: "Como o Laudos.AI pode me ajudar?",
      answer: "O Laudos.AI oferece várias funcionalidades para melhorar seu fluxo de trabalho, incluindo estruturação automática de laudos, sugestões de terminologia médica, detecção de inconsistências, geração de resumos, comparação com exames anteriores, integração de diretrizes clínicas, tradução automática e geração de códigos de faturamento."
    },
    {
      question: "Quem pode usar o Laudos.AI?",
      answer: "Atualmente, o Laudos.AI é destinado exclusivamente para radiologistas. É necessário fornecer seu número de CRM (registro médico) durante o cadastro para verificar sua elegibilidade."
    },
    {
      question: "Como faço para me cadastrar?",
      answer: "Para se cadastrar, clique no botão 'Cadastrar' na página inicial. Você precisará fornecer informações como nome completo, e-mail, senha, número de CRM, subespecialidade e volume médio de laudos por semana. Após preencher o formulário, nossa equipe verificará suas informações e aprovará seu cadastro."
    },
    {
      question: "O Laudos.AI é seguro e compatível com as regulamentações de saúde?",
      answer: "Sim, o Laudos.AI foi desenvolvido com foco na segurança e privacidade dos dados. Estamos em conformidade com as regulamentações de saúde, incluindo a LGPD (Lei Geral de Proteção de Dados) no Brasil. Todos os dados são criptografados e armazenados de forma segura."
    },
    {
      question: "Posso personalizar as funcionalidades do Laudos.AI?",
      answer: "Sim, o Laudos.AI oferece opções de personalização. Durante o cadastro, você pode selecionar quais recursos de IA gostaria de utilizar em seus laudos. Além disso, conforme você utiliza a plataforma, ela aprende e se adapta ao seu estilo de trabalho para oferecer sugestões mais relevantes."
    },
    {
      question: "Como posso obter suporte técnico?",
      answer: "Para suporte técnico, você pode entrar em contato conosco através do e-mail suporte@laudos.ai ou pelo chat disponível na plataforma. Nossa equipe de suporte está disponível de segunda a sexta, das 8h às 18h, para ajudar com quaisquer dúvidas ou problemas que você possa ter."
    },
    {
      question: "Qual é o custo do Laudos.AI?",
      answer: "O Laudos.AI oferece diferentes planos de preços para atender às necessidades de diferentes profissionais e instituições. Temos planos mensais e anuais, com opções para uso individual ou para equipes. Para obter informações detalhadas sobre preços, entre em contato com nossa equipe de vendas."
    },
    {
      question: "O Laudos.AI pode ser integrado ao meu sistema atual de RIS/PACS?",
      answer: "Sim, o Laudos.AI foi projetado para ser facilmente integrado aos sistemas RIS/PACS existentes. Nossa equipe técnica trabalhará com você para garantir uma integração suave e eficiente com seu fluxo de trabalho atual."
    },
    {
      question: "Como o Laudos.AI lida com diferentes modalidades de imagem?",
      answer: "O Laudos.AI é versátil e pode lidar com várias modalidades de imagem, incluindo raios-X, TC, RM, ultrassom e mamografia. A IA é treinada em um vasto conjunto de dados de diferentes modalidades para fornecer assistência precisa em diversos tipos de exames."
    }
  ]

  const filteredFAQs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-teal-400">Laudos.AI</Link>
            {isSignedIn ? (
              <div className="flex items-center">
                <span className="mr-4">Olá, {user.firstName}</span>
                <Button onClick={() => router.push('/dashboard')} className="bg-teal-600 hover:bg-teal-700">
                  Dashboard
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={() => router.push('/login')} className="mr-2 bg-teal-600 hover:bg-teal-700">
                  Entrar
                </Button>
                <Button onClick={() => router.push('/signup')} className="bg-gray-600 hover:bg-gray-700">
                  Cadastrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="relative flex-grow flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12 z-10">
        <div className="w-full max-w-4xl space-y-8 sm:space-y-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-3">
              Ajuda Laudos<span className="text-teal-400">.AI</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl">
              Respostas para suas dúvidas sobre o Laudos.AI
            </p>
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar perguntas frequentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border-gray-700 rounded-lg focus:ring-teal-400 focus:border-teal-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left text-base sm:text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center space-y-4">
            <p className="text-lg sm:text-xl text-gray-300">Ainda tem dúvidas?</p>
            <Button 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 font-semibold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-base sm:text-lg"
              onClick={() => setShowContactForm(!showContactForm)}
            >
              Entre em Contato
            </Button>
          </div>
          
          {showContactForm && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Formulário de Contato</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                  <Input id="name" placeholder="Seu nome completo" className="w-full bg-gray-700 text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
                  <Input id="email" type="email" placeholder="seu@email.com" className="w-full bg-gray-700 text-white" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                  <Textarea id="message" placeholder="Descreva sua dúvida ou problema" className="w-full bg-gray-700 text-white" rows={4} />
                </div>
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>
      
      <footer className="relative z-10 w-full px-4 sm:px-6 lg:px-10 py-6 bg-gray-900 text-gray-300 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5" />
            <span>suporte@laudos.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-5 w-5" />
            <span>(11) 1234-5678</span>
          </div>
          <div>
            © 2024 Laudos.AI. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}