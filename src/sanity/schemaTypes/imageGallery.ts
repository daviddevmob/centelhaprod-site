import { defineType, defineField } from 'sanity';

export const imageGalleryType = defineType({
  name: 'imageGallery',
  title: 'Galeria de Fotos',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Nome da Categoria',
      type: 'string',
      description: 'Ex: Eventos, Institucional, Making of',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
