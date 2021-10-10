import search from './search';

const totalStateNum = 4;

const deepCloneArray = (origin) => {
    return JSON.parse(JSON.stringify(origin));
}

const getRandomInt = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const applyWithSideEffect = (before, effects, hitNo) => {
    const result = deepCloneArray(before);
    const effect = effects[hitNo];
    for (let i = 0; i < effect.length; i++) {
        result[effect[i]] = (result[effect[i]] + 1) % totalStateNum;
    }
    return result;
}

test('search result is appliable and minimum', () => {
    for (let i = 0; i < 100; i++) {
        const length = getRandomInt(10, 2);
        const steps = getRandomInt(5, 1);
        
        const initState = Array(length).fill(-1).map(() => getRandomInt(3));
        const effects = Array(length).fill([]).map(() => {
            const rdm = getRandomInt(length, 1);
            const result = [];
            while (result.length < rdm) {
                const r = getRandomInt(length);
                if (result.indexOf(r) === -1) {
                    result.push(r);
                }
            }
            return result;
        });
    
        let targetState = deepCloneArray(initState);
        let generatePath = '';
        for (let i = 0; i < steps; i++) {
            const hitNo = getRandomInt(length);
            generatePath += hitNo;
            targetState = applyWithSideEffect(
                targetState,
                effects,
                hitNo
            );
        }
    
        const path = search(initState, targetState, effects);
    
        let validateState = deepCloneArray(initState);
        for (const c of path) {
            const hitNo = parseInt(c);
            validateState = applyWithSideEffect(
                validateState,
                effects,
                hitNo
            );
        }
    
        try {
            expect(validateState).toEqual(targetState);
            expect(path.length).toBeLessThanOrEqual(steps);
        } catch (e) {
            console.log("Failing data:");
            console.log("  Init State:");
            console.log(initState);
            console.log("  Target:");
            console.log(targetState);
            console.log("  Validate Target:");
            console.log(validateState);
            console.log("  Effect:");
            console.log(effects);
            console.log("  Generate Path:");
            console.log(generatePath);
            console.log("  Search Path:");
            console.log(path);
            throw e;
        }
    }
});