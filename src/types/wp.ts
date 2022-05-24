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