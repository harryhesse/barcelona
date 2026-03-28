import axios from "axios";
import * as cheerio from "cheerio";

// -----------------
// La Liga Standings
// -----------------
async function getStandings() {
  const { data: html } = await axios.get(
    "https://as.com/resultados/futbol/primera/clasificacion/",
  );

  const $ = cheerio.load(html);
  const teams = {};
  const nextMatch = {};

  $("tr").each((i, row) => {
    const idMatch = $(row)
      .find(".a_tb_tm-lk img")
      .attr("src")
      ?.match(/teams\/(\d+)\.png/);
    const id = idMatch ? idMatch[1] : null;
    const teamName = $(row).find(".a_tb_tm-lk span._hidden-xs").text().trim();
    if (!id || !teamName) return;

    const shortCode = $(row).find(".a_tb_tm-lk abbr").attr("title") || "";
    const crest = $(row).find(".a_tb_tm-lk img").attr("src") || "";
    const rank = Number($(row).find("th .a_tb_ps").text().trim());

    const cols = $(row)
      .find("td.col1, td.col2, td.col3")
      .map((i, el) => $(el).text().trim())
      .get();

    const form = $(row)
      .find("td.col1 span.rh_ic, td.col2 span.rh_ic, td.col3 span.rh_ic")
      .map((i, el) => $(el).text().trim())
      .get();

    const opponents = $(row)
      .find("td.a_tb_ng img")
      .map((i, el) => {
        const src = $(el).attr("src");
        const match = src.match(/teams\/(\d+)\.png/);
        return match ? match[1] : null;
      })
      .get();

    teams[id] = {
      id,
      rank,
      team: teamName,
      shortCode,
      crest,
      points: Number(cols[0]),
      played: Number(cols[1]),
      wins: Number(cols[2]),
      draws: Number(cols[3]),
      losses: Number(cols[4]),
      goals_for: Number(cols[5]),
      goals_against: Number(cols[6]),
      goal_diff: Number(cols[7]),
      form,
    };

    if (opponents.length) nextMatch[id] = opponents;
  });

  return { teams, nextMatch };
}

export { getStandings };
