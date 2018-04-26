import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Spinner from '@vtex/styleguide/lib/Spinner'
import { Arrow, Dots } from '@vtex/slick-components'
import shortid from 'shortid'
import keyBy from 'lodash/keyBy'
import map from 'lodash/map'
import range from 'lodash/range'
import property from 'lodash/property'

import Banner from './Banner'

import './global.css'

const bannerStructure = {
  type: 'object',
  title: 'banner',
  properties: {
    image: {
      type: 'string',
      title: 'Banner image',
    },
    mobileImage: {
      type: 'string',
      title: 'Banner mobile image',
    },
    description: {
      type: 'string',
      title: 'Banner description',
    },
    page: {
      type: 'string',
      enum: Object.keys(__RUNTIME__.pages),
      title: 'Banner target page',
    },
    params: {
      type: 'string',
      description: 'Comma separated params, e.g.: key=value,a=b,c=d',
      title: 'Params',
    },
  },
}

/**
 * Carousel component. Shows a serie of banners.
 */
class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    }
  }
  static uiSchema = {
    numberOfBanners: {
      'ui:widget': 'range',
    },
    autoplaySpeed: {
      'ui:widget': 'radio',
      'ui:options': {
        'inline': true,
      },
    },
  }
  static getSchema = ({ numberOfBanners, autoplay }) => {
    numberOfBanners = numberOfBanners || 3

    const getRepeatedProperties = repetition =>
      keyBy(
        map(range(1, repetition + 1), index => {
          return {
            ...bannerStructure,
            title: `Banner ${index}`,
            key: `banner${index}`,
          }
        }),
        property('key')
      )

    const generatedSchema =
      numberOfBanners && getRepeatedProperties(numberOfBanners)

    return {
      title: 'Carousel',
      description:
        'A simple carousel component that shows a serie of banners with images and links',
      type: 'object',
      properties: {
        showDots: {
          type: 'boolean',
          title: 'Show dots',
          default: true,
        },
        showArrows: {
          type: 'boolean',
          title: 'Show arrows',
          default: true,
        },
        height: {
          type: 'number',
          title: 'Banner max height size (px)',
          default: 420,
          enum: [420, 440],
        },
        mobileHeight: {
          type: 'number',
          title: 'Banner max height size on mobile (px)',
          default: 339,
          enum: [339, 159],
        },
        autoplay: {
          type: 'boolean',
          title: 'Autoplay',
          default: true,
        },
        autoplaySpeed: autoplay ? {
          type: 'number',
          title: 'Autoplay speed(sec):',
          enum: [4, 5, 6],
        } : null,
        numberOfBanners: {
          type: 'number',
          title: 'Number of banners',
          default: 3,
          minimum: 1,
          maximum: 10,
        },
        ...generatedSchema,
      },
    }
  }

  configureSettings() {
    const { autoplay, autoplaySpeed, showDots, showArrows } = this.props

    return {
      speed: 500,
      infinite: true,
      pauseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      autoplaySpeed: autoplaySpeed * 1000,
      dots: showDots,
      arrows: showArrows,
      autoplay,
      nextArrow: <Arrow cssClass="vtex-carousel__arrow-right" />,
      prevArrow: <Arrow cssClass="vtex-carousel__arrow-left" />,
      appendDots: dots => <Dots dots={dots} cssClass="vtex-carousel__dots" />,
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    const {
      height,
      mobileHeight,
      banner1,
      banner2,
      banner3,
      banner4,
      banner5,
      banner6,
      banner7,
      banner8,
      banner9,
      banner10,
    } = this.props
    const { loading } = this.state
    const settings = this.configureSettings()

    const banners = [
      banner1,
      banner2,
      banner3,
      banner4,
      banner5,
      banner6,
      banner7,
      banner8,
      banner9,
      banner10,
    ]

    return (
      <div className="vtex-carousel">
        {!loading && (
          <Slider {...settings}>
            {banners.map(function (banner, i) {
              if (banner && banner.image) {
                return (
                  <div
                    key={shortid.generate()}
                    style={{ maxHeight: `${height}px` }}
                  >
                    <Banner
                      image={banner.image}
                      mobileImage={banner.mobileImage}
                      mobileHeight={mobileHeight}
                      page={banner.page}
                      description={banner.description}
                      targetParams={banner.targetParams}
                    />
                  </div>
                )
              }
            })}
          </Slider>
        )}

        {loading && (
          <div className="flex justify-around pa7">
            <div className="w3">
              <Spinner />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const bannerProptype = PropTypes.shape({
  image: PropTypes.string,
  mobileImage: PropTypes.string,
  page: PropTypes.string,
  description: PropTypes.string,
  targetParams: PropTypes.shape({
    params: PropTypes.string,
  }),
})

Carousel.defaultProps = {
  autoplay: true,
  showArrows: true,
  showDots: true,
  height: 420,
  mobileHeight: 339,
  autoplaySpeed: 5,
}

Carousel.propTypes = {
  /** Should change images automatically */
  autoplay: PropTypes.bool.isRequired,
  /** How long it should wait to change the banner in secs */
  autoplaySpeed: PropTypes.number,
  /** Max height size of the banners */
  height: PropTypes.number.isRequired,
  /** Max height size of the banners on mobile */
  mobileHeight: PropTypes.number.isRequired,
  /** Set visibility of dots */
  showDots: PropTypes.bool,
  /** Set visibility of arrows */
  showArrows: PropTypes.bool,
  /** Banner's quantity */
  numberOfBanners: PropTypes.number,
  /** Banners that will be displayed by the Carousel
   *    image - The image url of the banner
   *    page - The page that the banner will be linking to
   *    description - The description of the image
   */
  banner1: bannerProptype,
  banner2: bannerProptype,
  banner3: bannerProptype,
  banner4: bannerProptype,
  banner5: bannerProptype,
  banner6: bannerProptype,
  banner7: bannerProptype,
  banner8: bannerProptype,
  banner9: bannerProptype,
  banner10: bannerProptype,
}

export default Carousel
