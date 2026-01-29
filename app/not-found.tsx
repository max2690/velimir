import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl md:text-8xl font-display font-medium mb-4">404</h1>
      <p className="text-secondary text-lg mb-8 text-center">
        Страница не найдена
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-foreground text-background text-sm uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}
