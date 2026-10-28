import React, { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { portfolioData } from "../data/kishandata";
import { useReveal } from "../hooks/useReveal";

const GITHUB_LOGIN = (() => {
  try {
    const match = String(portfolioData.personal.github || "").match(
      /github\.com\/([^/?#]+)/,
    );
    return match ? match[1] : "kishanranaghosh";
  } catch {
    return "kishanranaghosh";
  }
})();

const CACHE_KEY = "gh-contributions-" + GITHUB_LOGIN;
const CACHE_TTL = 24 * 60 * 60 * 1000;

// Public, CORS-enabled mirror of GitHub's contribution data. GitHub's own
// GraphQL API (api.github.com/graphql) requires an auth token AND does not
// send CORS headers, so it can never be called successfully from a browser.
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4/";

const LOOKBACK_DAYS = 371; // ~53 weeks, matching GitHub's own profile graph

const CELL_SIZE = 10;
const GAP = 2;
const PITCH = CELL_SIZE + GAP;
const LABEL_WIDTH = 20;
const CONTRIBUTION_COLORS = [
  "#eeeeef",
  "#d6d6dc",
  "#aaaab4",
  "#737380",
  "#292930",
];
const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

const levelForCount = (count) => (count ? Math.min(4, count) : 0);

const ariaLabelFor = (date, count) =>
  count
    ? count +
      " contribution" +
      (count !== 1 ? "s" : "") +
      " on " +
      format(date, "EEEE, MMMM d, yyyy")
    : "No contributions on " + format(date, "EEEE, MMMM d, yyyy");

// Build Monday-start weeks covering [from, to], each with 7 day entries
// (Mon..Sun) so rows map 1:1 onto WEEKDAY_LABELS with no remapping needed.
function buildWeeks(countByDate, from, to) {
  const start = new Date(from);
  const dow = start.getDay(); // 0 = Sun .. 6 = Sat
  const mondayOffset = dow === 0 ? 6 : dow - 1;
  start.setDate(start.getDate() - mondayOffset);
  start.setHours(0, 0, 0, 0);

  const weeks = [];
  const cursor = new Date(start);
  while (cursor <= to) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = format(cursor, "yyyy-MM-dd");
      week.push({
        date: new Date(cursor),
        count: countByDate.get(dateStr) || 0,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const ContributionGraph = () => {
  const [weeks, setWeeks] = useState([]);
  const [status, setStatus] = useState("idle");

  const fetchContributions = useCallback(async () => {
    setStatus("loading");
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.value && Date.now() - parsed.ts < CACHE_TTL) {
            setWeeks(parsed.value);
            setStatus("ready");
            return;
          }
        } catch {}
      }

      const to = new Date();
      const from = new Date(Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
      const years = Array.from(new Set([from.getFullYear(), to.getFullYear()]));

      const params = years.map((y) => "y=" + y).join("&");
      const response = await fetch(
        CONTRIBUTIONS_API + GITHUB_LOGIN + "?" + params,
      );

      if (!response.ok) {
        throw new Error(
          "Contributions API responded with status " + response.status,
        );
      }

      const json = await response.json();
      const contributions = Array.isArray(json.contributions)
        ? json.contributions
        : [];
      if (!contributions.length) {
        throw new Error("No contribution data returned for " + GITHUB_LOGIN);
      }

      const countByDate = new Map(contributions.map((d) => [d.date, d.count]));
      const builtWeeks = buildWeeks(countByDate, from, to);

      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ value: builtWeeks, ts: Date.now() }),
        );
      } catch {}

      setWeeks(builtWeeks);
      setStatus("ready");
    } catch (err) {
      console.warn("Contribution graph unavailable:", err);
      setStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const weekCount = weeks.length;

  const monthPositions = useMemo(() => {
    if (!weeks.length) return [];
    const positions = [];
    let prevKey = null;
    for (let i = 0; i < weeks.length; i++) {
      const start = weeks[i][0].date;
      const key = start.getFullYear() + "-" + start.getMonth();
      if (key !== prevKey) {
        let span = 0;
        for (let j = i; j < weeks.length; j++) {
          const d = weeks[j][0].date;
          if (d.getFullYear() + "-" + d.getMonth() === key) span++;
          else break;
        }
        positions.push({
          label: format(start, "MMM"),
          startIdx: i,
          weekSpan: Math.max(1, span),
        });
        prevKey = key;
      }
    }
    return positions;
  }, [weeks]);

  const graphMinWidth = LABEL_WIDTH + weekCount * PITCH;

  const { ref: sectionRef, isVisible, isReady } = useReveal();
  return (
    <section
      id="contributions"
      ref={sectionRef}
      className={
        "relative py-12 px-4 " +
        (isReady ? "reveal " + (isVisible ? "is-visible" : "") : "")
      }
    >
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <span className="inline-block px-3 py-1 rounded-md border border-border/40 bg-surface-subtle text-text-secondary text-[11px] font-medium tracking-[0.16em] uppercase">
            GitHub
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
            Contributions
          </h2>
          <p className="text-text-muted text-base leading-[1.7]">
            Public contribution activity on GitHub, fetched directly from a
            public GitHub contributions API and cached for 24 hours.
          </p>
        </header>

        <div className="relative">
          {/* Month labels row */}
          {weekCount > 0 && (
            <div className="mb-2" style={{ minWidth: graphMinWidth }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    LABEL_WIDTH +
                    "px repeat(" +
                    weekCount +
                    ", " +
                    CELL_SIZE +
                    "px)",
                  columnGap: GAP + "px",
                }}
              >
                <div style={{ width: LABEL_WIDTH + "px" }} />
                {monthPositions.map((m) => (
                  <div
                    key={m.label + "-" + m.startIdx}
                    style={{
                      gridColumnStart: m.startIdx + 2,
                      gridColumnEnd: m.startIdx + m.weekSpan + 2,
                      textAlign: "center",
                      fontSize: "10px",
                      color: "#80808a",
                      fontFamily:
                        "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                      lineHeight: 1,
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contribution cell grid: label column + 7 rows x weekCount columns */}
          <div className="overflow-x-auto mb-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  LABEL_WIDTH +
                  "px repeat(" +
                  weekCount +
                  ", " +
                  CELL_SIZE +
                  "px)",
                gridTemplateRows: "repeat(7, " + CELL_SIZE + "px)",
                columnGap: GAP + "px",
                rowGap: GAP + "px",
                minWidth: graphMinWidth + "px",
              }}
            >
              {/* Weekday labels column */}
              {WEEKDAY_LABELS.map((label, i) => (
                <div
                  key={label + i}
                  style={{
                    gridRow: i + 1,
                    gridColumn: 1,
                    textAlign: "right",
                    paddingRight: 6,
                    fontSize: "10px",
                    color: "#80808a",
                    fontFamily:
                      "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </div>
              ))}

              {/* Cells: 7 rows (Mon..Sun) x weekCount columns */}
              {weeks.map((week, weekIndex) =>
                week.map((day, rowIndex) => {
                  const level = levelForCount(day.count);
                  return (
                    <div
                      key={weekIndex + "-" + rowIndex}
                      style={{
                        gridRow: rowIndex + 1,
                        gridColumn: weekIndex + 2,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        borderRadius: 2,
                        backgroundColor: CONTRIBUTION_COLORS[level],
                      }}
                      role="cell"
                      aria-roledescription="day"
                      aria-label={ariaLabelFor(day.date, day.count)}
                      title={ariaLabelFor(day.date, day.count)}
                      tabIndex={0}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-4 text-[10px] text-text-muted font-mono">
          <span className="text-text-secondary">less</span>
          {CONTRIBUTION_COLORS.map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-text-secondary">more</span>
        </div>

        {/* Unavailable state - below the graph, never overlapping */}
        {status === "unavailable" && weekCount === 0 && (
          <p className="mt-6 text-text-muted text-sm">
            Could not load contribution data from GitHub. The graph layout will
            update once the API is reachable again.
          </p>
        )}

        {status === "loading" && weekCount === 0 && (
          <p className="mt-6 text-text-muted text-sm">
            Loading contribution activity…
          </p>
        )}
      </div>
    </section>
  );
};

export default ContributionGraph;
