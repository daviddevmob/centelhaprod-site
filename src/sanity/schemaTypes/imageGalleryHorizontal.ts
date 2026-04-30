import { defineType, defineField } from 'sanity';

export const imageGalleryHorizontalType = defineType({
  name: 'imageGalleryHorizontal',
  title: 'Fotos Horizontais',
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
      title: 'Fotos (Paisagem)',
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
