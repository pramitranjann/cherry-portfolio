import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** The little four-petal flower from her banner, on cream. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f2e8',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 12 12">
          <g fill="#d96a8b">
            <circle cx="6" cy="2.4" r="2" />
            <circle cx="6" cy="9.6" r="2" />
            <circle cx="2.4" cy="6" r="2" />
            <circle cx="9.6" cy="6" r="2" />
          </g>
          <circle cx="6" cy="6" r="1.3" fill="#211d18" />
        </svg>
      </div>
    ),
    size,
  );
}
