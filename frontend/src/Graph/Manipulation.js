import { checkData } from "./ValidateGraph";

export const solveData = (data) => {
    let arr = []
    if (data) {
        for (let key in data[6]) {
            let nums = []
            for (let i = 0; i < data[6][key]?.length; i++) {
                let num = checkData(data[6][key][i])
                nums.push(num);
            }
            let obj = {
                name: key,
                data: nums
            }
            arr.push(obj)
        }
        return arr
    }
    else {
        return []
    }
}