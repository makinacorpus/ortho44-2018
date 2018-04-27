import React from 'react';
import PropTypes from 'prop-types';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';

export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
  fullImage,
  pricing,
}) => (
  <section>
    <div>
      <div
        style={{ backgroundImage: `url(${image})` }}
      >
        <h2
          style={{
            boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
            backgroundColor: '#f40',
            color: 'white',
            padding: '1rem',
          }}
        >
          {title}
        </h2>
      </div>
      <div>
        <div>
          <h3>
            {heading}
          </h3>
          <p>{description}</p>
        </div>
      </div>
      <Features gridItems={intro.blurbs} />
      <div>
        <div>
          <h3>
            {main.heading}
          </h3>
          <p>{main.description}</p>
        </div>
      </div>
      <div>
        <div>
          <div>
            <div>
              <article>
                <img
                  style={{ borderRadius: '5px' }}
                  src={main.image1.image}
                  alt={main.image1.alt}
                />
              </article>
            </div>
            <div>
              <article>
                <img
                  style={{ borderRadius: '5px' }}
                  src={main.image2.image}
                  alt={main.image2.alt}
                />
              </article>
            </div>
          </div>
          <div>
            <article>
              <img
                style={{ borderRadius: '5px' }}
                src={main.image3.image}
                alt={main.image3.alt}
              />
            </article>
          </div>
        </div>
      </div>
      <Testimonials testimonials={testimonials} />
      <div
        style={{ backgroundImage: `url(${fullImage})` }}
      />
      <h2>
        {pricing.heading}
      </h2>
      <p>{pricing.description}</p>
      <Pricing data={pricing.plans} />
    </div>
  </section>
);

ProductPageTemplate.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.object,
    image2: PropTypes.object,
    image3: PropTypes.object,
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.string,
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <ProductPageTemplate
      image={frontmatter.image}
      title={frontmatter.title}
      heading={frontmatter.heading}
      description={frontmatter.description}
      intro={frontmatter.intro}
      main={frontmatter.main}
      testimonials={frontmatter.testimonials}
      fullImage={frontmatter.full_image}
      pricing={frontmatter.pricing}
    />
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image
        heading
        description
        intro {
          blurbs {
            image
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image
          }
          image2 {
            alt
            image
          }
          image3 {
            alt
            image
          }
        }
        testimonials {
          author
          quote
        }
        full_image
        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`;
