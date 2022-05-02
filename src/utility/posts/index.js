function isPrimitive(value) {
    return typeof value !== 'object' || value === null;
}

export const deepClone = (obj) => {
    if (isPrimitive(obj)) {
        return obj;
    }

    const clone = Array.isArray(obj) ? [] : {};

    for (let key of Object.keys(obj)) {
        const value = obj[key];
        clone[key] = isPrimitive(value) ? value : deepClone(value);
    }

    return clone;

}

