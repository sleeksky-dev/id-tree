// 100% coded with ChatGPT including the test cases

class TreeNode {
  id: number;
  children: TreeNode[];

  constructor(id: number) {
    this.id = id;
    this.children = [];
  }

  addChild(node: TreeNode): void {
    this.children.push(node);
  }
}

class Tree {
  root: TreeNode | null;
  leafOnlyIds: Set<number>;

  constructor() {
    this.root = null;
    this.leafOnlyIds = new Set();
  }

  setRoot(id: number): TreeNode {
    this.root = new TreeNode(id);
    return this.root;
  }

  addNode(parentId: number, id: number): TreeNode | null {
    if (this.leafOnlyIds.has(parentId)) {
      throw new Error(`Cannot add a child to a leaf-only node with id: ${parentId}`);
    }

    if (this.findNode(id) !== null) {
      throw new Error(`Cannot add a node with id: ${id} because it already exists`);
    }

    const parentNode = this.findNode(parentId);
    if (parentNode === null) {
      return null;
    }

    const newNode = new TreeNode(id);
    parentNode.addChild(newNode);
    return newNode;
  }

  findNode(id: number, currentNode: TreeNode | null = this.root): TreeNode | null {
    if (currentNode === null) {
      return null;
    }

    if (currentNode.id === id) {
      return currentNode;
    }

    for (const child of currentNode.children) {
      const result = this.findNode(id, child);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  setLeafs(ids: number[]): void {
    this.leafOnlyIds = new Set(ids);
    this.fixTree(this.root);
  }

  fixTree(node: TreeNode | null): void {
    if (node === null) {
      return;
    }

    if (this.leafOnlyIds.has(node.id)) {
      const parent = this.findParentNode(node.id);
      if (parent) {
        parent.children.push(...node.children);
      }
      node.children = [];
    }

    for (const child of node.children) {
      this.fixTree(child);
    }
  }

  findParentNode(id: number, currentNode: TreeNode | null = this.root): TreeNode | null {
    if (currentNode === null) {
      return null;
    }

    for (const child of currentNode.children) {
      if (child.id === id) {
        return currentNode;
      }

      const result = this.findParentNode(id, child);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  move(nodeId: number, parentId: number, index?: number): void {
    const node = this.findNode(nodeId);
    const oldParentNode = this.findParentNode(nodeId);
    const newParentNode = this.findNode(parentId);

    if (node === null || oldParentNode === null || newParentNode === null) {
      return;
    }

    // Remove the node from its old parent's children
    oldParentNode.children = oldParentNode.children.filter((child) => child.id !== nodeId);

    // Add the node to its new parent's children at the specified index, or as the last child if index is undefined
    if (typeof index === 'number') {
      newParentNode.children.splice(index, 0, node);
    } else {
      newParentNode.children.push(node);
    }
  }

  private static buildTreeNodes(nodeData: any): TreeNode {
    const node = new TreeNode(nodeData.id);
    for (const childData of nodeData.children) {
      const childNode = Tree.buildTreeNodes(childData);
      node.addChild(childNode);
    }
    return node;
  }  

  private static createArrayNode(node: TreeNode): any[] {
    const compactNode = [
      node.id,
      node.children.map((child) => Tree.createArrayNode(child)),
    ];
    return compactNode;
  }

  toArray(): any[] | {} {
    if (this.root === null) {
      return {};
    }
  
    const compactTree = Tree.createArrayNode(this.root);
    return compactTree;
  }

  private static buildTreeArrayNodes(nodeData: any): TreeNode {
    const node = new TreeNode(nodeData[0]);
    for (const childData of nodeData[1]) {
      const childNode = Tree.buildTreeArrayNodes(childData);
      node.addChild(childNode);
    }
    return node;
  }

  static fromArray(compactData: any[] | {}): Tree {
    const treeData = compactData;
    const tree = new Tree();
    if (Array.isArray(treeData) && treeData.length === 2) {
      tree.root = Tree.buildTreeArrayNodes(treeData);
    } else {
      tree.root = null;
    }
    return tree;
  }

  private static buildTreeObjNodes(nodeData: any): TreeNode {
    const node = new TreeNode(nodeData.i);
    for (const childData of nodeData.c) {
      const childNode = Tree.buildTreeObjNodes(childData);
      node.addChild(childNode);
    }
    return node;
  }

  private static createObjNode(node: TreeNode): object {
    const compactNode = {
      i: node.id,
      c: node.children.map((child) => Tree.createObjNode(child)),
    };
    return compactNode;
  }

  toObj(): object {
    if (this.root === null) {
      return {};
    }
  
    const compactTree = Tree.createObjNode(this.root);
    return compactTree;
  }

  static fromObj(compactData: object): Tree {
    const treeData = compactData;
    const tree = new Tree();
    if (typeof treeData === 'object' && treeData.hasOwnProperty('i') && treeData.hasOwnProperty('c')) {
      tree.root = Tree.buildTreeObjNodes(treeData);
    } else {
      tree.root = null;
    }
    return tree;
  }

  static fromMap(rootId: number, pairs: [number, number][]): Tree {
    const tree = new Tree();
    tree.setRoot(rootId);
  
    let addedNodes: Set<number> = new Set([rootId]);
    let remainingPairs = pairs.slice();
  
    while (remainingPairs.length > 0) {
      const updatedPairs: [number, number][] = [];
  
      for (const [parentId, id] of remainingPairs) {
        if (addedNodes.has(parentId)) {
          tree.addNode(parentId, id);
          addedNodes.add(id);
        } else {
          updatedPairs.push([parentId, id]);
        }
      }
  
      if (remainingPairs.length === updatedPairs.length) {
        break;
      }
  
      remainingPairs = updatedPairs;
    }
  
    return tree;
  }

}

export { Tree }