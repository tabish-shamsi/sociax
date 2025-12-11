function getInitials(name: string) {
  if (!name) return "";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return (first + last).toUpperCase();
}

function hashToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;
  const saturation = 65;
  const lightness = 55;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function darkenColor(color: string, amount = 0.7) {
  if (color.startsWith("hsl")) {
    const [h, s, l] = color.match(/\d+/g)!.map(Number);
    const newLightness = Math.max(0, Math.min(100, l * amount));
    return `hsl(${h}, ${s}%, ${newLightness}%)`;
  }

  const matches = color.match(/\d+/g);
  if (!matches) return "rgb(0,0,0)";
  let [r, g, b] = matches.map(Number);

  r = Math.max(0, Math.min(255, r * amount));
  g = Math.max(0, Math.min(255, g * amount));
  b = Math.max(0, Math.min(255, b * amount));

  return `rgb(${r}, ${g}, ${b})`;
}

function getContrastColor(bg: string) {
  const matches = bg.match(/\d+/g);
  if (!matches) return "#000";

  const [r, g, b] = matches.map(Number);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 150 ? "#000" : "#fff";
}

export default function CustomAvatarFallback({ name }: { name: string }) {
  const initials = getInitials(name);
  const bg = hashToColor(name);
  const border = darkenColor(bg, 0.75);
  const text = getContrastColor(bg);

  return (
    <div
      className="flex items-center justify-center rounded-full font-medium"
      style={{
        background: bg,
        color: text,
        border: `2px solid ${border}`,
        width: "100%",
        height: "100%",
      }}
    >
      {initials}
    </div>
  );
}
