export type RouteParams = {
  [key: string]: string | undefined;
};

export type SearchResult = {
  nasaId: string;
  title: string | undefined;
  thumbnail: string | undefined;
  location: string | undefined;
  photographer: string | undefined;
};

export type Collection = {
  title: string;
  location: string | undefined;
  photographer: string | undefined;
  description: string | undefined;
  keywords: string[];
  date: string | undefined;
  image: string;
};
