import { Tree } from '../src';

describe('Tree', () => {
  test('Adding nodes and finding nodes', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);

    expect(tree.findNode(1)?.id).toBe(1);
    expect(tree.findNode(2)?.id).toBe(2);
    expect(tree.findNode(3)?.id).toBe(3);
    expect(tree.findNode(4)?.id).toBe(4);
    expect(tree.findNode(5)?.id).toBe(5);
    expect(tree.findNode(6)).toBeNull();
  });

  test('Adding duplicate nodes should throw an error', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    expect(() => {
      tree.addNode(1, 2);
    }
    ).toThrowError('Cannot add a node with id: 2 because it already exists');
  });

  test('Setting leaf nodes and fixing tree', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);

    tree.setLeafs([2]);

    expect(tree.findNode(2)?.children).toHaveLength(0);
    expect(tree.findNode(1)?.children).toHaveLength(4);
  });

  test('Moving nodes', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);

    tree.move(4, 1);

    expect(tree.findNode(2)?.children).toHaveLength(1);
    expect(tree.findNode(1)?.children).toHaveLength(3);
  });

  test('Compact representation using arrays', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);

    const compactArray = tree.toArray();
    const restoredTree = Tree.fromArray(compactArray);

    expect(restoredTree.findNode(1)?.id).toBe(1);
    expect(restoredTree.findNode(2)?.id).toBe(2);
    expect(restoredTree.findNode(3)?.id).toBe(3);
    expect(restoredTree.findNode(4)?.id).toBe(4);
    expect(restoredTree.findNode(5)?.id).toBe(5);
  });

  test('Compact representation using objects', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);

    const compactObject = tree.toObj();
    console.log(JSON.stringify(compactObject))
    const restoredTree = Tree.fromObj(compactObject);

    expect(restoredTree.findNode(1)?.id).toBe(1);
    expect(restoredTree.findNode(2)?.id).toBe(2);
    expect(restoredTree.findNode(3)?.id).toBe(3);
    expect(restoredTree.findNode(4)?.id).toBe(4);
    expect(restoredTree.findNode(5)?.id).toBe(5);
  });


  test('Adding a child to a leaf-only node should throw an error', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);

    tree.setLeafs([3]);

    expect(() => {
      tree.addNode(3, 4);
    }).toThrowError('Cannot add a child to a leaf-only node with id: 3');
  });

  test('Compact array representation with no leaf-only nodes', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);
    tree.setLeafs([2]);

    const compactArray = tree.toArray();
    const restoredTree = Tree.fromArray(compactArray);

    expect(restoredTree.findNode(1)?.id).toBe(1);
    expect(restoredTree.findNode(2)?.id).toBe(2);
    expect(restoredTree.findNode(3)?.id).toBe(3);
    expect(restoredTree.findNode(4)?.id).toBe(4);
    expect(restoredTree.findNode(5)?.id).toBe(5);
    expect(() => {
      restoredTree.addNode(2, 6);
    }).not.toThrowError('Cannot add a child to a leaf-only node with id: 2');
  });

  test('Compact object representation with no leaf-only nodes', () => {
    const tree = new Tree();
    tree.setRoot(1);
    tree.addNode(1, 2);
    tree.addNode(1, 3);
    tree.addNode(2, 4);
    tree.addNode(2, 5);
    tree.setLeafs([2]);

    const compactObject = tree.toObj();
    const restoredTree = Tree.fromObj(compactObject);

    expect(restoredTree.findNode(1)?.id).toBe(1);
    expect(restoredTree.findNode(2)?.id).toBe(2);
    expect(restoredTree.findNode(3)?.id).toBe(3);
    expect(restoredTree.findNode(4)?.id).toBe(4);
    expect(restoredTree.findNode(5)?.id).toBe(5);
    expect(() => {
      restoredTree.addNode(2, 6);
    }).not.toThrowError('Cannot add a child to a leaf-only node with id: 2');
  });
});
