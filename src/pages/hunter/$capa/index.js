import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Page } from 'components'
import { Popover } from 'antd'
import styles from './less/index.less'

const Capa = ({
  capa, 
  dispatch, 
  loading
}) => {
  var data = [
    {
      Name: '放出系',
      ClassName: `${styles.text} ${styles.topLeft}`,
      Placement: 'left',
      Content: (
        <div className={styles.detail}>
          <p><span>介绍：</span>气在身体以外仍可以保持威力，可以发到远离身体的地方。将身体的气放出。放出的气可改变外型、攻击敌人或执行命令。任何要将气作用在身体以外都会用到此类属性而且越远越明显，经过修练甚至可以做到瞬间移动（雷欧力，果列奴）。此类属性是最常运用念兽的。放出系的攻击方式以念弹为主，如富兰克林的双手机关枪，磊札的躲避球等。
放出系能力者擅长分割及遮盖空间，但是相对于具现化系，放出系的空间操作擅长于移动空间。</p>
          <p><span>水见式：</span>水的颜色改变</p>
          <p><span>性格表现：</span>粗枝大叶、性急、急躁</p>
        </div>
      )
    },
    {
      Name: '強化系',
      ClassName: `${styles.text} ${styles.top}`,
      Placement: 'top',
      Content: (
        <div className={styles.detail}>
          <p><span>介绍：</span>增强自己或武器本来的性质。可将攻击、防守和疗伤等能力发挥到极致的系。属于此系的人可将念注入不同物体以获得增加其强度的效果，如小杰的必杀技‧猜猜拳就是将念注入拳以增加其攻击力；芬克斯的拳劲大小则取决于手臂转动的圈数，转越多圈力道越强。而将念注入剑后亦可做成接近折不断的剑。精于强化系的能力者肉体强度能达到人类的极限，如窝金被对战车用火箭筒打中也只有皮肉痛的程度。</p>
          <p><span>水见式：</span>水量增加</p>
          <p><span>性格表现：</span>头脑简单、非常单纯</p>
        </div>
      )
    },
    {
      Name: '變化系',
      ClassName: `${styles.text} ${styles.topRight}`,
      Placement: 'right',
      Content: (
        <div className={styles.detail}>
          <p><span>介绍：</span>可将产生的气的性质或形状改变（如奇犽将气变化为电流进行攻击）。只要是改变念的性质都会用到此类属性，但是不管如何改变仍然保有“能量”的性质。变化系能力者的气多半是柔软而具可塑性的，除了本身选择的气变化成的性质，也能捏塑出多样化的工具，如西索能将气拉成黏胶状，玛奇则能把气变成无限延伸的细丝。</p>
          <p><span>水见式：</span>水的味道改变，不同的人会改变成不同的味道</p>
          <p><span>性格表现：</span>反复无常、谎话连篇</p>
        </div>
      )
    },
    {
      Name: '操作系',
      ClassName: `${styles.text} ${styles.btmLeft}`,
      Placement: 'left',
      Content: (
        <div className={styles.detail}>
          <p><span>介绍：</span>可将自身的念注入对像从而控制之（如注入他人体内，可控制他人）。但对对象良好的操控需要大量的练习和技巧。只要是用念控制自己以外的对象（生物、能量...）都会用到此类属性，此外此类属性还可以做到“自动”，例如“金”的录音带就是预先设定条件“自动”发动念。操作系能力若着重在操纵人体则能力者多半也能操纵自身，伊耳谜、侠客和彼多都能做到这点，在该状态下肉体能力会发挥到极限，但持续不久。</p>
          <p><span>水见式：</span>叶片移动</p>
          <p><span>性格表现：</span>我行我素、爱讲道理</p>
        </div>
      )
    },
    {
      Name: '特質系',
      ClassName: `${styles.text} ${styles.btm}`,
      Placement: 'bottom',
      Content: (
        <div className={styles.detail}>
          <p><span>介绍：</span>不属于以上五系的念能力皆分为此类。特质系的能力神秘难测，如库洛洛能盗取他人的念能力，派克诺妲的记忆读取和射出，妮翁的预言能力，以及亚路加的实现愿望能力，都归在特质系。</p>
          <p><span>水见式：</span>发生不同于其他五系的现象皆属于特质系（例︰酷拉皮卡的特质系能力为其他五系均可发挥至100%，水见式效果应为五系现象同时产生；尼飞彼多的水见式是叶子枯掉，也属特质系）</p>
          <p><span>性格表现：</span>个人主义者、有领袖气质</p>
        </div>
      )
    },
    {
      Name: '具現化系',
      ClassName: `${styles.text} ${styles.btmRight}`,
      Placement: 'right',
      Content: (
        <div className={styles.detail}>
          <p><span>介绍：</span>可将自己的气的形态改造成自己想要的东西，即将气实物，物质化，可用气制造出实实在在的武器进行攻击。理论上可以具现出任何东西（物质、空间、念能力、意识...），通常具现物只要一离开身体就会消失，但是借由修练可以设定出消失条件（会失去“收放自如”的优点）。以气具现出的武器通常不是单纯的武器，多半还附加了独特的能力，如小滴的吸尘器能吸走任何非生命物；库哔伪造的物件附带有圆的特性，酷拉皮卡的中指束缚炼则能强制将被绑者锁定在绝的状态。
具现化系能力者分割及遮盖空间，但是相对放出系，具现化系的空间操擅长于在空间内制造各种法则。</p>
          <p><span>水见式：</span>水中出现结晶体类的东西</p>
          <p><span>性格表现：</span>很神经质</p>
        </div>
      )
    }
  ]
  return (
    <Page inner>
      <div className={styles.main}>
        <div className={styles.sixEdge_comb}>
          <div className={`${styles.item} ${styles.left}`}></div>
          <div className={`${styles.item} ${styles.center}`}>發</div>
          <div className={`${styles.item} ${styles.right}`}></div>

          <div className={`${styles.point} ${styles.top}`}></div>
          <div className={`${styles.point} ${styles.btm}`}></div>

          {
            data.map(n => (
              <Popover key={n.Name} content={n.Content} title={n.Name} placement={n.Placement}>
                <div className={n.ClassName}>{n.Name}</div>
              </Popover>
            ))
          }
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
