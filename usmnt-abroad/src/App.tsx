import { useEffect, useMemo, useState } from "react";
import { recentPerformers, upcomingFixtures } from "./data/home";
import { players, type Player, type Position } from "./data/players";

const positionLabels: Record<Position, string> = {
  GK: "goalkeeper",
  DEF: "defender",
  MID: "midfielder",
  FWD: "forward",
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

const heroMoments = [
  "/hero/supporters-2026.webp",
  "/hero/tunnel-2026.webp",
  "/hero/weah-2026.webp",
  "/hero/balogun-2026.webp",
];

function App() {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<Position | "ALL">("ALL");
  const [country, setCountry] = useState("ALL");
  const [europeOnly, setEuropeOnly] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeMoment, setActiveMoment] = useState(0);

  const countries = useMemo(
    () => [...new Set(players.map((player) => player.country))].sort(),
    [],
  );

  const filteredPlayers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return players.filter((player) => {
      const matchesQuery =
        !normalizedQuery ||
        `${player.name} ${player.club} ${player.country}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesPosition = position === "ALL" || player.position === position;
      const matchesCountry = country === "ALL" || player.country === country;
      const matchesEurope = !europeOnly || Boolean(player.europeanCompetition);

      return matchesQuery && matchesPosition && matchesCountry && matchesEurope;
    });
  }, [country, europeOnly, position, query]);

  const resetFilters = () => {
    setQuery("");
    setPosition("ALL");
    setCountry("ALL");
    setEuropeOnly(false);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveMoment((current) => (current + 1) % heroMoments.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedPlayer) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPlayer(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPlayer]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="hero-history" aria-hidden="true">
          {heroMoments.map((image, index) => (
            <img
              className={index === activeMoment ? "is-active" : ""}
              src={image}
              alt=""
              key={image}
            />
          ))}
        </div>
        <div className="hero" id="top">
          <div className="hero-copy">
            <h1>
              usmnt
              <br />
              <span>abroad</span>
            </h1>
            <p className="hero-description">
              One clean view of the Americans playing across Europe—who they play
              for, where they are, and which continental nights are worth watching.
            </p>
          </div>

          <div className="hero-mark">
            <img
              className="hero-crest"
              src="/brand/usmnt-crest.svg"
              alt="United States soccer crest"
            />
          </div>
        </div>
      </header>

      <main>
        <section className="matchday" aria-labelledby="upcoming-title">
          <div className="matchday-heading">
            <h2 id="upcoming-title">upcoming games</h2>
            <p>next seven days · kickoff times are local</p>
          </div>

          <div className="matchday-grid">
            <div className="fixture-board">
              {upcomingFixtures.map((fixture, index) => (
                <a
                  className={`fixture-card${index === 0 ? " fixture-card--featured" : ""}`}
                  href={fixture.href}
                  target="_blank"
                  rel="noreferrer"
                  key={fixture.id}
                >
                  <div className="fixture-date">
                    <span>{fixture.date}</span>
                    <strong>{fixture.time}</strong>
                  </div>
                  <div className="fixture-main">
                    <span className="competition">{fixture.competition}</span>
                    <h3 className="fixture-players">
                      {fixture.watching.map((player) => (
                        <span key={player}>{player}</span>
                      ))}
                    </h3>
                    <p className="fixture-matchup">
                      <span>{fixture.home}</span>
                      <i>vs</i>
                      <span>{fixture.away}</span>
                    </p>
                  </div>
                  <span className="fixture-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>

            <aside className="performer-board" aria-labelledby="performers-title">
              <div className="performer-heading">
                <h2 id="performers-title">recent performers</h2>
                <span aria-hidden="true">★</span>
              </div>
              <ol>
                {recentPerformers.map((performer) => (
                  <li key={performer.rank}>
                    <span className="performer-rank">{performer.rank}</span>
                    <div>
                      <h3>{performer.name}</h3>
                      <p>{performer.club} · {performer.detail}</p>
                    </div>
                    <strong>{performer.result}</strong>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="tracker" aria-labelledby="tracker-title">
          <div className="section-heading">
            <h2 id="tracker-title">the player pool</h2>
            <p>
              showing <strong>{filteredPlayers.length}</strong> of {players.length}
            </p>
          </div>

          <div className="filter-panel" aria-label="Player filters">
            <label className="search-field">
              <span>search</span>
              <div>
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="player, club, or country"
                />
              </div>
            </label>

            <fieldset className="position-filter">
              <legend>position</legend>
              <div>
                {(["ALL", "GK", "DEF", "MID", "FWD"] as const).map((value) => (
                  <button
                    key={value}
                    className={position === value ? "is-active" : ""}
                    type="button"
                    onClick={() => setPosition(value)}
                    aria-pressed={position === value}
                  >
                    {value === "ALL" ? "all" : value.toLowerCase()}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="select-field">
              <span>country</span>
              <select value={country} onChange={(event) => setCountry(event.target.value)}>
                <option value="ALL">all countries</option>
                {countries.map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName.toLowerCase()}
                  </option>
                ))}
              </select>
            </label>

            <label className="check-field">
              <input
                type="checkbox"
                checked={europeOnly}
                onChange={(event) => setEuropeOnly(event.target.checked)}
              />
              <span className="fake-check" aria-hidden="true">✓</span>
              european competition only
            </label>
          </div>

          <div className="table-wrap">
            <div className="player-table">
              <div className="table-head" aria-hidden="true">
                <span>player</span>
                <span>club</span>
                <span>country</span>
                <span>caps</span>
                <span>europe</span>
                <span aria-hidden="true"></span>
              </div>

              <div className="table-body" aria-live="polite">
                {filteredPlayers.map((player) => (
                  <button
                    className="player-row"
                    key={player.id}
                    type="button"
                    onClick={() => setSelectedPlayer(player)}
                    aria-label={`View ${player.name}, ${positionLabels[player.position]}, ${player.club}, ${player.country}, ${player.caps} caps`}
                  >
                    <span className="player-cell">
                      <span className={`avatar avatar--${player.position.toLowerCase()}`}>
                        {initials(player.name)}
                      </span>
                      <span>
                        <strong>{player.name}</strong>
                        <small>{positionLabels[player.position]}</small>
                      </span>
                    </span>
                    <span className="club-cell">
                      {player.club}
                    </span>
                    <span className="country-cell">
                      <span>{player.countryCode}</span> {player.country}
                    </span>
                    <span className="caps-cell">
                      {player.caps}
                    </span>
                    <span>
                      {player.europeanCompetition ? (
                        <span className="competition-pill">
                          {player.europeanCompetition === "Champions League" ? "UCL" : "UEL"}
                        </span>
                      ) : (
                        <span className="dash">—</span>
                      )}
                    </span>
                    <span className="row-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>

            {filteredPlayers.length === 0 && (
              <div className="empty-state">
                <strong>no one found</strong>
                <p>That filter combo is parked on the bench.</p>
                <button type="button" onClick={resetFilters}>Clear filters</button>
              </div>
            )}
          </div>
        </section>

      </main>

      <footer>
        <p><span>usmnt abroad</span> by garbage time</p>
        <p>club, country, cap, repeat.</p>
        <p>data: u.s. soccer roster · sep 17, 2026</p>
        <p>
          hero photos: <a href="https://commons.wikimedia.org/wiki/User:Berlination" target="_blank" rel="noreferrer">bryan berlin</a>
          {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">cc by-sa 4.0</a>
        </p>
      </footer>

      {selectedPlayer && (
        <div className="drawer-layer" role="presentation" onMouseDown={() => setSelectedPlayer(null)}>
          <aside
            className="player-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              type="button"
              onClick={() => setSelectedPlayer(null)}
              aria-label="Close player details"
              autoFocus
            >
              close ×
            </button>
            <div className={`drawer-avatar avatar--${selectedPlayer.position.toLowerCase()}`}>
              {initials(selectedPlayer.name)}
            </div>
            <p className="drawer-position">{positionLabels[selectedPlayer.position]}</p>
            <h2 id="drawer-title">{selectedPlayer.name}</h2>
            <p className="drawer-club">
              {selectedPlayer.club} <span>·</span> {selectedPlayer.country}
            </p>
            <dl>
              <div>
                <dt>USMNT caps</dt>
                <dd>{selectedPlayer.caps}</dd>
              </div>
              <div>
                <dt>USMNT goals</dt>
                <dd>{selectedPlayer.goals}</dd>
              </div>
              <div>
                <dt>European competition</dt>
                <dd>{selectedPlayer.europeanCompetition ?? "—"}</dd>
              </div>
            </dl>
            <p className="drawer-footnote">
              Match-level club stats are intentionally not mocked. That feed is the next
              product layer.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
