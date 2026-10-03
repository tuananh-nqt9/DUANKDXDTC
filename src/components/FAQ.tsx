/**
 * FAQ Component
 * Câu hỏi thường gặp với accordion - Premium UI
 */

'use client';

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { FAQS } from "@/lib/constants";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <div 
      className={`rounded-xl overflow-hidden transition-all duration-500 ${
        isOpen 
          ? "bg-white shadow-lg border border-primary-100 ring-1 ring-primary-100" 
          : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300 group"
      >
        <div className="flex items-center gap-4 pr-4">
          <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            isOpen 
              ? "bg-primary-600 text-white shadow-md" 
              : "bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600"
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-semibold transition-colors duration-300 ${
            isOpen ? "text-primary-700" : "text-gray-900 group-hover:text-primary-600"
          }`}>
            {question}
          </span>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? "bg-primary-100 rotate-180" 
            : "bg-gray-100 group-hover:bg-primary-50"
        }`}>
          <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
            isOpen ? "text-primary-600" : "text-gray-400"
          }`} />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-0 ml-12">
          <div className="relative pl-5 border-l-2 border-primary-200">
            <p className="text-gray-600 leading-relaxed text-[15px]">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-5 shadow-sm">
            <HelpCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 title-underline">
            Câu hỏi thường gặp
          </h2>
          <p className="text-gray-600 mt-6 text-lg">
            Những câu hỏi phổ biến từ khách hàng
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-primary-50 rounded-2xl px-8 py-6 border border-primary-100">
            <MessageCircle className="w-6 h-6 text-primary-500" />
            <p className="text-gray-700 font-medium">
              Không tìm thấy câu trả lời bạn cần?
            </p>
            <a href="/lien-he" className="btn-primary !py-2.5 !px-6 text-sm">
              Liên hệ với chúng tôi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
