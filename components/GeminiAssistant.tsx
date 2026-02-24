import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { BUSINESS_DRIVERS, NEXT_SPRINT_DELIVERABLES } from '../constants';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Olá! Sou a IA do projeto Inteli x ASIS. Pergunte-me sobre os direcionadores (DN1-DN5) ou o que estamos entregando hoje!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct context from constants
      const context = JSON.stringify({ drivers: BUSINESS_DRIVERS, nextSteps: NEXT_SPRINT_DELIVERABLES });
      const systemInstruction = `
        Você é um assistente técnico especializado no projeto acadêmico entre Inteli e ASIS TaxTech (Módulo Quality as Code).
        
        Contexto do Projeto:
        - Objetivo: Criar um sistema resiliente com qualidade como ativo de software.
        - Sprint 1 (HOJE): Entrega dos 5 Direcionadores de Negócio (DN1-DN5). Alguns estão Implementados (DN1, DN5) e outros em Fase Final/Fazendo (DN2, DN3, DN4).
        - Sprint 2 (FUTURO): Requisitos Funcionais e Não Funcionais como Código.
        
        Dados Técnicos: ${context}
        
        Responda de forma curta e motivadora. Aja como um engenheiro senior apoiando o apresentador.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text || "Desculpe, não consegui processar a resposta.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Erro ao conectar com a IA. Verifique a chave de API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!process.env.API_KEY) return null;

  return (
    <>
      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-none shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} bg-emerald-600 text-white`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-slate-900 border border-emerald-500/30 rounded-none shadow-2xl transition-all duration-500 transform origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}`} style={{ height: '500px' }}>
        
        {/* Header */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Bot className="text-emerald-400" size={20} />
            <h3 className="font-semibold text-slate-100 text-sm">Tech Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-none px-4 py-2 text-sm ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-none' 
                  : 'bg-slate-800 text-slate-200 rounded-none border border-slate-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-none px-4 py-2 rounded-none border border-slate-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre a Sprint..."
            className="flex-1 bg-slate-800 text-white text-sm rounded-none px-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-slate-700"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 bg-emerald-600 text-white rounded-none hover:bg-emerald-500 transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default GeminiAssistant;