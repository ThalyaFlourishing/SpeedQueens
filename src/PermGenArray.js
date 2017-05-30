
var permutationsArray = [];

var permGenArray = function (inputArray, output, n) {
  array = inputArray.slice();
  n = n || array.length; // SET N DEFAULT TO ARRAY.LENGTH
  if (n === 1) {
    permutationsArray.push(array);
  } else {
    for (var i = 1; i <= n; i += 1) {
      permGenArray(array, output, n - 1);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  }
};




var permGenArrayMine = function(n) {
// debugger;
  permutationsArray = []; // THIS IS ALL n! PERMUTATIONS, EACH REPRESENTED AS AN ARRAY OF INTEGERS
  starterArray = starterArrayGen(n);

  if (n  <  0) { return 'Input value must be positive.'; };
  if (n === 0) { return []; };
  if (n === 1) { return [[1]];};

  // INNER LOOP
  var innerLoop = function(permutationsArray, n) {

    if (n === 1) {
      return []; // outputArray;
    }

    for (var i = 1; i <= n; i++) {
      permutationsArray.push(innerLoop(permutationsArray, n - 1));
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      permutationsArray.swap(j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  } // INNER LOOP END HERE

  innerLoop(permutationsArray, n);
  return permutationsArray;
};

  // ACQUIRED SWAPPING HELPER FUNCTION
var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

  // CONNER'S SWAPPING HELPER FUNCTION
Array.prototype.swap = function(i, j) {
  var newArray = this.slice();
  var temp = newArray[i];
  newArray[i] = newArray[j];
  newArray[j] = temp;
  return newArray;
};


  // STARTER-ARRAY GENERATOR HELPER FUNCTION
var starterArrayGen = function(n) {
  
  var outputArray = [];
  for(let i = 1; i <= n; i++) {
      outputArray.push(i);
    }
  return outputArray;
  };


var translatePermutationToNumericMatrix = function(permutation) {
  var output = [];
  var row;
  for (let i = 0; i < permutation.length; i++) {
    row = [];
    for (let j = 1; j <= permutation.length; j++) {
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
    for (let j = 1; j <= permutation.length; j++) {
      if (permutation[i] === j) {
        row.push(queen);  //                       HTML  CODEPOINT
      } else {            // black chess queen  ? U+265B  &#9819;    String.fromCodePoint(9819)
        row.push('__');    // white chess queen  ? U+2655  &#9813;    String.fromCodePoint(9813)
      }
    }
    output.push(row);
  }

  return output;
};


/*

 . # OF POSSIBLE ARRANGEMENTS OF k ELEMENTS OUT OF n :
   n! / k!(n-k)!
   . For nQueens(8), this means that n = 64 and k = 8
   . So, for nQueens, the formula is:
   n^2! / n!(n^2 - n)!

*/

var analysis = function(n) {
  var nRooksSolutions = factorial(n);
  var totalCombinations = factorial(n**2) / (factorial(n)*factorial(n**2 - n));
  
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
