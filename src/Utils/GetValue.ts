export function getValue(obj, path) {
    if (!obj) return undefined; // Return early if obj is falsy

    var pathArray = path.split('.'); // Use a different variable for the split path
    for (var i = 0, len = pathArray.length; i < len; i++) {
        if (!obj) return undefined; // Check if obj is falsy at each step
        obj = obj[pathArray[i]]; // Dive one level deeper
    }
    return obj; // Return the final value
}