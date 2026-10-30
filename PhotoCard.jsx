export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="gallery-card">
      <div className="gallery-image-wrap">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photograph by ${photo.author}`}
          className="gallery-image"
          loading="lazy"
        />
        <span className="image-index" aria-hidden="true">№ {String(photo.id).padStart(2, "0")}</span>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={isFavourite}
          className={`favourite-button ${isFavourite ? "is-favourite" : ""}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill={isFavourite ? "currentColor" : "none"} className="h-5 w-5">
            <path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex items-start justify-between gap-4 pt-3">
        <div className="min-w-0">
          <p className="m-0 truncate text-sm font-semibold text-stone-900">{photo.author}</p>
          <p className="m-0 mt-1 text-xs text-stone-500">Photographer</p>
        </div>
        <span className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
          {isFavourite ? "Saved" : "Folio"}
        </span>
      </div>
    </article>
  );
}