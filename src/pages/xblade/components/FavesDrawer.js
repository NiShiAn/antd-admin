import React from 'react'
import { Drawer } from 'antd'
import styles from '../less/favesDrawer.less'
const favesDrawer = ({
  ...dPros
}) => {
  const { info } = dPros
  dPros.title = info.Name

  return (
    <Drawer {...dPros}>
      {
        info.ShopName != "" &&
        <div className={styles.faves}>
          <p>出处</p>
          <p>{info.ShopName}</p>
        </div>
      }
      {
        info.Property != "" &&
        <div className={styles.faves}>
          <p>产权</p>
          <p>{info.Property}</p>
        </div>
      }
      {
        info.Effect != "" &&
        <div className={styles.faves}>
          <p>增益</p>
          <ul>
            {info.Effect.split('@').map((n, i) => (<li key={i}>{n}</li>))}
          </ul>
        </div>
      }
      {
        info.Material != "" &&
        <div className={styles.faves}>
          <p>原料</p>
          <ul>
            {info.Material.split('@').map((n, i) => (<li key={i}>{n}</li>))}
          </ul>
        </div>
      }
      {
        info.Desc != "" &&
        <div className={styles.faves}>
          <p>说明</p>
          <p>{info.Desc}</p>
        </div>
      }
    </Drawer>
  )
}
  
export default favesDrawer
