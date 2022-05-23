interface Rendered {
	rendered: string;
}

export interface AcfForPlay {
  abstract: string;
  duration: number;
}

export interface Play {
	id: number;
	title: Rendered;
	content: Rendered;
	excerpt: Rendered;
	modified: string;
	date: string;
  acf: AcfForPlay;
  featured_media: number;
  publics: number[];
  tags_plays: number[];
}

export interface Artist {
	title: Rendered;
	content: Rendered;
}

export interface Partner {
	title: Rendered;
  featured_media: number;
}