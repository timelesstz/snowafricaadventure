# Content plan: December 2026 to March 2027

Written 2026-11-19 from the Search Console data in the site database (queries from 23 Jul to 17 Nov 2026).
Most of September to mid-November is missing because the sync was broken. Re-run this check after the
backfill (see "Before you start" below) to confirm the numbers.

## What the data says

1. **Our route guides rank too low to be seen, and the trip pages don't show at all.** People search for
   the trips we sell. Google shows our blog guides for these searches, on page 7 to page 9. It never showed
   a trip page for any of them:

   | Search | Impressions | Our position | Page Google showed |
   |---|---|---|---|
   | kilimanjaro lemosho route | 500 | 85 | /kilimanjaro-lemosho-route-guide/ |
   | marangu route | 492 | 66 | /kilimanjaro-marangu-route-guide/ |
   | climb mount meru | 358 | 70 | /climbing-mount-meru/ (343 of the 358) |
   | how much to climb kilimanjaro | 257 | 75 | split over six pages, mostly /kilimanjaro-budget-guide/ |
   | kilimanjaro machame route | 84 | 75 | /kilimanjaro-machame-route-guide/ |
   | kilimanjaro northern circuit | 94 | 80 | /kilimanjaro-northern-circuit/ |

   New articles will not fix this on their own. These pages need links from other websites (see
   "Authority work"). Two pages that competed for the price search, /kilimanjaro-budget-guide/ and
   /kilimanjaro-cost-breakdown/, now redirect (301) to /kilimanjaro-prices/ (done 2026-11-19). From
   2026-11-19 every guide carries a trip card with a quote form in the middle of the article, which points
   readers to the trip it covers.

2. **Some commercial searches sit at positions 15 to 75, and each already has a page that ranks.** A
   better version of that page could reach page 1 or 2. Rewrite the page Google already shows; don't
   publish a second page on the same search, or the two will compete:

   | Search | Impressions | Position | Page Google showed |
   |---|---|---|---|
   | hiking in tanzania | 462 | 39 | /hiking-trails-tanzania/ |
   | climb kilimanjaro uk | 444 | 37 | /kilimanjaro-from-uk/ |
   | climb kilimanjaro for charity | 336 | 52 | /kilimanjaro-charity-climbs/ (315 of the 336) |
   | tanzania safari and kilimanjaro climb | 255 | 33 | /an-incredible-kilimanjaro-climbing-tanzania-safari-adventure-with-snow-africa-adventure/ |
   | ngorongoro crater safari | 243 | 35 | /ngorongoro-crater-safari/ |
   | wellness trips in tanzania | 153 | 27 | /wellness-retreats-tanzania/ |
   | tanzania camping safari | 118 | 18 | /tanzania-camping-safari/ (the article, not the /tanzania-camping-safaris/ trip page) |
   | luxury kilimanjaro climb | 106 | 19 | /kilimanjaro-luxury-climb/ |
   | ethical kilimanjaro tour + kilimanjaro porter welfare tour operator | 191 | 25 | /ethical-kilimanjaro-porter-welfare/ |
   | serengeti balloon safari | 107 | 73 | /balloon-safari-serengeti/ |
   | kilimanjaro group departures | 84 | 23 | /kilimanjaro-join-group-departures/ (73), /kilimanjaro-group-climbs/ (11) |

3. **The posts that get clicks are trivia** (snow in Africa, Kilimanjaro vs Everest, tigers in Tanzania).
   They rank 2 to 10 but rarely lead to an enquiry. Keep them; the trip card in each article now gives
   those readers a way to ask for a quote. Don't write more trivia.

## Rewrites, in this order

Every search in the tables above already has a page, so this quarter is rewrites, not new pages. Two a
month is realistic. Each needs facts only the team has. A `[NEEDS: …]` item has to be answered before the
page is rewritten. No made-up numbers or reviews. Keep each URL as it is: it already ranks.

| # | Page | Target search | Month | Facts needed from the team |
|---|---|---|---|---|
| 1 | /an-incredible-kilimanjaro-climbing-tanzania-safari-adventure-with-snow-africa-adventure/ (climb + safari: how to combine them) | tanzania safari and kilimanjaro climb | Dec | [NEEDS: which combos you sell most, real day counts, rest day between climb and safari?] |
| 2 | /ethical-kilimanjaro-porter-welfare/ (how we treat our crew) | ethical kilimanjaro tour, porter welfare | Dec | [NEEDS: porter pay, load limit, kit provided, any KPAP or IMEC membership. Publish only what is true and can be checked] |
| 3 | /ngorongoro-crater-safari/ (a day in the crater) | ngorongoro crater safari | Jan | [NEEDS: which packages include the crater, crater fee in 2027, real guide photos] |
| 4 | /kilimanjaro-luxury-climb/ (what a private, premium climb includes) | luxury kilimanjaro climb | Jan | [NEEDS: do you sell a premium tier? private toilet tent, camp staff, price range] |
| 5 | /balloon-safari-serengeti/ | serengeti balloon safari | Feb | [NEEDS: which operator you book, 2027 price, seasons it runs] |
| 6 | /wellness-retreats-tanzania/ | wellness trips in tanzania | Mar | Only if you sell one. [NEEDS: real itinerary] |

## Refreshes (pages that already rank higher up)

| Page | Why | Month |
|---|---|---|
| /kilimanjaro-from-uk/ | 444 impressions at position 37. Add flight routes from London, a sample timeline, UK insurance notes | Dec |
| /hiking-trails-tanzania/ | 462 impressions at position 39. Add the days, season and permits for each trail, as the team confirms them | Dec |
| /kilimanjaro-charity-climbs/ | 336 impressions (315 of them on this page) at position 52. Add how a charity group books with us | Jan |
| /tanzania-camping-safari/ | Already at position 18; a fuller page can reach page 1 | Jan |
| /tanzania-festival/ | Refreshed for 2027 on 2026-11-19. Add the Mwaka Kogwa and ZIFF 2027 dates once they are announced | Mar |
| /mount-kilimanjaro-packing-list-2025/ | Title refreshed for 2026-2027. The slug still says 2025, so a redirect to a slug without the year is worth doing | Feb |

Any title that names a year (2026, 2027) has to be updated every January (see "Every January" below).

## Authority work (needed for the trip pages)

Content alone will not move positions 60 to 85. These do:

- Get listed on the Kilimanjaro operator directories and Tanzania tourism sites that link to operators
  (for example the TATO member list, if you are a member).
- Ask past climbers who blog or post trip reports to link to the route they climbed.
- Pitch one data story a quarter to travel press. The summit-success numbers from your own climbs
  would work, once the team confirms them.

## Every January

- Search the blog for last year in titles and meta descriptions (`2026` in January 2027) and update them.
- Check festival dates for the new year.
- Re-run this query check and replace the tables above.

## Before you start

The Search Console sync fix (2026-11-19) has to be deployed first. Then backfill September to November by
POSTing `{ "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD" }` to `/api/admin/seo/sync-gsc` in two-week
chunks while logged in to the admin. After that, the numbers here can be checked against complete data.
