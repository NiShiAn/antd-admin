import React from 'react'
import { arrayMove } from 'utils'
import { Modal, Row, Tree } from 'antd'

const editModal = ({
  ...mPros
}) => {
  const { roleId, roleMenus, checkedKey, curUser, onOk } = mPros
  const cMenu = []

  mPros.onOk = () => {
    onOk({
      json: JSON.stringify({
        RoleId: roleId,
        UpdateBy: curUser.Account,
        MenuList: purviews
      })
    })
  }

  //Tree数据
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
  //选则Tree
  const onCheck = (checkedKeys, info) => {
    //console.log('onCheck', checkedKeys);
    var checkeds =  [...checkedKeys, ...info.halfCheckedKeys];
    
    debugger
  }
  
  return (
    <Modal {...mPros}>
      <Row className='menuBox purview'>
        <Tree checkable defaultExpandAll onCheck={onCheck} defaultCheckedKeys={checkedKey}>
          {buildTree(roleMenus)}
        </Tree>
      </Row>
    </Modal>
  )
}

export default editModal