const svg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="280" height="190" viewBox="0 0 280 190">
    <g transform="translate(30 150) rotate(-35)">
      <text x="0" y="0" font-family="Georgia, serif" font-size="22" fill="#9e6a73" fill-opacity="0.08" letter-spacing="4">DEMONSTRAÇÃO</text>
    </g>
  </svg>
`);

export function WatermarkOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{backgroundImage: `url("data:image/svg+xml,${svg}")`, backgroundSize: '280px 190px'}}
    />
  );
}
