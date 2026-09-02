// ESM — add, subtract, multiply, divide functions export karo


export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error("Denominator cannot be zero");
    }
    return a / b;
}
