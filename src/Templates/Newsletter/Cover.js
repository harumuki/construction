import React from 'react'
import { css } from 'glamor'

import { mq } from './styles'

const styles = {
  cover: {
    width: '100%',
    position: 'relative',
    [mq.large]: {
      minHeight: 500,
      height: ['700px', '80vh'],
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  },
  coverImage: {
    display: 'block',
    width: '100%',
    [mq.large]: {
      display: 'none'
    }
  },
  coverLead: {
    position: 'relative',
    [mq.medium]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      color: '#fff',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.80) 100%)'
    }
  },
  coverLeadContainer: {
    [mq.medium]: {
      position: 'absolute',
      zIndex: 1000,
      bottom: '15%',
      left: 0,
      right: 0
    }
  },
  coverLeadCenter: {
    padding: '20px 20px 0',
    [mq.medium]: {
      textAlign: 'center',
      maxWidth: 640,
      margin: '0 auto'
    }
  },
  lead: {
    fontWeight: 'bold',
    margin: 0,
    position: 'relative'
  },
  title: {
    position: 'relative',
    fontSize: 36,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    lineHeight: '1.2em',
    margin: '0 0 0.2em'
  }
}

export const Lead = ({children}) => (
  <div {...css(styles.lead)}>
    {children}
  </div>
)

export const Title = ({children}) => (
  <h1 {...css(styles.title)}>
    {children}
  </h1>
)

export default ({ data: { src, alt }, children }) => {
  return <div
    {...css(styles.cover)}
    {...css({ [mq.large]: { backgroundImage: `url('${src}')` } })}
    >
    <img
      src={src}
      alt={alt}
      {...css(styles.coverImage)}
    />
    <div {...css(styles.coverLead)}>
      <div {...css(styles.coverLeadContainer)}>
        <div {...css(styles.coverLeadCenter)}>
          {children}
        </div>
      </div>
    </div>
  </div>
}
