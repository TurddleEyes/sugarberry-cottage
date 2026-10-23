/* ==========================================================================
   SUGARBERRY COTTAGE - season.js
   Loaded in the <head> of every page, before anything is drawn.

   1. THE SEASON. Picks the holiday look from today's date:
        fall       September 1 through Thanksgiving
        christmas  the day after Thanksgiving through January 6
        (none)     the rest of the year, the plain cottage look
      Preview any look by adding ?season=fall, ?season=christmas or
      ?season=none to the address.

   2. THE EVENTS. Craft shows and markets. The banner at the top of every
      page and the events section on the home page read from this list.
      Each one disappears by itself once its end time has passed.
   ========================================================================== */
(function () {
  var now = new Date();
  var y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
  var firstDow = new Date(y, 10, 1).getDay();
  var thanksgiving = 1 + ((4 - firstDow + 7) % 7) + 21;

  var season = '';
  if (m >= 8 && (m < 10 || (m === 10 && d <= thanksgiving))) { season = 'fall'; }
  else if ((m === 10 && d > thanksgiving) || m === 11 || (m === 0 && d <= 6)) { season = 'christmas'; }

  var ask = new URLSearchParams(window.location.search).get('season');
  if (ask) { season = ask === 'none' ? '' : ask; }
  if (season) { document.documentElement.setAttribute('data-season', season); }
})();

window.SUGARBERRY_EVENTS = [
  {
    name: 'Tatman Village Craft Show',
    short: 'Sat, Nov 7',
    town: 'Monticello',
    hoursToday: 'until 3pm',
    start: '2026-11-07T09:00',
    end: '2026-11-07T15:00'
  },
  {
    name: 'Gifford Community Craft Show',
    short: 'Nov 21 & 22',
    town: 'Gifford',
    hoursToday: 'at Gordyville USA',
    start: '2026-11-21T08:00',
    end: '2026-11-22T15:00'
  }
];
