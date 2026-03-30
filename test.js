import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://www.fcbarcelona.es/es/futbol/primer-equipo/palmares";

async function scrape() {
  const { data } = await axios.get(URL, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });

  const $ = cheerio.load(data);

  const results = [];

  $(".articleWidget .static-promo").each((_, el) => {
    const titleText = $(el).find(".thumbnail__title").text().trim();
    const yearsText = $(el).find(".thumbnail__desc").text().trim();

    // ✅ Get image (main one you want)
    let image =
      $(el).find("img").attr("src") || // fallback
      $(el).find("picture").attr("data-img-src") || // sometimes exists
      null;

    if (!titleText) return;

    // Parse title
    const match = titleText.match(/(.+?)\s*-\s*(\d+)/);

    const competition = match ? match[1].trim() : titleText;
    const titles = match ? Number(match[2]) : null;

    const years = yearsText ? yearsText.split(",").map((y) => y.trim()) : [];

    results.push({
      competition,
      titles,
      years,
      image,
    });
  });

  console.log(JSON.stringify(results, null, 2));
}

scrape();
