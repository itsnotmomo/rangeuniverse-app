'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/content';

export function Faq() {
  // Single-open accordion. null = everything closed, which is the initial state
  // so the section reads as a calm list rather than a wall of text.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={f.q} data-open={isOpen}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {f.q}
              <span className="faq-sign" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div className="faq-a" id={`faq-a-${i}`} role="region">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
