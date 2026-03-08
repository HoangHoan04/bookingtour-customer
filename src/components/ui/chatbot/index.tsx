import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import RobotWelcome from "@/assets/animations/RobotWelcome.json";
import axios from "axios";
import { MarkdownResponse } from "./markdownResponse";

const TravelChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Chào bạn! 🌿 Tôi là trợ lý ảo chuyên về tour du lịch. Bạn muốn khám phá vùng đất nào hôm nay?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { role: "user", content: input };
    setMessages([...messages, newMsg]);
    setInput("");

    try {
      setIsWaiting(true);
      setIsError(false);
      const AiResponse = await axios.post(
        `${import.meta.env.VITE_PYTHON_AI_URL}/chat`,
        {
          question: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "SECRET_KEY_BETWEEN_NODE_AND_PYTHON",
          },
        },
      );
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: AiResponse.data.answer },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsError(true);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-7 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 ${
            isOpen
              ? ""
              : "bg-teal-800/90 backdrop-blur-sm hover:bg-teal-700 scale-110"
          } text-white`}
        >
          {isOpen ? (
            <i className="pi pi-times"></i>
          ) : (
            <Lottie
              animationData={RobotWelcome}
              style={{
                width: 150,
                height: 150,
                position: "absolute",
                top: -70,
                right: -43,
                zIndex: -1,
              }}
              loop={true}
            />
          )}
        </button>
      )}

      {isOpen && (
        <div className="absolute bottom-0 right-10 w-[350px] sm:w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-teal-800/90 to-teal-600/90 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                  <Lottie
                    animationData={RobotWelcome}
                    style={{
                      width: 90,
                      height: 90,
                      position: "absolute",
                      top: -30,
                      right: -23,
                    }}
                    loop={true}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">
                  AI Travel Guide
                </h3>
                <p className="text-[10px] text-blue-100 opacity-90">
                  Sẵn sàng hỗ trợ 24/7
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-400 transition-colors hover:cursor-pointer"
                >
                  <i className="pi pi-times" style={{ fontSize: "1.2rem" }}></i>
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-teal-800 text-white rounded-tr-none"
                      : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <MarkdownResponse content={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isWaiting && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed shadow-sm bg-white text-gray-700 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                    <span className="text-gray-500">
                      Chờ tí mình kiếm thông tin cho bạn nha...
                    </span>
                  </div>
                </div>
              </div>
            )}
            {isError && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed shadow-sm bg-red-100 text-red-700 border border-red-200">
                  Ui thui tình yêu ơi, đang có lỗi xảy ra rồi. Tình yêu thử lại
                  sau nha! 😢
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Hỏi về tour, điểm đến..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700"
              />
              <button
                onClick={handleSend}
                className="text-teal-600 hover:text-teal-800 hover:cursor-pointer transition-colors p-1"
              >
                <i className="pi pi-send"></i>
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              Powered by HimLamTourist
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelChatbot;
