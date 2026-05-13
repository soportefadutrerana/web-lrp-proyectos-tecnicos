export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 font-sans">
          Cargando
        </span>
      </div>
    </div>
  )
}
