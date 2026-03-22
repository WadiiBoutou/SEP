export default function MarqueeStrip() {
  const text = "ÉNERGIE SOLAIRE · POMPAGE SOLAIRE · IRRIGATION · CHAUFFE-EAU · MAINTENANCE · AGADIR · ";

  return (
    <div className="w-full bg-brand-gold h-12 overflow-hidden flex items-center">
      <div className="animate-marquee whitespace-nowrap flex w-[200%]">
        <span className="font-syne font-bold uppercase tracking-wider text-dark-bg text-base flex-1">
          {text} {text} {text}
        </span>
        <span className="font-syne font-bold uppercase tracking-wider text-dark-bg text-base flex-1" aria-hidden="true">
          {text} {text} {text}
        </span>
      </div>
    </div>
  );
}
