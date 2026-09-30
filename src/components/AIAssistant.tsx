import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from './Icon';
import { ASSET_PATHS } from '../config/assets';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: '¡Saludos! Soy Arthur, tu asistente de IA. ¿En qué te puedo ayudar hoy?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Obtener o inicializar ID de sesión persistente durante la navegación
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('arthur_session_id');
    if (existing) return existing;
    const newId = 'session_' + Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem('arthur_session_id', newId);
    return newId;
  });

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/arthur-chat';


  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Respuesta no exitosa de n8n (${response.status})`);
      }

      const textData = await response.text();
      let data: any = {};
      
      try {
        if (textData) {
          data = JSON.parse(textData);
        }
      } catch (parseError) {
        throw new Error(`n8n no devolvió un JSON válido. Respuesta: ${textData.substring(0, 50)}...`);
      }

      const reply = data.reply || data.output || data.text || 'Mis disculpas, el oráculo n8n procesó la solicitud pero no envió texto de vuelta. Verifica si hubo un error dentro de n8n.';

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (error) {
      console.warn('n8n webhook no disponible o en reposo:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '⚔️ Noble estratega, no logro conectar en este momento con el flujo de n8n en ' + N8N_WEBHOOK_URL + '. Asegúrate de encender el workflow en n8n para recibir mi consejo completo.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#EA7301] to-[#ff9d42] text-black shadow-lg shadow-[#EA7301]/30 transition-transform hover:scale-110 active:scale-95 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        title="Abrir Asistente IA Arthur"
      >
        <img src={ASSET_PATHS.logos.brand.kas} alt="Arthur" className="h-10 w-10 rounded-full" />
      </button>

      {/* Panel de Chat */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-[#EA7301]/30 bg-[#140b16] shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-[#EA7301]/20 bg-[#19101c] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#EA7301]/20 to-[#EA7301]/5 p-0.5 border border-[#EA7301]/40">
              <img src={ASSET_PATHS.logos.brand.kas} alt="Arthur" className="h-full w-full rounded-xl object-cover" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg leading-tight">Arthur</h3>
              <p className="text-[10px] text-[#EA7301] font-mono">ASISTENTE IA</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#EA7301] text-black rounded-tr-sm font-medium'
                    : 'bg-[#221824] border border-[#EA7301]/20 text-[#eeddee] rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#221824] border border-[#EA7301]/20 px-4 py-3 shadow-sm">
                <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-[#EA7301]"></span>
                <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-[#EA7301] [animation-delay:0.2s]"></span>
                <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-[#EA7301] [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input de chat */}
        <div className="border-t border-[#EA7301]/20 bg-[#19101c] p-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 pl-3 pr-2 py-2 focus-within:border-[#EA7301]/60 transition-colors">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Habla con Arthur..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EA7301] text-black hover:bg-[#ff9d42] disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
