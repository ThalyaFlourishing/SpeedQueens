var permutationsArray = [];
var solutionsArray = [];
var COUNT = 1;

var permTestEngine = function (n, inputArray) {  // COMPLEXITY = O(n! * (n^2 + n) )
  
  if (n < 1) { return 'Input value must be positive.'; };
  
  if(inputArray){
    array = inputArray.slice();
    } else {
      array = starterArrayGen(n);
    };

  if (n === 1) {
//    permutationsArray.push(array);
    console.log('CALL TO TEST FUNCTION ', COUNT++);
    //  IF TEST FUNCTION RETURNS TRUE
      // PUSH TO SOLUTIONS ARRAY
    // DISPLAY SOLUTION PERM, SOLUTION BOARD, AND A MESSAGE ANNOUNCING SOLUTION
  } else {
    for (var i = 1; i <= n; i += 1) {
      permGenArray((n - 1), array);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  }
  return 'The number of nQueens solutions for a board of size ', n, ' is ', solutionsArray.length;
};

var permGenArray = function (n, inputArray) {
  
  if (n < 1) { return 'Input value must be positive.'; };
  
  if(inputArray){
    array = inputArray.slice();
    } else {
      array = starterArrayGen(n);
    };

  if (n === 1) {
    permutationsArray.push(array);
//    console.log('CALL TO TEST FUNCTION ', COUNT++);
  } else {
    for (var i = 1; i <= n; i += 1) {
      permGenArray((n - 1), array);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  }
};

// --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  //
  // ACQUIRED SWAPPING HELPER FUNCTION
var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

//=============================================================================//
//=================  STARTER-ARRAY-GENERATOR HELPER FUNCTION  =================//
//=============================================================================//
  
var starterArrayGen = function(n) {
  
  var outputArray = [];
  for(let i = 1; i <= n; i++) {
      outputArray.push(i);
    }
  return outputArray;
  };

//=============================================================================//
//==========================  NUMERIC MATRIX MAKER  ===========================//
//=============================================================================//

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

//=============================================================================//
//=========================  CHARACTER MATRIX MAKER  ==========================//
//=============================================================================//

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
        row.push('__');   // white chess queen  ? U+2655  &#9813;    String.fromCodePoint(9813)
      }
    }
    output.push(row);
  }

  return output;
};

//=============================================================================//
//========  FUNCTION TO DISPLAY A SINGLE PERMUTATION AS A CHESS BOARD  ========//
//=============================================================================//

var displayPermutationMatrix = function(matrix) {

  var outputString = '';

  for(var i = 0; i < matrix.length; i++) {
    outputString += ('|' + matrix[i].join('|') + '|\n');
    }
  
  return outputString + '\n';
}


//=============================================================================//
//====  FUNCTION TO SEQUENTIALLY DISPLAY ALL PERMUTATIONS AS CHESS BOARDS  ====//
//=============================================================================//

// --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  //
  // LAUNCHER FUNCTION FOR SHOWBOARDS
var permAnimate = function(n) {
  
  permGenArray(n);
  showBoards(permutationsArray);
  
}

var showBoards = function(permutationList) {
  let i = 0;
    window.setInterval(function() {
      if(permutationList[i]) {
        showBoard(permutationList[i]);
        i++;
      };
    }, 40);
}
// --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  //
  // INNER FUNCTION FOR SHOWBOARDS
var showBoard = function(permutation) {
  return console.log(displayPermutationMatrix(translatePermutationToCharacterMatrix(permutation)));
}

//=============================================================================//
//================ FUNCTION TO CALCULATE RATIO OF n-ROOKS =====================//
//================ SOLUTIONS TO TOTAL POSSIBLE ARRANGEMENTS ===================//
//=============================================================================//

var analysis = function(n) {
  var nRooksSolutions = factorial(n);
  var totalCombinations = factorial(n**2) / (factorial(n)*factorial(n**2 - n));
  
  return 'There are ' + nRooksSolutions + ' nRooks solutions and ' + totalCombinations + ' total possible arrangements.\n The total number of possible arrangements is ' + (totalCombinations/nRooksSolutions).toFixed(2) + ' times larger than the nRooks set.'
};

// --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  //
  // FACTORIAL HELPER FUNCTION FOR 'ANALYSIS' FUNCTION
var factorial = function(n) {

  if (n  <  0) { return 'NO NEGATIVE NUMBERS, PLEASE...'; }
  if (n === 0 || n === 1) { return 1; }

  n = n * factorial(n - 1);
    return n;
};




/*

 . # OF POSSIBLE ARRANGEMENTS OF k ELEMENTS OUT OF n :
   n! / k!(n-k)!
   . For nQueens(8), this means that n = 64 and k = 8
   . So, for nQueens, the formula is:
   n^2! / n!(n^2 - n)!

*/
