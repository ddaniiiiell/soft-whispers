import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export const homeContent = {
  title: "A Quiet Archive",
  subtitleLines: [
    "Some things are too soft for words,",
    "so we keep them here —",
    "in light, in verse, in the space between.",
  ],
  cta: {
    galleryLabel: "Gallery",
    poemsLabel: "Poems",
  },
};

export const galleryContent = {
  title: "Gallery of Memories",
  items: [
    {
      id: "1",
      src: gallery1,
      alt: "Lavender field at golden hour",
      caption: "Where the light learned to linger",
    },
    {
      id: "2",
      src: gallery2,
      alt: "Morning window with sheer curtains",
      caption: "A morning that refused to rush",
    },
    {
      id: "3",
      src: gallery3,
      alt: "Old book with dried flower petals",
      caption: "Pages pressed with tenderness",
    },
    {
      id: "4",
      src: gallery4,
      alt: "Misty lake at dawn with wooden dock",
      caption: "The still hour before everything",
    },
    {
      id: "5",
      src: gallery5,
      alt: "Hand holding a dried wildflower",
      caption: "What we carry without knowing",
    },
    {
      id: "6",
      src: gallery6,
      alt: "Stone pathway through a quiet garden",
      caption: "A path walked only by patience",
    },
  ],
};

export const poemsContent = {
  title: "Collected Verses",
  items: [
    {
      id: "1",
      title: "Small Hours",
      lines: [
        "The clock forgets itself at three,",
        "and I become the quiet",
        "that fills the room like water —",
        "slow, still, and without name.",
      ],
    },
    {
      id: "2",
      title: "Letter Never Sent",
      lines: [
        "I folded you into an envelope",
        "and placed you on the shelf",
        "beside the things I meant to say",
        "but held too long to tell.",
      ],
    },
    {
      id: "3",
      title: "After Rain",
      lines: [
        "The garden remembers",
        "what the sky forgot —",
        "that even endings",
        "leave something soft behind.",
      ],
    },
    {
      id: "4",
      title: "Windowsill",
      lines: [
        "There is a place between",
        "inside and outside",
        "where the dust settles gently",
        "and the light has nothing to prove.",
      ],
    },
    {
      id: "5",
      title: "Inheritance",
      lines: [
        "My grandmother left me",
        "a jar of lavender,",
        "a silence that holds,",
        "and hands that know the earth.",
      ],
    },
  ],
};
