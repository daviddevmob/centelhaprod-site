import { type SchemaTypeDefinition } from 'sanity';
import { youtubeHorizontalType } from './youtubeHorizontal';
import { youtubeVerticalType } from './youtubeVertical';
import { imageGalleryHorizontalType } from './imageGalleryHorizontal';
import { imageGalleryVerticalType } from './imageGalleryVertical';
import { heroSlideType } from './hero';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSlideType,
    youtubeHorizontalType,
    youtubeVerticalType,
    imageGalleryHorizontalType,
    imageGalleryVerticalType,
  ],
};
