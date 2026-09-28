/**
 * Share Social Component
 * Chia sẻ lên mạng xã hội
 */

'use client';

import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function ShareButtons({ url, title, description = "", className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + url)}`,
    zalo: `https://page.zalo.me/share?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 font-medium mr-2">Chia sẻ:</span>
      
      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110"
        title="Chia sẻ lên Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110"
        title="Chia sẻ lên Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-all hover:scale-110"
        title="Chia sẻ lên LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* Zalo */}
      <a
        href={shareLinks.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#0068FF] hover:bg-[#0052CC] text-white flex items-center justify-center transition-all hover:scale-110"
        title="Chia sẻ qua Zalo"
      >
        <ZaloIcon className="w-4 h-4" />
      </a>

      {/* Email */}
      <a
        href={shareLinks.email}
        className="w-9 h-9 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-all hover:scale-110"
        title="Chia sẻ qua Email"
      >
        <Mail className="w-4 h-4" />
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-all hover:scale-110 relative"
        title={copied ? "Đã sao chép!" : "Sao chép liên kết"}
      >
        <Link2 className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Đã sao chép!
          </span>
        )}
      </button>
    </div>
  );
}

/**
 * Simple Share Button - chỉ hiển thị nút chia sẻ
 */
export function ShareButton({ url, title }: { url: string; title: string }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="btn-secondary !py-2 text-sm"
      >
        <Link2 className="w-4 h-4" />
        Chia sẻ
      </button>

      {showOptions && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50">
            <ShareButtons url={url} title={title} className="bg-white p-4 rounded-lg shadow-xl border border-gray-200" />
          </div>
        </>
      )}
    </div>
  );
}
