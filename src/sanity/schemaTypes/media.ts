import { defineType, defineField } from 'sanity';

export const mediaGalleryType = defineType({
  name: 'mediaGallery',
  title: 'Galerias de Mídia',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Nome da Categoria',
      type: 'string',
      description: 'Ex: Eventos, Institucional, Social Media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Itens da Galeria',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          title: 'Item de Mídia',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Vídeo', value: 'video' },
                  { title: 'Imagem', value: 'image' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Imagem / Capa',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'videoUrl',
              title: 'URL do Vídeo',
              type: 'url',
              description: 'Link do Vimeo ou YouTube',
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'type',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
});
