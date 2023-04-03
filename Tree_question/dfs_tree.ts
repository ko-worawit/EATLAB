interface TreeNode {
    [key: number]: number[];
}

abstract class TreeTraversal {
    abstract traverse(node: TreeNode, index: number): number[];
}

class PreOrderTraversal extends TreeTraversal {
    traverse(node: TreeNode, index: number): number[]{
        const result = [index];
        for  (const child of node[index]) {
            result.push(...this.traverse(node, child));
        }
        return result;
    }
}

class PostOrderTraversal extends TreeTraversal {
    traverse(node: TreeNode, index: number): number[] {
        const result: number[] = [];
        for (const child of node[index]) {
            result.push(...this.traverse(node, child));
        }
        result.push(index);
        return result;
    }
}

class InOrderTraversal extends TreeTraversal {
    traverse(node: TreeNode, index: number): number[] {
        const result: number[] = [];
        if(node[index].length > 0){
            const left = this.traverse(node, node[index][0]);
            result.push(...left);
        }
        result.push(index);
        if(node[index].length > 1){
            const right = this.traverse(node, node[index][1]);
            result.push(...right);
        }
        return result;
    }
}

class TreeTraversalFactory {
    static getTraversalOrder(traverseType: string): TreeTraversal {
        switch (traverseType) {
            case 'preorder':
                return new PreOrderTraversal();
            case 'postorder':
                return new PostOrderTraversal();
            case 'inorder':
                return new InOrderTraversal();
            default:
                throw new Error('Unknow Traverst type.')
        }
    }
}

const treeNode: TreeNode = {
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: [6, 7],
    6: [],
    7: [8],
    8: []
}


const preOrder = 'preorder';
const preOrderTraverse = TreeTraversalFactory.getTraversalOrder(preOrder);
const preOrderResult = preOrderTraverse.traverse(treeNode, 1);
console.log(preOrder);
console.log(preOrderResult);

const postOrder = 'postorder';
const postOrderTraverse = TreeTraversalFactory.getTraversalOrder(postOrder);
const postOrderResult = postOrderTraverse.traverse(treeNode, 1);
console.log(postOrder);
console.log(postOrderResult);

const inOrder = 'inorder';
const inOrderTraverse = TreeTraversalFactory.getTraversalOrder(inOrder);
const inOrderResult = inOrderTraverse.traverse(treeNode, 1);
console.log(inOrder);
console.log(inOrderResult);