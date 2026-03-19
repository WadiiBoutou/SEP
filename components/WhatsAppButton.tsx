export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/212612619329"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 group"
      aria-label="Discutons sur WhatsApp"
    >
      <div className="relative flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>

        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-dark-bg border border-white/10 text-white text-xs font-sans rounded opacity-0 translate-x-2 transition-all duration-300 pointer-events-none whitespace-nowrap group-hover:opacity-100 group-hover:translate-x-0">
        Discutons sur WhatsApp
      </span>
    </a>
  );
}
