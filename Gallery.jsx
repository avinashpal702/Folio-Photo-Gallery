import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer } from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";

const PHOTOGRAPHERS = [
  "Avinash Pal",
  "Shraddha Pal",
  "Tom Cruise",
  "Aneed Paddha",
  "Farhana Bhatt",
];

/* ----- Load persisted favourites from localStorage ----- */
function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],          // initial empty array
    loadFavourites // initializer that hydrates from localStorage
  );

  /* ----- Persist favourites on every change ----- */
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  /* ----- Stable search handler (useCallback) ----- */
  const handleSearch = useCallback((e) => setSearch(e.target.value), []);

  /* ----- Filtered list (useMemo) ----- */
  const filteredPhotos = useMemo(() => {
    const term = search.toLowerCase().trim();
    return photos
      .slice(0, PHOTOGRAPHERS.length * 6)
      .map((photo, index) => ({
        ...photo,
        author: PHOTOGRAPHERS[Math.floor(index / 6)],
      }))
      .filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, search]);

  /* ----- Toggle favourite ----- */
  const toggleFavourite = (id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: id });
  };

  return (
    <main className="gallery-shell mx-auto min-h-screen max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-stone-200/80 pb-5">
        <a href="#" className="flex items-center gap-3 text-stone-900 no-underline">
          <span className="brand-mark" aria-hidden="true">f.</span>
          <span className="text-sm font-bold tracking-[0.16em]">FOLIO</span>
        </a>
        <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-stone-500 sm:block">
          A collection of moments
        </span>
        <span className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600">
          EST. 2024
        </span>
      </header>

      <section className="gallery-intro py-14 text-center sm:py-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">
          The everyday, extraordinary
        </p>
        <h1 className="mx-auto max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.06em] text-stone-900 sm:text-7xl">
          A little room
          <br />
          <span className="font-serif font-normal italic text-emerald-800">for wonder.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-stone-600 sm:text-base">
          A thoughtfully gathered collection of images and the people behind them.
        </p>
      </section>

      <section aria-label="Browse photographs">
        <div className="gallery-toolbar mb-7 flex flex-col gap-4 border-y border-stone-200/80 py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="search-field flex w-full items-center gap-3 sm:max-w-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-stone-500">
              <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
              <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search photographers"
              aria-label="Search by photographer name"
              className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
            />
          </label>
          <p className="m-0 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
            {loading ? "Gathering photographs" : `${filteredPhotos.length} photographs`}
            <span className="mx-2 text-stone-300" aria-hidden="true">/</span>
            <span className="text-emerald-800">{favourites.length} saved</span>
          </p>
        </div>
      </section>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && (
        <div className="flex min-h-48 items-center justify-center" role="status">
          <div className="gallery-spinner" />
          <span className="sr-only">Loading photos</span>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="empty-state">
          <span className="font-serif text-4xl italic text-emerald-800" aria-hidden="true">oh.</span>
          <p className="mt-3 text-sm text-stone-600">No photographs found. Try another name.</p>
        </div>
      )}

      <footer className="mt-16 border-t border-stone-200/80 pt-5 text-center text-xs tracking-wide text-stone-500">
        Made for the moments worth noticing.
      </footer>
    </main>
  );
}