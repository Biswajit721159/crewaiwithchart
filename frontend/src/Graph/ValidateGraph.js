
function solve0(data) {
    if (typeof (data[0]) === "object") {
        let count = 0;
        for (let key in data[0]) {
            count++;
            if (key === "Your query") {
                if (data[0][key]) {
                    continue
                } else {
                    return false
                }
            } else { return false }
        }
        if (count === 1) return true;
        else return false;
    }
    else {
        return false;
    }
}

function solve1(data) {
    if (typeof (data[1]) === "object") {
        let count = 0;
        for (let key in data[1]) {
            count++;
            if (key === "Normal") {
                if (Array.isArray(data[1][key]) === true) {
                    continue
                } else {
                    return false
                }
            }
            else { return false }
        }
        if (count === 1) return true;
        else return false;
    } else {
        return false
    }
}

function solve2(data) {
    if (typeof (data[2]) === "object") {
        if (data[2]?.graphType && data[2].subchartName) {
            return true;
        } else {
            return false
        }
    }
    else {
        return false;
    }
}

function solve3(data) {
    if (typeof (data[3]) === "string" && data[3]?.length) {
        return true
    } else {
        return false
    }
}

function solve4(data) {
    if (Array.isArray(data[4]) === true) return true
    else return false
}

function solve5(data) {
    if (typeof (data[5]) === "string" && data[5]?.length) {
        return true;
    }
    else {
        return false
    }
}

function solve6(data) {
    if (typeof (data[6]) === "object") {
        let length = data[4]?.length
        for (let key in data[6]) {
            if (Array.isArray(data[6][key])) {
                let nowLen = data[6][key]?.length;
                if (length >= nowLen) {
                    continue
                } else {
                    return false
                }
            } else {
                return false;
            }
        }
        return true
    } else {
        return false
    }
}

function solveForString(data) {
    if (data) {
        for (let key in data[6]) {
            for (let i = 0; i < data[6][key]?.length; i++) {
                let str = data[6][key][i]
                if (str && typeof (str) !== "string") {
                    str = str.toString();
                }
                str = str.replace(/,/g, '');
                const num = parseFloat(str);
                if (!isNaN(num)) {
                    continue;
                } else {
                    return false;
                }
            }
        }
        return true
    } else {
        return false
    }
}


function FinalSolve(data) {
    if (typeof (data) === "object" && Object.keys(data).length === 7) {
        let x = solve6(data)
        return solve0(data) && solve1(data) && solve2(data) && solve3(data) && solve4(data) && solve5(data) && solve6(data) && solveForString(data)
    }
    else {
        return false
    }
}


export const ValidateGraph = (data) => {
    try {
        // return (Object.keys(data).length === 7 && typeof (data[0]) === "object" && data[0]['Your query']?.length && typeof (data[1]) === "object"
        //     && typeof (data[1]) === "object" && typeof (data[2]) === "object" && data[3].length !== 0
        //     && data[4].length !== 0 && data[5].length !== 0 && typeof (data[6]) === "object" && Object.keys(data[6]).length)
        return FinalSolve(data)
    } catch {
        return false
    }
}

export const checkData = (str) => {
    if (str && typeof (str) !== "string") {
        str = str.toString();
    }
    str = str.replace(/,/g, '');
    const num = parseFloat(str);
    if (!isNaN(num)) {
        return num;
    } else {
        return 0;
    }
}
