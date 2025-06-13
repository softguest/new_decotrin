// ✅ Updated ChatComponent.tsx with Modal Popup, Greeting, Animated Icon, State Persistence, Sound Alert, and Theme Toggle
"use client";
import { useChat } from "ai/react";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import Messages from "./messages";
import InputForm from "./inputForm";
import { X, MessageSquare, Sun, Moon } from "lucide-react";

const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat({
    api: "api/gemini",
  });

  // Load state from localStorage
  useEffect(() => {
    const storedChatState = localStorage.getItem("isChatOpen");
    if (storedChatState === "true") setIsChatOpen(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem("isChatOpen", isChatOpen.toString());
  }, [isChatOpen]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Play sound when assistant sends a message
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant" &&
      audioRef.current
    ) {
      audioRef.current.play().catch(() => {});
    }
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <div className={isDark ? "dark" : ""}>
      <audio ref={audioRef} src="/notification.mp3" preload="auto" hidden />

      {/* Floating Chat Icon */}
      {!isChatOpen && (
        <motion.button
          onClick={toggleChat}
          className="fixed bottom-5 right-5 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
      )}

      {/* Modal Popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-[95%] md:w-[700px]"
            >
              <Card
                className={`border shadow-xl rounded-3xl backdrop-blur-md transition-colors duration-300 ${
                  isDark
                    ? "border-gray-600 bg-gradient-to-br from-[#1e1e2e] via-[#2e2e3e] to-[#3a3a4a] text-white"
                    : "border-indigo-300 bg-gradient-to-br from-[#f3f3fc] via-[#e6e8f4] to-[#d4d7ef] text-indigo-800"
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
                  <CardTitle className="text-lg font-semibold">
                    🌿 Healing Chat Support
                  </CardTitle>
                  <div className="flex gap-2 items-center">
                    <button onClick={toggleTheme} className="hover:opacity-75">
                      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={toggleChat}
                      className="hover:opacity-75"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="max-h-[400px] pr-4 overflow-y-auto custom-scrollbar px-1">
                    {/* Greeting */}
                    {messages.length === 0 && (
                      <div className="text-sm mb-4 px-2">
                        👋 Hi there. I`&apos;`m here to listen and support you. You can share whatever you`&apos;`re feeling — you`&apos;`re not alone.
                      </div>
                    )}
                    <Messages messages={messages} isLoading={isLoading} />
                    <div ref={scrollRef} />
                  </ScrollArea>
                </CardContent>

                <CardFooter className="border-t pt-4">
                  <InputForm
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    stop={stop}
                  />
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatComponent;
