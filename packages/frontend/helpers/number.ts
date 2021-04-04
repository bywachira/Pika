export function singleDecimal(value: number) {
    let rounded = Math.round(value * 100) / 100

    return rounded;
}

export function scaleUpdate(name: string, initialValue: number, value: number): {
    name: string;
    value: number;
} {
    if (name === "width") {
        return {
            name: "scaleX",
            value: value / initialValue
        }
    } else if (name === "height") {
        return {
            name: "scaleY",
            value: value / initialValue
        }
    } else {
        return {
            name: "",
            value: 0
        }
    }
}