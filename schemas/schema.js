// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      name: 'author',
      type: 'document',
      title: 'Author',
      fields:[
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'avatar',
          title: 'Avatar',
          type: 'image'
        }
      ]
    },
    {
      name: 'category',
      type: 'document',
      title: 'Category',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name',
        },
        {
          name:'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => Rule.required()
        }
      ]
    },
      /* BLOG */
    {
      name: 'blog',
      type: 'object',
      title: 'BLOG',
      fields:[
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule)=> {return Rule.required().min(3)}
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle'
        },
        {
          name: 'category',
          type: 'reference',
          title: 'Category',
          to:[{type:'category'}],
          // options: {
          //   filter: 'category == $category',
          //   filterParams: {category: 'category'}
          // },
          validation: Rule => Rule.required()
        },
        {
          name: 'year',
          type: 'string',
          title: 'Year'
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type:'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Description'
            }
          ]
        },
        {
          name:'content',
          title:'Content',
          type: 'array',
          of: [
            {
              type: 'block'
            },
            {
              type: 'image',
              fields: [
                {
                  type: 'text',
                  name: 'alt',
                  title: 'Description',
                  options: {
                    isHighlighted: true
                  }
                },
                {
                  title: 'Image Position',
                  name: 'position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Left', value: 'left'},
                      {title: 'Center', value: 'center'},
                      {title: 'Right', value: 'right'},
                    ],
                    layout: 'radio',
                    isHighlighted: true
                  }
                }
              ],
              options: {
                hotspot: true
              }
            },
            {
              type: 'code',
              name: 'code',
              options: {
                withFilename: true
              }
            },
          ]
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
          validation: Rule => Rule.required()
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to:[{type:'author'}],
          validation: Rule => Rule.required()
        },
        {
          name:'slug',
          type: 'slug',
          title: 'Slug',
          validation: Rule => Rule.required()
        }
      ]
    },
    // {
    //   name: 'album',
    //   type: 'document',
    //   title: 'Album',
    //   fields: [
    //     {
    //       name: 'band',
    //       type: 'string',
    //       title: 'Band'
    //     },
    //     {
    //       name: 'album',
    //       type: 'string',
    //       title: 'Album'
    //     },
    //     {
    //       name: 'year',
    //       type: 'number',
    //       title: 'Year'
    //     },
    //   ]
    // },
    {
      name: 'band',
      type: 'document',
      title: 'Band',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name'
        }
      ]
    },

  ]),
})
