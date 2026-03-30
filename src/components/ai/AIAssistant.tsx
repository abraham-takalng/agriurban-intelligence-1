import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  BrainCircuit,
  Maximize2,
  Minimize2,
  User,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'assistant'; content: string };

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am the AgriUrban AI Assistant. How can I help you analyze spatial data, agricultural potential, or disaster risks in Bale Robe today?" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');

    // Mock AI response
    setTimeout(() => {
      let response = "That's an interesting question about spatial intelligence. Currently, I'm analyzing real-time data for that query.";
      
      const input = inputValue.toLowerCase();
      if (input.includes('flood')) {
        response = "I've detected high flood risk in the Northern corridor of Araddaa Miccaa due to heavy rainfall (85mm/hr). I recommend immediate inspection of the primary drainage network.";
      } else if (input.includes('agriculture') || input.includes('crop')) {
        response = "Caffee Donsaa shows the highest agricultural potential (88%) for the current season, specifically for pulse crops, based on soil moisture and slope analysis.";
      } else if (input.includes('investment')) {
        response = "Bolee Tokkummaa is currently the prime investment target with a score of 92%, driven by urban expansion projections for 2030.";
      }

      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/40 border border-white/20 hover:scale-110 transition-transform active:scale-95"
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 md:w-96 bg-neutral-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">AgriUrban AI</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Intelligence Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 size={14} className="text-neutral-400" /> : <Minimize2 size={14} className="text-neutral-400" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={14} className="text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-neutral-950/30">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed flex items-start gap-2 ${
                        msg.role === 'user' 
                          ? 'bg-cyan-600 text-white rounded-tr-none' 
                          : 'bg-white/5 text-neutral-300 border border-white/10 rounded-tl-none'
                      }`}>
                        {msg.role === 'assistant' ? <Bot className="w-4 h-4 mt-0.5 shrink-0" /> : <User className="w-4 h-4 mt-0.5 shrink-0" />}
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 bg-neutral-900/50">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask anything..."
                      className="flex-1 bg-neutral-950 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-cyan-500/50"
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;