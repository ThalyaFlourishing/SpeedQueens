

var permGenArray = function(n) {

  permutationsArray = []; // THIS IS ALL n! PERMUTATIONS,
                         // EACH REPRESENTED AS AN ARRAY OF INTEGERS

  if (n  <  0) { return 'Input value must be positive.'; };
  if (n === 0) { return []; };
  if (n === 1) { return [1];};

  // INNER LOOP HERE?
  var innerLoop = function(n) {

    if (n === 0) {
      return; // outputArray;
    }

    for (var i = 1; i <= n; i++) {
      permutationsArray.push(innerLoop(n - 1));
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  } // INNER LOOP END HERE

  return permutationsArray;
};


  // SWAPPING HELPER FUNCTION
Array.prototype.swap = function(i, j) {
  var newArray = this.slice();
  var temp = newArray[i];
  newArray[i] = newArray[j];
  newArray[j] = temp;
  return newArray;
};


  // THIS TRANSLATES EACH PERMUTATION ARRAY INTO A MATRIX
  // TO FEED TO THE HR TESTERS WHICH EXPECT ONE
window.translatePermutationToBoard = function(permutation) {
  var output = [];
  var row;
  for (let i = 0; i < permutation.length; i++) {
    row = [];
    for (let j = 0; j < permutation.length; j++) {
      if (permutation[i] === j) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    output.push(row);
  }

  return output;
};









/*

window.makePermutations = function(permutation) {

  var permutations = []; // array of arrays
  var newArray, arraySegments;

  if (permutation.length > 1) {

    for (var i = permutation.length - 1; i >= 0; i--) {
      newArray = permutation.swap(i, permutation.length - 1);
      arraySegments = window.makePermutations(newArray.slice(0, -1));
      arraySegments.forEach(function (array) {
        array.push(newArray[newArray.length - 1]);
        permutations.push(array); // yield
      });
    }
    return permutations;
  } else {
    return [permutation];
  }
};


*/