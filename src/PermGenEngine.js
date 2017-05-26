
// THIS ONE CALLS THE n-QUEENS-SOLUTION SEARCH ON EACH PERM

var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

var permGenEngine = function (array, output, n) {
  n = n || array.length; // SET N DEFAULT TO ARRAY.LENGTH
  if (n === 1) {
    output(array);
  } else {
    for (var i = 1; i <= n; i += 1) {
      permGenEngine(array, output, n - 1);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  }
};


// For testing:
var display = function(input){
  console.log(input);
}

// permGenEngine(['a', 'b', 'c', 'd'], display);