import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import BgImg from '../components/background'
import logo from '../images/logo.png'
import Helmet from 'react-helmet'

const IndexPage = ({data}) => {
console.log(data)
const posts = data.allContentfulGallery.edges;
const page = data.contentfulHome;

  return (
    <div>

      <Helmet>
        <title>Nick Lewis - Web and Photography</title>
        <meta name="description" content="Nick Lewis helps develop web experiences featuring rich photography for the image makers of the World" />
        <meta property="og:title" content="Nick Lewis - web developer and photography"/>
        <meta property="og:image" content={page.cover.sizes.src} />
        <meta property="og:image:width" content="1800" />
        <meta property="og:image:height" content="1200" />
      </Helmet>

      <div className="intro intro--home sticky">
        {/* <h1><img className="logo" src={logo} /></h1> */}
        <BgImg height={'75vh'} sizes={page.cover.sizes} alt={page.cover.title} title={page.cover.title} />
      </div>

    <div className="page">

      <div className="quote" dangerouslySetInnerHTML={{ __html: page.quote.childMarkdownRemark.html }} />

      <div className="featured">

        <div className="featured__newest sticky">
          <h2>{posts[0].node.title}</h2>
          <Link to={posts[0].node.slug + "/"}>
            <Img sizes={posts[0].node.cover.sizes} alt={posts[0].node.cover.title} title={posts[0].node.cover.title} backgroundColor={"#f1f1f1"} />
            <h3>view {posts[0].node.title}</h3>
          </Link>
        </div>

        <ul className="featured__list">
          {posts.slice(1).map(({ node: post }) => (
            <li key={post.id}>
              <Link to={post.slug + "/"}>
                <Img sizes={post.cover.sizes} alt={post.cover.title} title={post.cover.title} backgroundColor={"#f1f1f1"} />
                <h3>view {post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>

      </div>

    </div>
  </div>
  )
}

export const query = graphql`
  query HomeQuery {
    allContentfulGallery(limit: 8, sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          id
          slug
          date(formatString: "M.DD.YYYY")
          cover {
            title
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_withWebp_noBase64
            }
          }
        }
      }
    }
    contentfulHome {
      title
      slug
      id
      cover
       {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_withWebp_noBase64
        }
      }
      quote {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default IndexPage
