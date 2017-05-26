

var permGenArray = function(n) {

  permutationsArray = []; // THIS IS ALL n! PERMUTATIONS,
                          // EACH REPRESENTED AS AN ARRAY OF INTEGERS

  if (n  <  0) { return 'Input value must be positive.'; };
  if (n === 0) { return []; };
  if (n === 1) { return [[1]];};

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


var translatePermutationToNumericMatrix = function(permutation) {
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


var translatePermutationToCharacterMatrix = function(permutation) {
  var output = [];
  var row;
  var queen = String.fromCodePoint(9819);

  for (let i = 0; i < permutation.length; i++) {
    row = [];
    for (let j = 0; j < permutation.length; j++) {
      if (permutation[i] === j) {
        row.push(queen);  //                       HTML  CODEPOINT
      } else {            // black chess queen  ? U+265B  &#9819;    String.fromCodePoint(9819)
        row.push('  ');    // white chess queen  ? U+2655  &#9813;    String.fromCodePoint(9813)
      }
    }
    output.push(row);
  }

  return output;
};


var displayPermutationMatrix = function(matrix) {

  for(var i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join('|'));
    }

}


/*

 . # OF POSSIBLE ARRANGEMENTS OF k ELEMENTS OUT OF n :
   n! / k!(n-k)!
   . For nQueens(8), this means that n = 64 and k = 8

*/

var analysis = function(k) {
  var nRooksSolutions = factorial(k);
  var totalCombinations = factorial(k**2) / (factorial(k)*factorial(k**2 - k));
  
  return 'There are ' + nRooksSolutions + ' nRooks solutions and ' + totalCombinations + ' total possible arrangements.\n The total number of possible arrangements is ' + (totalCombinations/nRooksSolutions).toFixed(2) + ' times larger than the nRooks set.'
}

var factorial = function(n) {

  if (n  <  0) { return 'NO NEGATIVE NUMBERS, PLEASE...'; }
  if (n === 0 || n === 1) { return 1; }

  n = n * factorial(n - 1);
    return n;
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
