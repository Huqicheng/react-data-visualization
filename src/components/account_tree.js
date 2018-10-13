import React, { Component } from "react";

import { Tree, Icon, Layout } from 'antd';

const TreeNode = Tree.TreeNode;

export default class AccountTree extends Component {

    renderTree = (account) => {
        return <TreeNode 
                icon={<Icon type="user" theme="outlined" />} 
                title={account.title} 
                key={account.id}
            >
                {
                    account.children.map(
                        child => 
                            child.children.length === 0 ? 
                                    <TreeNode 
                                        icon={<Icon type="user" theme="outlined" />} 
                                        title={child.title} 
                                        key={child.id} 
                                        
                                    /> 
                                    : this.renderTree(child)
                    )
                }
            </TreeNode>; 
    }

    render() {
        const accounts = this.props.accounts;
        const selected = this.selectedKey;
        return ( 
            accounts.map(
                account => 
                <Tree
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys= {["0"]}
                    onSelect={(selectedKey) => this.props.onSelect(selectedKey)}
                >
                    {
                        this.renderTree(account)
                    }
              
                </Tree>
            )

        );
    }
}

