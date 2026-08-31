'use client';

import { useState } from 'react';
import { MONTHS, fmtPct, winRatePct } from '@/lib/record';

const MONTH_ORDER = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * The full month-by-month log, collapsed by default.
 *
 * Newest first — someone opening this wants to see the recent months before
 * the 2023 ones. Rows come straight from src/lib/record.ts. The win rate is
 * the one derived column, and it is derived there rather than here so the
 * table and the headline stat cannot disagree.
 */
export function RecordHistory() {
  const [open, setOpen] = useState(false);

  const rows = [...MONTHS].sort(
    (a, b) =>
      b.year - a.year || MONTH_ORDER.indexOf(b.month) - MONTH_ORDER.indexOf(a.month),
  );

  return (
    <div className="history">
      <button
        type="button"
        className="history-toggle"
        aria-expanded={open}
        aria-controls="record-history"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Hide the full record' : `Open the full record — all ${rows.length} months`}
        <span className="history-sign" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div className="history-panel" id="record-history" data-open={open} role="region">
        <div>
          <div className="history-scroll">
            <table className="history-table">
              <caption className="sr-only">
                Month-by-month record since October 2023
              </caption>
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Trades</th>
                  <th scope="col">Won</th>
                  <th scope="col">Lost</th>
                  <th scope="col">Win rate</th>
                  <th scope="col">Return</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={`${m.year}-${m.month}`}>
                    <th scope="row">
                      {m.month} <span className="history-year">{m.year}</span>
                    </th>
                    <td className="num">{m.trades}</td>
                    <td className="num">{m.wins}</td>
                    <td className="num">{m.losses}</td>
                    <td className="num">{winRatePct(m)}%</td>
                    <td className={`num ${m.gainPct < 0 ? 'history-neg' : 'history-pos'}`}>
                      {fmtPct(m.gainPct)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
