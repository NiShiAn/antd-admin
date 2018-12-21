import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Page } from 'components'
import styles from './less/index.less'

const Capa = ({
  capa, 
  dispatch, 
  loading
}) => {
  return (
    <Page inner>
      <div className={styles.main}>
        <div className={styles.sixEdge_comb}>
          <div className={`${styles.item} ${styles.left}`}></div>
          <div className={`${styles.item} ${styles.center}`}>發</div>
          <div className={`${styles.item} ${styles.right}`}></div>

          <div className={`${styles.point} ${styles.top}`}></div>
          <div className={`${styles.point} ${styles.btm}`}></div>

          {/* <div className={`${styles.text} ${styles.topLeft}`}>放出系</div>
          <div className={`${styles.text} ${styles.top}`}>強化系</div>
          <div className={`${styles.text} ${styles.topRight}`}>變化系</div>
          <div className={`${styles.text} ${styles.btmLeft}`}>操作系</div>
          <div className={`${styles.text} ${styles.btm}`}>特質系</div>
          <div className={`${styles.text} ${styles.btmRight}`}>具現化系</div> */}
        </div>
      </div> 
    </Page>
  )
}

Capa.propTypes = {
  capa: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({ capa, loading }) => ({ capa, loading }))(Capa)
