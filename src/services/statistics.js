// get sum of treenodes recursively
export function sumNode(accountNode) {
    var res = {
        totalNum: accountNode.statistics.totalNum,
        totalTime: accountNode.statistics.totalTime,
        totalArea: accountNode.statistics.totalArea
    };

    accountNode.children.map(
        account => {
            let resChild = sumNode(account);
            res.totalNum += resChild.totalNum;
            res.totalTime += resChild.totalTime;
            res.totalArea += resChild.totalArea;
        }
    )

    return res;
}

// get sum of all nodes in a tree
export function sumTree(accountNode) {
    accountNode.statistics = sumNode(accountNode);
    accountNode.children.map(
        account => {
            account.statistics = sumNode(account);
        }
    );
}