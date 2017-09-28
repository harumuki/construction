import Container from './Container'
import Cover, {Title, Lead} from './Cover'
import Paragraph, {Strong, Em, Link} from './Paragraph'
import Center from './Center'
import { H2, H3 } from './Headlines'
import Figure, { Image, Caption } from './Figure'
import Blockquote from './Blockquote'
import List, { ListItem } from './List'

const matchType = type => node => node.type === type
const matchHeading = depth => node => (
  node.type === 'heading' && node.depth === depth
)
const matchZone = identifier => node => (
  node.type === 'zone' && node.identifier === identifier
)
const matchParagraph = matchType('paragraph')
const matchImage = matchType('image')
const matchImageParagraph = node => (
  matchParagraph(node) &&
  node.children.length === 1 &&
  matchImage(node.children[0])
)

const paragraph = {
  matchMdast: matchType('paragraph'),
  component: Paragraph,
  rules: [
    {
      matchMdast: matchType('strong'),
      component: Strong
    },
    {
      matchMdast: matchType('emphasis'),
      component: Em
    },
    {
      matchMdast: matchType('link'),
      getData: node => ({
        title: node.title,
        href: node.url
      }),
      component: Link
    }
  ]
}

const schema = {
  rules: [
    {
      matchMdast: matchType('root'),
      component: Container
    },
    {
      matchMdast: matchZone('COVER'),
      component: Cover,
      getData: node => {
        const img = node.children[0].children[0]
        return {
          alt: img.alt,
          src: img.url
        }
      },
      rules: [
        {
          matchMdast: matchImageParagraph,
          component: () => null
        },
        {
          matchMdast: matchHeading(1),
          component: Title
        },
        {
          matchMdast: matchType('blockquote'),
          component: Lead,
          rules: [
            paragraph
          ]
        }
      ]
    },
    {
      matchMdast: matchZone('CENTER'),
      component: Center,
      rules: [
        paragraph,
        {
          matchMdast: matchHeading(2),
          component: H2
        },
        {
          matchMdast: matchHeading(3),
          component: H3
        },
        {
          matchMdast: matchZone('FIGURE'),
          component: Figure,
          getData: node => node.data,
          rules: [
            {
              matchMdast: matchImageParagraph,
              component: Image,
              getData: node => ({
                src: node.children[0].url,
                alt: node.children[0].alt
              })
            },
            {
              matchMdast: matchType('paragraph'),
              component: Caption,
              getData: (node, parent) => (parent && parent.data) || {},
              rules: paragraph.rules
            }
          ]
        },
        {
          matchMdast: matchType('blockquote'),
          component: Blockquote,
          rules: [
            paragraph
          ]
        },
        {
          matchMdast: matchType('list'),
          component: List,
          getData: node => ({
            ordered: node.ordered,
            start: node.start
          }),
          rules: [
            {
              matchMdast: matchType('listItem'),
              component: ListItem,
              rules: [paragraph]
            }
          ]
        }
      ]
    }
  ]
}

export default schema
