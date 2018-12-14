import React from 'react'
import { arrayMove } from 'utils'
import { Modal, Row, Tree } from 'antd'

const editModal = ({
  ...mPros
}) => {
  const { roleMenus, checkedKey, curUser, onOk } = mPros

  mPros.onOk = () => {
    validateFields((errors) => {
      if (errors) return
      let data = getFieldsValue()

      onOk({
        json: JSON.stringify({
          Idx: info.Idx,
          Account: data.Account || '',
          UserName: data.UserName,
          RoleId: data.RoleId,
          IsActive: true,
          CreateBy: curUser.Account,
          UpdateBy: curUser.Account
        })
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
  const checkMenu = (selectedKeys, info) => {
    var checkeds = info.checkedNodes.map(n => n.props.dataRef);
    debugger
  }
  
  return (
    <Modal {...mPros}>
      <Row className='menuBox purview'>
        <Tree checkable defaultExpandAll onCheck={checkMenu} checkedKeys={checkedKey}>
          {buildTree(roleMenus)}
        </Tree>
      </Row>
    </Modal>
  )
}

export default editModal