import EpisodeCard from "./EpisodeCard";

function EpisodeGrid({ episodes }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
        />
      ))}
    </div>
  );
}

export default EpisodeGrid;