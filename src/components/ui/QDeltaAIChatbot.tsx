"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  User,
  ArrowUpRight,
  ShieldAlert,
  Bot,
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
  "How can I book a founder call?",
];

const API_ENDPOINT = "https://qdelta-ai.qdelta-work.workers.dev/chat";
const API_SECRET = "9eeaee6d55e9bd8ad5054f9cbefaac7a1ca74797482509590ec4049a837e9536";

const CLIENT_SYSTEM_PROMPT = `You are QDelta AI, the official digital consultant for QDelta (https://www.qdelta.in).
Core Knowledge:
- Official Email: hello@qdelta.in (This is the ONLY official email address for all inquiries, briefs, and client communication).
- Mission: High-performance web engineering and modern luxury digital agency.
- Founders: Qais (Brand Strategy & Creative), Sai Prabath (Engineering & Performance), Fazeel (Systems & Delivery).
- Services: High-Converting Landing Pages, Luxury Brand Websites, Interactive 3D WebGL Experiences, Premium E-commerce Stores.
- Booking & Inquiries: Book a 1-on-1 discovery call at https://www.qdelta.in/#contact or email directly at hello@qdelta.in.

CRITICAL MANDATORY RULES:
- The ONLY official email address is hello@qdelta.in. Never output any other email.
- BE EXTREMELY MINIMAL: Answer in strictly 1 to 2 short sentences (maximum 30 words).
- NEVER output long lists, bullet points, or essays.
- Conclude with a brief invitation to book a call or email hello@qdelta.in.`;

export default function QDeltaAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

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

  // Close chat when clicking anywhere outside the modal and trigger button, or on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Adjust textarea height automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
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
      // Prepend system prompt to enforce ultra-concise, minimal, rapid responses
      const payloadMessages = [
        { role: "system", content: CLIENT_SYSTEM_PROMPT },
        ...newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ];

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_SECRET}`,
        },
        body: JSON.stringify({
          messages: payloadMessages,
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
            "✨ Thank you for contacting QDelta! You have reached our complimentary session limit of 10 messages per hour. Our team has received your inquiry and will be back in touch with you shortly. If you need immediate assistance, please connect with us directly at hello@qdelta.in or visit https://www.qdelta.in.",
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
        content: `Sorry, we couldn't process your request right now: ${errorMessage}. Please reach out directly at hello@qdelta.in.`,
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
  const renderFormattedText = (text: string, isUser = false) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold headers or numbered items
      if (line.startsWith("### ") || line.startsWith("## ")) {
        return (
          <h4 key={idx} className="font-semibold text-white mt-1.5 mb-0.5 text-xs sm:text-[13px] tracking-tight">
            {line.replace(/^#+\s*/, "")}
          </h4>
        );
      }
      // Bullet items
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        const bulletText = line.trim().replace(/^[-•]\s*/, "");
        return (
          <li key={idx} className="ml-3.5 list-disc text-zinc-300 text-xs leading-relaxed">
            {renderBoldText(bulletText, isUser)}
          </li>
        );
      }
      // Blank lines
      if (!line.trim()) {
        return <div key={idx} className="h-1" />;
      }
      return (
        <p
          key={idx}
          className={`${
            isUser ? "text-zinc-100 font-medium" : "text-zinc-200"
          } text-xs sm:text-[12.5px] leading-relaxed`}
        >
          {renderBoldText(line, isUser)}
        </p>
      );
    });
  };

  const renderBoldText = (str: string, isUser = false) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className={`font-semibold ${isUser ? "text-white" : "text-white"}`}>
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
      {/* FLOATING TRIGGER BUTTON (STACKED DIRECTLY ABOVE WHATSAPP)*/}
      {/* ======================================================= */}
      <div ref={triggerRef} className="fixed bottom-[74px] right-5 sm:bottom-[84px] sm:right-6 z-50">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close QDelta AI Assistant" : "Open QDelta AI Assistant"}
          className={`group flex h-10 sm:h-11 items-center rounded-full border px-2.5 sm:px-3 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 ease-out focus:outline-none cursor-pointer ${
            isOpen
              ? "border-[#E5B528] bg-[#0E0E14] text-[#E5B528] shadow-[0_0_20px_rgba(229, 181, 40,0.3)]"
              : "border-white/15 bg-[#0B0E12]/90 text-white hover:border-[#E5B528]/60 hover:bg-[#0E0E14] hover:shadow-[0_0_20px_rgba(229, 181, 40,0.25)] hover:pr-4 hover:pl-3"
          }`}
        >
          {/* Bot Icon with Live Indicator */}
          <div className="relative flex items-center justify-center shrink-0">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-[#E5B528] transition-transform duration-300 group-hover:scale-110" />
            {/* Pulsing Emerald Edge Indicator */}
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#0B0E12] animate-pulse" />
          </div>

          {/* Trigger Label */}
          {isOpen ? (
            <span className="pl-2.5 text-xs font-semibold text-white flex items-center gap-1.5">
              <span>Close</span>
              <X className="w-3 h-3 text-[#E5B528]" />
            </span>
          ) : (
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold text-white opacity-0 transition-all duration-300 ease-out group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-2.5 flex items-center gap-1.5">
              <span>Ask AI</span>
              <Sparkles className="w-3 h-3 text-[#E5B528]" />
            </span>
          )}
        </motion.button>
      </div>

      {/* ======================================================= */}
      {/* COMPACT LUXURY OBSIDIAN CHAT MODAL                      */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.84,
              y: 20,
              transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] },
            }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 320,
              mass: 0.75,
            }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[128px] right-4 sm:bottom-[142px] sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[350px] md:w-[360px] h-[450px] max-h-[64vh] sm:max-h-[70vh] rounded-2xl border border-white/12 bg-[#08080D]/95 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden text-white font-sans selection:bg-[#E5B528] selection:text-black origin-bottom-right"
          >
            {/* Top Amber Horizon Accent Line */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-[#0B0E12]/80">
              <div className="flex items-center gap-2.5">
                <div className="relative h-7 w-7 rounded-[9px] bg-black border border-white/20 overflow-hidden shadow-sm flex items-center justify-center">
                  <Image
                    src="/images/qdelta-avatar.png"
                    alt="QDelta"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-[13px] tracking-tight text-white block">
                    QDelta AI
                  </span>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-tight leading-none mt-0.5">
                    Brand Intelligence
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close AI Assistant"
                aria-label="Close AI Assistant"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Conversation Messages Container */}
            <div className="flex-1 overflow-y-auto px-3.5 py-3 sm:px-4 sm:py-3.5 space-y-3 text-xs no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {messages.length === 0 ? (
                /* Welcome Greeting State */
                <div className="flex flex-col items-center justify-center text-center py-4 px-1">
                  <div className="relative mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-white/15 shadow-[0_0_20px_rgba(229, 181, 40,0.2)]">
                    <Image
                      src="/images/qdelta-avatar.png"
                      alt="QDelta Logo"
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    How can QDelta help you?
                  </h3>
                  <p className="mt-1 max-w-[240px] text-[11px] text-zinc-400 leading-normal">
                    Ask about our engineering, services, founders, or booking a founder call.
                  </p>

                  {/* Quick Starter Prompts */}
                  <div className="mt-3.5 w-full flex flex-col gap-1 text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-1 mb-0.5">
                      Suggested Inquiries
                    </span>
                    {QUICK_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(prompt)}
                        className="group flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-zinc-300 hover:border-[#E5B528]/40 hover:bg-[#E5B528]/[0.06] hover:text-white transition-all duration-200 cursor-pointer text-left"
                      >
                        <span className="truncate pr-1">{prompt}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-[#E5B528] transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Dynamic Messages */
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar Tile */}
                    <div
                      className={`h-7 w-7 sm:h-7.5 sm:w-7.5 shrink-0 rounded-[9px] flex items-center justify-center overflow-hidden border shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#161622] border-[#E5B528]/30 text-[#E5B528]"
                          : "bg-black border-white/20 shadow-[0_0_12px_rgba(245,158,11,0.22)]"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-3.5 h-3.5 text-[#E5B528]" />
                      ) : (
                        <Image
                          src="/images/qdelta-avatar.png"
                          alt="QDelta AI"
                          width={30}
                          height={30}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`relative max-w-[85%] rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-md ${
                        msg.role === "user"
                          ? "bg-[#181824] border border-[#E5B528]/30 text-white rounded-tr-none text-xs sm:text-[12.5px] leading-relaxed"
                          : msg.isRateLimited
                          ? "bg-[#161208] border border-[#E5B528]/30 text-zinc-200 rounded-tl-none"
                          : "bg-[#0E0E14] border border-white/[0.08] text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      {msg.isRateLimited && (
                        <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono text-[#E5B528]">
                          <div className="flex items-center gap-1.5">
                            <ShieldAlert className="w-3 h-3 shrink-0" />
                            <span>Session Limit (10/hr)</span>
                          </div>
                          <Link
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="text-[#E5B528] hover:underline flex items-center gap-1 ml-2 font-semibold"
                          >
                            Book Call <ArrowUpRight className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      )}

                      {/* Content */}
                      <div className="space-y-0.5">
                        {renderFormattedText(msg.content, msg.role === "user")}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Generating / Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="h-7 w-7 sm:h-7.5 sm:w-7.5 shrink-0 rounded-[9px] bg-black border border-white/20 shadow-[0_0_12px_rgba(245,158,11,0.22)] flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/qdelta-avatar.png"
                      alt="QDelta AI"
                      width={30}
                      height={30}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="rounded-xl rounded-tl-none bg-[#0E0E14] border border-white/[0.08] px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E5B528] animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E5B528] animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E5B528] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Dock */}
            <div className="border-t border-white/[0.08] bg-[#0A0D11]/90 p-2.5 sm:p-3">
              <div className="relative flex items-center rounded-lg border border-white/12 bg-[#06070A] focus-within:border-[#E5B528]/50 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask QDelta AI a quick question..."
                  disabled={isLoading}
                  className="w-full resize-none bg-transparent py-2 pl-3 pr-9 text-xs sm:text-[12.5px] text-white placeholder-zinc-500 focus:outline-none max-h-20 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="absolute right-1 flex h-6.5 w-6.5 items-center justify-center rounded-md bg-[#E5B528] text-black transition-all hover:bg-white disabled:opacity-30 disabled:hover:bg-[#E5B528] cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {/* Sub-dock Info / Rate Limit Notice */}
              <div className="mt-1.5 flex items-center justify-between px-0.5 text-[9px] text-zinc-500 font-mono">
                <span>
                  {rateLimitRemaining !== null
                    ? `${rateLimitRemaining} message${rateLimitRemaining === 1 ? "" : "s"} left`
                    : "10 messages / hr"}
                </span>
                <span>QDelta AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

