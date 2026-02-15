import BackLink from "@/components/BackLink";
import { galleryContent } from "@/data/content";

const Gallery = () => {
  return (
    <main className="min-h-screen bg-background-warm">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-12 md:py-20">
        {/* Navigation */}
        <nav className="animate-fade-in mb-16">
          <BackLink />
        </nav>

        {/* Title */}
        <h1 className="animate-fade-in mb-20 text-center text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          {galleryContent.title}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {galleryContent.items.map((item, i) => (
            <figure
              key={item.id}
              className="animate-fade-in group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="overflow-hidden border border-border p-2 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-soft">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm italic text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
