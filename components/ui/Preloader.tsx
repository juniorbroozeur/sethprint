'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader">
      <div className="pl-logo">
        <div className="pl-s">
          <span>S</span>
        </div>
        <div className="pl-name">
          <span>
            <span className="pc">e</span>
            <span className="pm">t</span>
            <span className="py">h</span>
            <span className="pw">&nbsp;Print Design</span>
          </span>
        </div>
      </div>
      <div className="pl-cmyk">
        <span className="cc" />
        <span className="mm" />
        <span className="yy" />
        <span className="kk" />
      </div>
      <div className="pl-label">Work Perfection · Lubumbashi · RDC</div>
    </div>
  );
}