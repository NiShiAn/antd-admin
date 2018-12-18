import React from 'react'
import { arrayMove } from 'utils'
import { Modal, Row, Tree } from 'antd'

const editModal = ({
  ...mPros
}) => {
  const { roleId, roleMenus, checkedKey, curUser, onOk, dispatch } = mPros

  //submit
  mPros.onOk = () => {
    let cycleMenu = (data, ary) => {
      data.filter(n => n.Checked || n.HalfChecked).map((item, i) => {
        ary.push({
          MenuId: item.Idx,
          Sort: i + 1
        })
        item.ChildList && cycleMenu(item.ChildList, ary)
      })
    }
    let menuList = []
    cycleMenu(roleMenus, menuList)

    onOk({
      json: JSON.stringify({
        RoleId: roleId,
        UpdateBy: curUser.Account,
        MenuList: menuList
      })
    })
  }
  //build-Tree
  const buildTree = (data) => {
    return data.sort((p, n) => p.Sort - n.Sort).map(item => {
      return (
        <Tree.TreeNode 
          title={
            <div className={`menuTitle level${item.Level}`} >
              <span>{item.Name}</span>
            </div>
          } 
          key={item.Key} 
          dataRef={item}>
          { item.ChildList && item.ChildList.length > 0 &&
            buildTree(item.ChildList)
          }
        </Tree.TreeNode>
      )
    });
  }
  //check-Tree
  const onCheck = (checkedKeys, info) => {
    let checkData = (data, checkeds, halfCheckeds) => {
      data.map(item => {
        item.Checked = checkeds.findIndex(n => n == item.Key) > -1
        item.HalfChecked = halfCheckeds.findIndex(n => n == item.Key) > -1
        item.ChildList && checkData(item.ChildList, checkeds, halfCheckeds)
      });
    }
    checkData(roleMenus, checkedKeys, info.halfCheckedKeys)
    dispatch('role/updateState', { roleMenus: roleMenus, checkedKey: checkedKeys })
  }
  //sort-Tree
  const onDrop = (info) => {
    let dataCheck = (data, parentKey, checkeds) => {
      data.map((item, i) => {
        item.Sort = 0
        item.Key = `0${(item.Level == 1 ? '' : `-${parentKey}`)}-${i}`
        item.Checked && checkeds.push(item.Key)
        item.ChildList && dataCheck(item.ChildList, i, checkeds)
      });
    }
    //当前
    let curInfo = info.dragNode.props.dataRef
    //目标
    let tarInfo = info.node.props.dataRef
    //判断
    if(curInfo.ParentId != tarInfo.ParentId || !info.dropToGap) return
    
    let data = curInfo.Level == 1
      ? roleMenus 
      : roleMenus.find(n => n.Idx == curInfo.ParentId).ChildList
    //置换的Index
    let curIndex = data.findIndex(n => n == curInfo)
    let tarIndex = data.findIndex(n => n == tarInfo)
    tarIndex += info.dropPosition >= 0 ? 0 : -1
    tarIndex = tarIndex < 0 ? 0 : tarIndex

    //重排数组
    data = arrayMove(data, curIndex, tarIndex)
    //重排Key
    let ary = []
    dataCheck(roleMenus, 0, ary)
    dispatch('role/updateState', { roleMenus: roleMenus, checkedKey: ary })
  }

  return (
    <Modal {...mPros}>
      <Row className='menuBox purview'>
        <Tree 
        defaultExpandAll
        checkable onCheck={onCheck} checkedKeys={checkedKey}
        draggable onDrop={onDrop}>
          {buildTree(roleMenus)}
        </Tree>
      </Row>
    </Modal>
  )
}

export default editModal