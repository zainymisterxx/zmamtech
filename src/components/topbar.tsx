export default function Topbar() {
  return (
    <header className="flex items-center justify-between h-16 px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B]">

      {/* Search */}
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-slate-500 dark:text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none w-48"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-700 dark:text-slate-300">Admin</span>
        <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-bold">
          Z
        </div>
      </div>

    </header>
  )
}
