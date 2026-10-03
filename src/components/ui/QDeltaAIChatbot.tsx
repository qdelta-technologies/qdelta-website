"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Copy,
  Check,
  User,
  ExternalLink,
  MessageSquare,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  elapsedMs?: number;
  isRateLimited?: boolean;
}

const QUICK_PROMPTS = [
  "What services does QDelta offer?",
  "Who are the founders of QDelta?",
  "Tell me about the Aural Roast case study",
  "How does your 4-phase process work?",
  "How can I book a discovery call?",
];

const API_ENDPOINT = "https://qdelta-ai.qdelta-work.workers.dev/chat";
const API_SECRET = "9eeaee6d55e9bd8ad5054f9cbefaac7a1ca74797482509590ec4049a837e9536";

export default function QDeltaAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => textareaRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isLoading]);

  // Adjust textarea height automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const sendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: promptText,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    const startTime = performance.now();

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_SECRET}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const elapsedMs = Math.round(performance.now() - startTime);
      const data = await response.json();

      // Check for rate limit response (HTTP 429 or rateLimited flag)
      if (response.status === 429 || data.rateLimited) {
        setRateLimitRemaining(0);
        const rateLimitMessage: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content:
            data.response ||
            data.error ||
            "✨ Thank you for contacting QDelta! You have reached our complimentary session limit of 10 prompts per hour. Our team has received your inquiry and will be back in touch with you shortly. If you need immediate assistance, please connect with us directly at contact@qdelta.in or visit https://www.qdelta.in.",
          timestamp: Date.now(),
          elapsedMs,
          isRateLimited: true,
        };
        setMessages((prev) => [...prev, rateLimitMessage]);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Request failed (${response.status})`);
      }

      if (data.rateLimit?.remaining !== undefined) {
        setRateLimitRemaining(data.rateLimit.remaining);
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.response || "No response received.",
        timestamp: Date.now(),
        elapsedMs,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network error";
      const failureMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `Sorry, we couldn't process your request right now: ${errorMessage}. Please try again or reach out at hello@qdelta.in.`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, failureMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Helper to format basic markdown-style text (bold, bullet points, headers)
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold headers or numbered items
      if (line.startsWith("### ") || line.startsWith("## ")) {
        return (
          <h4 key={idx} className="font-semibold text-white mt-2.5 mb-1 text-sm tracking-tight">
            {line.replace(/^#+\s*/, "")}
          </h4>
        );
      }
      // Bullet items
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        const bulletText = line.trim().replace(/^[-•]\s*/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-zinc-300 text-xs sm:text-[13px] leading-relaxed">
            {renderBoldText(bulletText)}
          </li>
        );
      }
      // Blank lines
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-zinc-200 text-xs sm:text-[13px] leading-relaxed">
          {renderBoldText(line)}
        </p>
      );
    });
  };

  const renderBoldText = (str: string) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* ======================================================= */}
      {/* FLOATING TRIGGER BUTTON (BOTTOM-LEFT DOCK)              */}
      {/* ======================================================= */}
      <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close QDelta AI Assistant" : "Open QDelta AI Assistant"}
          className={`group flex h-11 sm:h-12 items-center rounded-full border px-3 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 ease-out focus:outline-none ${
            isOpen
              ? "border-[#F5B800] bg-[#0E0E14] text-[#F5B800] shadow-[0_0_25px_rgba(245,184,0,0.35)]"
              : "border-white/15 bg-[#0B0E12]/90 text-white hover:border-[#F5B800]/60 hover:bg-[#0E0E14] hover:shadow-[0_0_24px_rgba(245,184,0,0.25)] hover:pr-4.5 hover:pl-3.5"
          }`}
        >
          {/* Logo Tile with Gold Glow Accent */}
          <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black border border-white/20 overflow-hidden shadow-inner">
            <Image
              src="/images/qdelta-icon.png"
              alt="QDelta AI"
              width={32}
              height={32}
              className="h-full w-full object-contain p-0.5"
            />
            {/* Pulsing Emerald Edge Indicator */}
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-black animate-pulse" />
          </div>

          {/* Trigger Label */}
          {isOpen ? (
            <span className="pl-2.5 text-xs sm:text-[13px] font-semibold text-white flex items-center gap-1.5">
              <span>Close AI</span>
              <X className="w-3.5 h-3.5 text-[#F5B800]" />
            </span>
          ) : (
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs sm:text-[13px] font-semibold text-white opacity-0 transition-all duration-300 ease-out group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-2.5 flex items-center gap-1.5">
              <span>Ask QDelta AI</span>
              <Sparkles className="w-3 h-3 text-[#F5B800]" />
            </span>
          )}
        </button>
      </div>

      {/* ======================================================= */}
      {/* LUXURY OBSIDIAN CHAT MODAL / DRAWER                     */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-19 left-4 sm:bottom-22 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] md:w-[440px] h-[580px] max-h-[82vh] rounded-2xl sm:rounded-3xl border border-white/12 bg-[#08080D]/95 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden text-white font-sans selection:bg-[#F5B800] selection:text-black"
          >
            {/* Top Amber Horizon Accent Line */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/50 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] px-4 py-3.5 sm:px-5 sm:py-4 bg-[#0B0E12]/80">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-lg bg-black border border-white/20 overflow-hidden shadow-sm flex items-center justify-center">
                  <Image
                    src="/images/qdelta-icon.png"
                    alt="QDelta"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain p-0.5"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base tracking-tight text-white">
                      QDelta AI
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Edge Online
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono tracking-tight">
                    Official Brand Intelligence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Clear Chat */}
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close AI Assistant"
                  aria-label="Close AI Assistant"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 space-y-4 text-xs sm:text-sm">
              {messages.length === 0 ? (
                /* Welcome Greeting State */
                <div className="flex flex-col items-center justify-center text-center py-6 px-2">
                  <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-black border border-white/15 shadow-[0_0_30px_rgba(245,184,0,0.2)]">
                    <Image
                      src="/images/qdelta-icon.png"
                      alt="QDelta Logo"
                      width={48}
                      height={48}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    How can QDelta elevate your brand?
                  </h3>
                  <p className="mt-1.5 max-w-xs text-xs text-zinc-400 leading-relaxed">
                    Ask me about our web engineering, custom 3D experiences, case studies, or schedule a founder discovery call.
                  </p>

                  {/* Quick Starter Prompts */}
                  <div className="mt-5 w-full flex flex-col gap-1.5 text-left">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1 px-1">
                      Suggested Inquiries
                    </span>
                    {QUICK_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(prompt)}
                        className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-xs text-zinc-300 hover:border-[#F5B800]/40 hover:bg-[#F5B800]/[0.06] hover:text-white transition-all duration-200 cursor-pointer text-left"
                      >
                        <span>{prompt}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#F5B800] transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Dynamic Messages */
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 sm:gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar Tile */}
                    <div
                      className={`h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg flex items-center justify-center overflow-hidden border shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#1E293B] border-white/10 text-white"
                          : "bg-black border-white/20 text-[#F5B800]"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-zinc-300" />
                      ) : (
                        <Image
                          src="/images/qdelta-icon.png"
                          alt="QDelta"
                          width={28}
                          height={28}
                          className="h-full w-full object-contain p-0.5"
                        />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`relative max-w-[85%] rounded-2xl px-4 py-3 sm:px-4.5 sm:py-3.5 shadow-md ${
                        msg.role === "user"
                          ? "bg-white text-zinc-900 font-medium rounded-tr-none text-xs sm:text-[13px] leading-relaxed"
                          : msg.isRateLimited
                          ? "bg-[#161208] border border-[#F5B800]/30 text-zinc-200 rounded-tl-none"
                          : "bg-[#0E0E14] border border-white/[0.08] text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      {msg.isRateLimited && (
                        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-mono text-[#F5B800]">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Session Limit Reached (10 Prompts / 1 Hr)</span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="space-y-1">
                        {renderFormattedText(msg.content)}
                      </div>

                      {/* Action Bar for AI Responses */}
                      {msg.role === "assistant" && (
                        <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                          <div className="flex items-center gap-2">
                            {msg.elapsedMs && <span>⚡ {msg.elapsedMs}ms</span>}
                            <span>•</span>
                            <span className="text-zinc-500">Cloudflare LLaMA</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {msg.isRateLimited && (
                              <Link
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="text-[#F5B800] hover:underline flex items-center gap-1"
                              >
                                Book Call <ArrowUpRight className="w-2.5 h-2.5" />
                              </Link>
                            )}

                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="hover:text-white flex items-center gap-1 transition-colors"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Generating / Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg bg-black border border-white/20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/qdelta-icon.png"
                      alt="QDelta"
                      width={28}
                      height={28}
                      className="h-full w-full object-contain p-0.5"
                    />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-[#0E0E14] border border-white/[0.08] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#F5B800] animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-[#F5B800] animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-[#F5B800] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Dock */}
            <div className="border-t border-white/[0.08] bg-[#0A0D11]/90 p-3 sm:p-3.5">
              <div className="relative flex items-center rounded-xl border border-white/12 bg-[#06070A] focus-within:border-[#F5B800]/50 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask QDelta AI about our services..."
                  disabled={isLoading}
                  className="w-full resize-none bg-transparent py-2.5 pl-3.5 pr-10 text-xs sm:text-[13px] text-white placeholder-zinc-500 focus:outline-none max-h-28"
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="absolute right-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#F5B800] text-black transition-all hover:bg-white disabled:opacity-30 disabled:hover:bg-[#F5B800] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sub-dock Info / Rate Limit Notice */}
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-zinc-500 font-mono">
                <span>
                  {rateLimitRemaining !== null
                    ? `${rateLimitRemaining} prompt${rateLimitRemaining === 1 ? "" : "s"} left this hr`
                    : "10 free prompts / hour"}
                </span>
                <span>Powered by Cloudflare Workers AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
