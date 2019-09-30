function getCombinations(array, length) {

    if (length > array.length) {
      length = array.length;
    }

    function fork(i, t) {                   // recursive fn with index & temp array
        if (t.length === length) {          // check temp length
            result.push(t);                 // push collected values
            return;                         // exit function
        }
        if (i === array.length) {           // check if index is out of range
            return;                         // exit function
        }
        fork(i + 1, t.concat([array[i]]));  // call for with a new letter from index
        fork(i + 1, t);                     // call for without a new letter
    }

    var result = [];                        // for keeping the part results
    fork(0, []);                            // start with index zero and empty temp array
    return result;                          // return result
}