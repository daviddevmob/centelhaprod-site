import { defineType, defineField } from 'sanity';

export const imageGalleryVerticalType = defineType({
  name: 'imageGalleryVertical',
  title: 'Fotos Verticais',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Nome da Categoria',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Fotos (Retrato)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', title: 'Legenda', type: 'string' }],
        },
      ],
    }),
  ],
});
