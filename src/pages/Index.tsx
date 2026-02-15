import { Link } from "react-router-dom";
import { homeContent } from "@/data/content";

const Index = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="animate-fade-in text-5xl font-medium tracking-tight text-foreground md:text-6xl">
          {homeContent.title}
        </h1>

        <div className="animate-fade-in-delay mt-8 space-y-1">
          {homeContent.subtitleLines.map((line, i) => (
            <p key={i} className="text-lg italic text-muted-foreground md:text-xl">
              {line}
            </p>
          ))}
        </div>

        <div className="animate-fade-in-delay-2 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/gallery"
            className="group inline-block min-w-[160px] border border-border px-8 py-3 text-center text-sm tracking-widest text-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground hover:shadow-soft active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {homeContent.cta.galleryLabel}
          </Link>
          <Link
            to="/poems"
            className="group inline-block min-w-[160px] border border-border px-8 py-3 text-center text-sm tracking-widest text-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground hover:shadow-soft active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {homeContent.cta.poemsLabel}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Index;
