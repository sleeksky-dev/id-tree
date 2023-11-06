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
      parentId = this.root?.id || 0;
    }

    if (this.findNode(id) !== null) {
      throw new Error(`Cannot add a node with id: ${id} because it already exists`);
    }

    let parentNode = this.findNode(parentId);
    if (parentNode === null) {
      parentNode = this.root;
    }
    if (!parentNode) return null;

    const newNode = new TreeNode(id);
    parentNode.addChild(newNode);
    return newNode;
  }

  removeNode(id: number): void {
    const node = this.findNode(id);
    const parent = this.findParentNode(id);

    if (node === null || parent === null) {
      return;
    }

    parent.children = parent.children.filter((child) => child.id !== id);
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

  bfsOrder(includeLevel = false): number[] | [number, number][] {
    const queue: [TreeNode, number][] = [];
    const result: [number, number][] = [];
  
    if (this.root) {
      queue.push([this.root, 0]);
    }
  
    while (queue.length > 0) {
      const [node, level] = queue.shift()!;
      result.push([node.id, level]);
  
      for (const child of node.children) {
        queue.push([child, level + 1]);
      }
    }
    if (!includeLevel) return result.map((x) => x[0]);
    return result;
  }
  
  dfsOrder(includeLevel = false): number[] | [number, number][] {
    const result: [number, number][] = [];
  
    const traverse = (node: TreeNode, level: number) => {
      result.push([node.id, level]);
      for (const child of node.children) {
        traverse(child, level + 1);
      }
    };
  
    if (this.root) {
      traverse(this.root, 0);
    }
  
    if (!includeLevel) return result.map((x) => x[0]);
    return result;
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

    for (const [ , id] of pairs) tree.addNode(rootId, id);

    for (const [parentId, id] of pairs) tree.move(id, parentId);   
  
    return tree;
  }

}

export { Tree }