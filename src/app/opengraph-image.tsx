import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  const logoPath = join(process.cwd(), 'public/centelha-logo.png');
  const logoBuffer = readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString('base64');

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          alt="CentelhaProd Logo"
          style={{ 
            width: '600px', 
            height: '600px', 
            objectFit: 'contain'
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
