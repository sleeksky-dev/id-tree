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

## Contributing

Contributions are welcome! Please submit a pull request or create an issue on the project's GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you need assistance or have any questions, please create an issue on the project's GitHub repository.

## Attribution

This library - the code, test cases, and this documentation - were all written by ChatGPT. Atleast the v1.
