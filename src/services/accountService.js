

/*
* given account lists, 
* return the tree structure       
*/
export function getTreeStructure(accounts, cleanings) {
    if(accounts.length === 0) {
        return [];
    }

    var cleaningsMap = {}; // id: {totalTime,totalArea, total,cleaningArr}

    // put cleanings to the map according to its id
    cleanings.map(cleaning => {
        if(cleaningsMap[cleaning.account] === null || cleaningsMap[cleaning.account] === undefined) {
            cleaningsMap[cleaning.account] = {
                totalNum: 0,
                totalArea: 0,
                totalTime: 0,
                cleanings:[]
            };
        }
        // recording statistical info
        cleaningsMap[cleaning.account].cleanings.push(cleaning);
        cleaningsMap[cleaning.account].totalNum ++;
        cleaningsMap[cleaning.account].totalArea += cleaning.area;
        cleaningsMap[cleaning.account].totalTime += cleaning.time;
    });

    // generate the tree structure 
    var res_list = [];
    accounts.map(account => {
        const cleaning = getCleaningFromMap(cleaningsMap,account.id);
        if(account.parent === null) {
            res_list.push(
                getSubTree(accounts, {
                    id: account.id,
                    title: account.name,
                    parent: account.parent,
                    children: [],
                    cleanings: cleaningsMap[account.id],
                    statistics: {
                        totalNum : cleaning.totalNum,
                        totalArea : cleaning.totalArea,
                        totalTime : cleaning.totalTime,
                    }
                }, cleaningsMap)
            );
        }
    });


    return res_list;


}

var getSubTree = (accounts, curNode, cleaningsMap) => {
    accounts.map(account => {
        if(account.parent === curNode.id) {
            const cleaning = getCleaningFromMap(cleaningsMap,account.id);
            curNode.children.push(getSubTree(
                accounts, {
                    id: account.id,
                    title: account.name,
                    parent: account.parent,
                    children: [],
                    cleanings: cleaningsMap[account.id],
                    statistics: {
                        totalNum : cleaning.totalNum,
                        totalArea : cleaning.totalArea,
                        totalTime : cleaning.totalTime,
                    }
                },
                cleaningsMap
            ));
        }
    });

    return curNode;
}

/*
* encapsulate this function just In case of the id is not existed in the map.
*/
var getCleaningFromMap = (cleaningsMap, id) => {
    var cleaning = cleaningsMap[id];
    if(cleaning === null || cleaning === undefined) {
        cleaning = {
            totalNum: 0,
            totalArea: 0,
            totalTime: 0,
            cleanings:[]
        };
    }

    return cleaning;
}