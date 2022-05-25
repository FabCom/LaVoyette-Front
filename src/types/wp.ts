interface Rendered {
	rendered: string;
}

export interface AcfForPlay {
  abstract: string;
  duration: number;
	gallery: number[];
}

export interface Play {
	id: number;
	title: Rendered;
	content: Rendered;
  acf: AcfForPlay;
  featured_media: number;
  publics: number[];
  tags_plays: number[];
}

export interface Artist {
	title: Rendered;
	content: Rendered;
	featured_media: number;
}

export interface Partner {
	title: Rendered;
  featured_media: number;
}

export interface AcfForTayloredPlay {
  abstract: string;
	gallery: number[];
}
export interface TayloredPlay {
	id: number;
	title: Rendered;
	content: Rendered;
  acf: AcfForPlay;
  featured_media: number;
  publics: number[];
  taylored_plays_tags: number[];

}

export interface Page {
	id: number;
	title: Rendered;
	content: Rendered;
}