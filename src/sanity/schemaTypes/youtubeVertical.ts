import { defineType, defineField } from 'sanity';

export const youtubeVerticalType = defineType({
  name: 'youtubeVertical',
  title: 'YouTube Vertical (Shorts)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL do YouTube',
      type: 'url',
      description: 'Link do Shorts ou vídeo vertical',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
      description: 'Capa vertical (9:16)',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
