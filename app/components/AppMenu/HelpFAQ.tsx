'use client';

import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

interface FAQItem {
  question: string;
  answer: string;
}

interface HelpFAQProps {
  faqData: FAQItem[];
}

export default function HelpFAQ({ faqData }: HelpFAQProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-dark-100 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-dark-600 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-4 bg-dark-800 hover:bg-dark-700 transition-colors text-left"
            >
              <h3 className="text-dark-200 font-medium pr-4">{faq.question}</h3>
              {expandedFaq === index ? (
                <MdExpandLess className="w-5 h-5 text-dark-400 flex-shrink-0" />
              ) : (
                <MdExpandMore className="w-5 h-5 text-dark-400 flex-shrink-0" />
              )}
            </button>
            {expandedFaq === index && (
              <div className="p-4 bg-dark-800/50 border-t border-dark-600">
                <p className="text-dark-300 text-sm leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}