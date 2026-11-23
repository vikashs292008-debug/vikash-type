import { GameResult } from '../types/game';
import { siteContent } from '../config/siteContent';

export async function generateResultCardCanvas(result: GameResult): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas 2d context');

  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1080, 1080);

  // Subtle grid lines
  ctx.strokeStyle = '#181818';
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 0; x <= 1080; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1080);
    ctx.stroke();
  }
  for (let y = 0; y <= 1080; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1080, y);
    ctx.stroke();
  }

  // Outer brutalist border
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, 1000, 1000);

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 52, 976, 976);

  // Header Brand
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillText('V.  VIKASH TYPE', 90, 130);

  ctx.fillStyle = '#888888';
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText('ARENA TELEMETRY VERIFICATION // ' + result.date, 90, 165);

  // Divider line
  ctx.strokeStyle = '#282828';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(90, 205);
  ctx.lineTo(990, 205);
  ctx.stroke();

  // Big Performance Rank Badge
  ctx.fillStyle = '#111111';
  ctx.fillRect(90, 240, 900, 80);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(90, 240, 900, 80);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.fillText('RANK: ' + result.rank.name.toUpperCase(), 120, 290);

  ctx.fillStyle = '#888888';
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText('STATUS: ' + result.rank.badge, 800, 290);

  // Giant WPM block
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 160px "Space Grotesk", sans-serif';
  ctx.fillText(String(result.wpm), 90, 480);

  ctx.fillStyle = '#888888';
  ctx.font = 'bold 38px "JetBrains Mono", monospace';
  ctx.fillText('WPM', 390, 475);

  // Accuracy block right beside
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px "Space Grotesk", sans-serif';
  ctx.fillText(result.accuracy.toFixed(1) + '%', 620, 480);

  ctx.fillStyle = '#888888';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.fillText('ACCURACY', 620, 525);

  ctx.fillStyle = '#888888';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.fillText('NET VELOCITY', 90, 525);

  // Horizontal divider
  ctx.strokeStyle = '#222222';
  ctx.beginPath();
  ctx.moveTo(90, 570);
  ctx.lineTo(990, 570);
  ctx.stroke();

  // Stats Grid 2x2
  const statBox = (x: number, y: number, w: number, h: number, label: string, val: string) => {
    ctx.fillStyle = '#0c0c0c';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#242424';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#777777';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText(label, x + 24, y + 42);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.fillText(val, x + 24, y + 90);
  };

  statBox(90, 610, 430, 120, 'RAW VELOCITY', `${result.rawWpm} WPM`);
  statBox(560, 610, 430, 120, 'DURATION', `${result.timeElapsed}s (${result.mode})`);
  statBox(90, 755, 430, 120, 'KEYSTROKES', `${result.totalKeystrokes} KEYS`);
  statBox(560, 755, 430, 120, 'PRECISION ACCURACY', `${result.correctChars} / ${result.correctChars + result.incorrectChars} OK`);

  // Footer Branding & Tagline
  ctx.fillStyle = '#111111';
  ctx.fillRect(90, 915, 900, 75);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1;
  ctx.strokeRect(90, 915, 900, 75);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.fillText(siteContent.footer.builtBy.toUpperCase(), 120, 960);

  ctx.fillStyle = '#888888';
  ctx.font = 'italic 16px "Inter", sans-serif';
  ctx.fillText('“' + siteContent.branding.tagline + '”', 550, 960);

  return canvas;
}

export async function downloadResultCard(result: GameResult): Promise<void> {
  const canvas = await generateResultCardCanvas(result);
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `vikash-type-${result.wpm}wpm-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}

export function generateShareText(result: GameResult): string {
  return `⚡ VIKASH TYPE ARENA REPORT
Score: ${result.wpm} WPM | ${result.accuracy.toFixed(1)}% Accuracy
Rank: ${result.rank.name}
Mode: ${result.mode} (${result.timeElapsed}s)
Total Keystrokes: ${result.totalKeystrokes}
“${siteContent.branding.tagline}”
Dare to match my speed: ${window.location.href}`;
}

export async function shareResultNative(result: GameResult): Promise<boolean> {
  const text = generateShareText(result);
  if (navigator.share) {
    try {
      const canvas = await generateResultCardCanvas(result);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'result.png', { type: 'image/png' })] })) {
        const file = new File([blob], 'vikash-type-result.png', { type: 'image/png' });
        await navigator.share({
          title: `VIKASH TYPE — ${result.wpm} WPM`,
          text: text,
          files: [file],
        });
        return true;
      } else {
        await navigator.share({
          title: `VIKASH TYPE — ${result.wpm} WPM`,
          text: text,
          url: window.location.href,
        });
        return true;
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Share failed', err);
      }
      return false;
    }
  }
  return false;
}

export function getWhatsAppShareUrl(result: GameResult): string {
  const text = encodeURIComponent(generateShareText(result));
  return `https://api.whatsapp.com/send?text=${text}`;
}
