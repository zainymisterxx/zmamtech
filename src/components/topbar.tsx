export default function Topbar() {
  return (
    <header className="flex items-center justify-between h-16 px-8 border-b border-base-border bg-white">

      {/* Search */}
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-text-light"
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
          className="bg-transparent text-sm text-text-body placeholder:text-text-light focus:outline-none w-48"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-body">Admin</span>
        <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white text-xs font-bold">
          Z
        </div>
      </div>

    </header>
  )
}
