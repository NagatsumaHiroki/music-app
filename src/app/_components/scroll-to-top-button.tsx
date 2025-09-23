'use client';

import { useState, useEffect } from "react";
import { clientLog } from '../../lib/logging';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      if (!isVisible) {
        clientLog.debug('トップへ戻るボタンを表示');
      }
      setIsVisible(true);
    } else {
      if (isVisible) {
        clientLog.debug('トップへ戻るボタンを非表示');
      }
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    clientLog.info('トップへ戻るボタンをクリック');
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-6 px-7 py-5 text-lg rounded-md bg-blue-800 text-white border-none cursor-pointer shadow-lg hover:bg-blue-900 transition-colors z-50"
          aria-label="ページトップに戻る"
        >
          Top
        </button>
      )}
    </>
  );
}
