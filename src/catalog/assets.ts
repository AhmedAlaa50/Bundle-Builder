const modules = import.meta.glob("../assets/**/*.{svg,png,jpg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function assetUrl(filename: string): string {
  const hit = Object.entries(modules).find(([path]) =>
    path.replaceAll("\\", "/").endsWith(`/${filename}`),
  );
  if (!hit) {
    throw new Error(`Unknown catalog asset: ${filename}`);
  }
  return hit[1];
}
