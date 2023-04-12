# id-tree

`id-tree` is a lightweight TypeScript library for managing tree data structures where nodes contain only a unique numerical identifier (ID). The library provides an easy-to-use API to create, modify, and traverse tree structures, as well as methods for serializing and deserializing trees in compact formats.

## Features

- Create and manage tree structures with ease
- Add and remove nodes using unique IDs
- Find and move nodes within the tree
- Serialize and deserialize tree structures in compact array and object formats
- Set and manage leaf-only nodes
- Compatible with TypeScript and JavaScript projects

## Installation

To install the `id-tree` library, run the following command:

```bash
npm install id-tree
```

## Usage

### Importing the library

Import the Tree class from the id-tree package:

```typescript
import { Tree } from 'id-tree';
```

## Creating a tree

Create a new instance of the Tree class:

```typescript
const tree = new Tree();
```

## Setting the root node
To set the root node of the tree, use the setRoot method:

```typescript
const rootNode = tree.setRoot(1);
```

## Adding nodes to the tree
To add a new node to the tree, use the addNode method:

```typescript
const newNode = tree.addNode(parentId, nodeId);
```

## Finding nodes in the tree
To find a node with a specific ID, use the findNode method:

```typescript
const node = tree.findNode(nodeId);
```

## Moving nodes within the tree
To move a node (and its subtree) to a new parent at a specified index, use the move method:

```typescript
tree.move(nodeId, newParentId, index);
```

## Setting leaf-only nodes
To set leaf-only nodes that cannot have children, use the setLeafs method:

```typescript
tree.setLeafs([leafId1, leafId2, ...]);
```

## Serializing the tree

To serialize the tree in a compact array format, use the toArray method:

```typescript
const compactArray = tree.toArray();
```

To serialize the tree in a compact object format, use the toObj method:

```typescript
const compactObj = tree.toObj();
```

## Deserializing the tree

To deserialize a tree from a compact array format, use the fromArray method:

```typescript
const restoredTree = Tree.fromArray(compactArray);
```

To deserialize a tree from a compact object format, use the fromObj method:

```typescript
const restoredTree = Tree.fromObj(compactObj);
```

To deserialize a tree from a map of nodes, use the fromMap method:

```typescript
let rootId = 100;
let pairs = [[100, 1], [1, 2]]
const tree = Tree.fromMap([rootId, pairs]);
```
## Contributing

Contributions are welcome! Please submit a pull request or create an issue on the project's GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you need assistance or have any questions, please create an issue on the project's GitHub repository.

## Attribution

This library - the code, test cases, and this documentation - were all written by ChatGPT. Atleast the v1.

## ChatGPT Prompts

I used the following prompts to build this library (the main ones) - 

> can you write an ordered tree implementation in typescript where the only data contained in each node is the "id" of type number?

> For the above implementation, how to restore a tree from a JSON?

> Now in the above implementation, include the following methods - 
> 1. setLeafs - here you pass and array of id's that cannot have children, this is leaf only nodes
> 2. fixTree - if the tree has any node with id in the leaf only array, it should move all children to the parent
> Add validation in addNode to throw error if it is being added to a lead only node

> I need couple of methods to store this tree and restore this tree - 
> - toCompact - this provides a compact representation of this tree to store in database
> - fromCompact - this recreates the tree from a compact data representation

> include following method - 
> move(node_id, parent_id, index) - this method moves the entire sub tree of node with id node_id to the node with id=parent_id at the index position of its children. If index is undefined, add as last child.

> Combine all the functionality mentioned above and write out the complete code

> Following is the complete code of what you implemented above, please write a comprehensive set of test cases using the jest library 

> continue writing the missing test cases

> The test case "Compact array representation with leaf-only nodes" is failing because the leafs are not being stored when compacted. Can you find the problem in my code?

> Can you fix the same issue with this test case - 'Compact object representation with leaf-only nodes'

> seems I don't need to store the leafs when i compact. can you write the toArray, fromArray, toObj and fromObj so it does not store that

> if i want to publish this tree implementation as an npm package, list few good names for it

> I am going to call this `id-tree`. Write me a README.md documentation for this library
