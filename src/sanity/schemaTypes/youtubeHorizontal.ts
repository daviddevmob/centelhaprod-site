import { defineType, defineField } from 'sanity';

export const youtubeHorizontalType = defineType({
  name: 'youtubeHorizontal',
  title: 'YouTube Horizontal',
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
      description: 'Link do vídeo (Ex: https://www.youtube.com/watch?v=...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: { hotspot: true },
      description: 'Capa que aparecerá antes de dar play',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
