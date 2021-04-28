import React from 'react';

// import styles
import styles from './social.module.css';

const Social = () => {
  return (
    <div className={styles.socialWrapper}>
      <div className={`fb-share-button ${styles.divSocial}`} data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small">
        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a>
      </div>
      <div className={styles.divSocial}>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
      </div>
      <div className={styles.divSocial}>
        <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark"></a>
      </div>
    </div>
  )
}

export default Social;