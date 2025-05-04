
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, User, Bot } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Define message types for the chatbot
type MessageType = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Sample predefined responses
const botResponses: { [key: string]: string } = {
  "book": "To book a water tanker, navigate to the 'Book Tanker' page and fill in your details. You'll need to select a tank size, provide your address, and choose a delivery time slot.",
  "emergency": "For emergency water needs, check the 'Emergency Request' option when booking a tanker. Your request will be prioritized. For urgent assistance, call our helpline at 080-2233-4455.",
  "payment": "We accept multiple payment methods including credit/debit cards, UPI, and cash on delivery. You can also opt for monthly subscriptions with auto-payment options.",
  "quality": "Water quality reports are available on the 'Reports' page. You can check water parameters for your specific zone in Bangalore. We conduct regular testing to ensure safety.",
  "subscription": "We offer monthly subscription plans with discounted rates. You can schedule regular deliveries (weekly or bi-weekly) and enjoy priority service and price benefits.",
  "cancel": "To cancel a booking, go to your user dashboard and select the booking you wish to cancel. Cancellations made at least 3 hours before the scheduled delivery will receive a full refund.",
  "contact": "You can reach BWSSB customer service at 080-2233-4455 or email us at support@bwssb.gov.in. Our office hours are 8:00 AM to 8:00 PM, seven days a week.",
  "rainwater": "BWSSB encourages rainwater harvesting. Properties with functioning rainwater harvesting systems get priority service and potential rebates. Visit the 'Reports' section to upload your harvesting certification.",
  "help": "I'm your BWSSB virtual assistant. I can help with booking water tankers, checking your water quality, managing subscriptions, and answering common questions about our services.",
  "hours": "Our water tanker delivery services operate from 6:00 AM to 8:00 PM daily. Emergency services are available 24/7.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: "Hello! I'm the BWSSB virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      const botMessage: MessageType = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Find the best matching response for user input
  const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for exact matches in predefined responses
    for (const keyword in botResponses) {
      if (lowercaseInput.includes(keyword)) {
        return botResponses[keyword];
      }
    }
    
    // Handle greetings
    if (lowercaseInput.match(/hello|hi|hey|greetings/)) {
      return "Hello! How can I assist you with BWSSB's water tanker services today?";
    }
    
    // Handle thanks
    if (lowercaseInput.match(/thank|thanks|thank you/)) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Handle goodbyes
    if (lowercaseInput.match(/bye|goodbye|see you|talk to you later/)) {
      return "Goodbye! Feel free to return if you have more questions about BWSSB services.";
    }
    
    // Default fallback response
    return "I'm not sure I understand. Could you rephrase your question? You can ask about booking tankers, water quality, subscription plans, or contact information.";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Format timestamp for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "How do I book a water tanker?",
    "What are the payment options?",
    "How can I check water quality in my area?",
    "Do you offer subscription plans?",
    "What's the emergency contact number?",
    "Tell me about rainwater harvesting benefits."
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    // Small delay to show the question being set before sending
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">BWSSB Assistant</CardTitle>
            <CardDescription>
              Ask questions about water services, tanker bookings, and more
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2 bg-bwssb-600">
                      <Bot size={16} className="text-white" />
                    </Avatar>
                  )}
                  
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-bwssb-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 ml-2 bg-gray-400">
                      <User size={16} className="text-white" />
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <Avatar className="h-8 w-8 mr-2 bg-bwssb-600">
                    <Bot size={16} className="text-white" />
                  </Avatar>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>
          
          <div className="px-4 mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
          
          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <Button type="submit" size="icon" onClick={handleSendMessage} disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Chatbot;
