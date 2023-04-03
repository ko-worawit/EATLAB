var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TreeTraversal = /** @class */ (function () {
    function TreeTraversal() {
    }
    return TreeTraversal;
}());
var PreOrderTraversal = /** @class */ (function (_super) {
    __extends(PreOrderTraversal, _super);
    function PreOrderTraversal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreOrderTraversal.prototype.traverse = function (node, index) {
        var result = [index];
        for (var _i = 0, _a = node[index]; _i < _a.length; _i++) {
            var child = _a[_i];
            result.push.apply(result, this.traverse(node, child));
        }
        return result;
    };
    return PreOrderTraversal;
}(TreeTraversal));
var PostOrderTraversal = /** @class */ (function (_super) {
    __extends(PostOrderTraversal, _super);
    function PostOrderTraversal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostOrderTraversal.prototype.traverse = function (node, index) {
        var result = [];
        for (var _i = 0, _a = node[index]; _i < _a.length; _i++) {
            var child = _a[_i];
            result.push.apply(result, this.traverse(node, child));
        }
        result.push(index);
        return result;
    };
    return PostOrderTraversal;
}(TreeTraversal));
var InOrderTraversal = /** @class */ (function (_super) {
    __extends(InOrderTraversal, _super);
    function InOrderTraversal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InOrderTraversal.prototype.traverse = function (node, index) {
        var result = [];
        if (node[index].length > 0) {
            var left = this.traverse(node, node[index][0]);
            result.push.apply(result, left);
        }
        result.push(index);
        if (node[index].length > 1) {
            var right = this.traverse(node, node[index][1]);
            result.push.apply(result, right);
        }
        return result;
    };
    return InOrderTraversal;
}(TreeTraversal));
var TreeTraversalFactory = /** @class */ (function () {
    function TreeTraversalFactory() {
    }
    TreeTraversalFactory.getTraversalOrder = function (traverseType) {
        switch (traverseType) {
            case 'preorder':
                return new PreOrderTraversal();
            case 'postorder':
                return new PostOrderTraversal();
            case 'inorder':
                return new InOrderTraversal();
            default:
                throw new Error('Unknow Traverst type.');
        }
    };
    return TreeTraversalFactory;
}());
var treeNode = {
    1: [2, 3],
    2: [4, 5],
    3: [],
    4: [],
    5: [6, 7],
    6: [],
    7: [8],
    8: []
};
var preOrder = 'preorder';
var preOrderTraverse = TreeTraversalFactory.getTraversalOrder(preOrder);
var preOrderResult = preOrderTraverse.traverse(treeNode, 1);
console.log(preOrder);
console.log(preOrderResult);
var postOrder = 'postorder';
var postOrderTraverse = TreeTraversalFactory.getTraversalOrder(postOrder);
var postOrderResult = postOrderTraverse.traverse(treeNode, 1);
console.log(postOrder);
console.log(postOrderResult);
var inOrder = 'inorder';
var inOrderTraverse = TreeTraversalFactory.getTraversalOrder(inOrder);
var inOrderResult = inOrderTraverse.traverse(treeNode, 1);
console.log(inOrder);
console.log(inOrderResult);
