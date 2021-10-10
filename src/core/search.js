// TODO: Refactor with wasm

const deepCloneArray = (origin) => {
    return JSON.parse(JSON.stringify(origin));
}

const compareArray = (a, b) => {
    if (a.length !== b.length) {
        throw new Error('Compare error! Array length is not the same!');
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

const hitStone = (no, st, effect, totalStateNum) => {
    const s = deepCloneArray(st);
    for (let i = 0; i < effect[no].length; i++) {
        s[effect[no][i]] = (s[effect[no][i]] + 1) % totalStateNum;
    }

    return s;
}

let paths = [];

const doSearch = (st, target, hitNo, path, maxHitTimes, effect, totalStateNum) => {
    if (path.length > maxHitTimes) {
        return;
    }

    let s
    if (hitNo >= 0) {
        s = hitStone(hitNo, st, effect, totalStateNum);
        if (compareArray(s, target)) {
            paths.push(path);
            return;
        }
    }

    for (let i = 0; i < st.length; i++) {
        doSearch(
            s ?? st,
            target,
            i,
            path + i.toString(),
            maxHitTimes,
            effect,
            totalStateNum
        );
    }
}

const search = (initState, targetState, effects) => {
    if (compareArray(initState, targetState)) {
        return '';
    }

    let maxHitTimes = 5;
    const totalStateNum = 4;
    paths = [];
    while (paths.length === 0) {
        doSearch(
            initState,
            targetState,
            -1,
            '',
            maxHitTimes,
            effects,
            totalStateNum
        );
        maxHitTimes += 5;
    }

    let shortest = '9'.repeat(256);
    
    for (const path of paths) {
        if (path.length < shortest.length) {
            shortest = path;
        }
    }

    return shortest;
}

export default search;
