import BackLink from "@/components/BackLink";
import { poemsContent } from "@/data/content";

const Poems = () => {
  return (
    <main className="min-h-screen bg-background-warm">
      <div className="mx-auto max-w-2xl px-6 py-12 md:px-12 md:py-20">
        {/* Navigation */}
        <nav className="animate-fade-in mb-16">
          <BackLink />
        </nav>

        {/* Title */}
        <h1 className="animate-fade-in mb-24 text-center text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {poemsContent.title}
        </h1>

        {/* Poems */}
        <div className="space-y-24 md:space-y-32">
          {poemsContent.items.map((poem, i) => (
            <article
              key={poem.id}
              className="animate-fade-in flex gap-6"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Vertical line */}
              <div
                className="mt-1 w-px shrink-0 bg-poem-line"
                aria-hidden="true"
              />

              {/* Content */}
              <div>
                <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {poem.title}
                </h2>
                <div className="space-y-1.5">
                  {poem.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Poems;
