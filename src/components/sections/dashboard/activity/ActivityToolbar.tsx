"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";

const ActivityToolbar = () => {
  const [query, setQuery] = useState("");

  return (
    <div
      className="flex flex-col gap-3 border-b border-gray-100 bg-white pb-4 sm:flex-row sm:items-center
        sm:justify-between sm:gap-4"
    >
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search activity"
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 font-primary text-sm
            text-content placeholder:text-content-muted transition-colors
            focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5
            font-primary text-sm font-medium text-content-light transition-colors hover:border-primary/40
            hover:bg-primary-light/30"
          onClick={() => console.log("filter (mock)")}
        >
          <Filter size={16} aria-hidden="true" />
          Filter
        </button>

        <div className="relative min-w-[7.5rem]">
          <select
            aria-label="Sort by"
            defaultValue="newest"
            className="w-full appearance-none rounded-xl border border-primary bg-white py-2.5 pl-3
              font-primary text-sm font-medium text-primary focus:outline-none focus:ring-2
              focus:ring-primary/20"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActivityToolbar;
