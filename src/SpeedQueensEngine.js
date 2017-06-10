  var permutationsArray = [];
  var solutionsArray = [];

function speedQueens(n) {
  solutionsArray = [];
  let timeStart = new Date();
  speedPermTestEngine(n);
  let timeEnd = new Date();
  let elapsedTime = ((timeEnd - timeStart)/1000);
  
//  var outputString = 'The number of nQueens solutions for a board of size ' + n + ' is ' + solutionsArray.length + '.\nThis computation took ' + elapsedTime + ' seconds. \nTo see all solution boards, enter \'showBoards(solutionsArray)\'';
//  console.log(outputString);
  return 'The number of nQueens solutions for a board of size ' + n + ' is ' + solutionsArray.length + '.\nThis computation took ' + elapsedTime + ' seconds. \nTo see all solution boards, enter \'showBoards(solutionsArray)\'';
}

function nQueens(n) {

  solutionsArray = [];
  timeStart = new Date();
  permTestEngine(n);
  timeEnd = new Date();

  console.log('The number of nQueens solutions for a board of size ', n, ' is ', solutionsArray.length);
  console.log('This computation took ', ((timeEnd - timeStart)/1000), 'seconds.');
  console.log('To see all solution boards, enter \'showBoards(solutionsArray)\'');
}

//=============================================================================//
//========================  MAIN TESTING ENGINE: FAST  ========================//
//=============================================================================//

var speedPermTestEngine = function (n, inputArray) {  // COMPLEXITY = O(n! * (n^2 + n) )
  
  if (n < 1) { return 'Input value must be positive.'; };
  
  if(inputArray){
    array = inputArray.slice();
    } else {
      array = starterArrayGen(n);
    };

  if (n === 1) {
    //  IF TEST FUNCTION RETURNS TRUE
    if(nQueensTestIndexee(array)) {
    
      // PUSH TO SOLUTIONS ARRAY
      solutionsArray.push(array);
      
      // DISPLAY SOLUTION PERM, SOLUTION BOARD, AND A MESSAGE ANNOUNCING SOLUTION
      // REMOVED TO INCREASE SPEED
      // showBoard(array);
      // console.log('SOLUTION FOUND: ', array);
    }
  
  } else {
    for (var i = 1; i <= n; i += 1) {
      speedPermTestEngine((n - 1), array);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  }
};

//=============================================================================//
//=======================  MAIN TESTING ENGINE: VERBOSE  ======================//
//=============================================================================//

var permTestEngine = function (n, inputArray) {  // COMPLEXITY = O(n! * (n^2 + n) )
  
  if (n < 1) { return 'Input value must be positive.'; };
  
  if(inputArray){
    array = inputArray.slice();
    } else {
      array = starterArrayGen(n);
    };

  if (n === 1) {
    //  IF TEST FUNCTION RETURNS TRUE
    if(nQueensTestIndexee(array)) {
    
      // PUSH TO SOLUTIONS ARRAY
      solutionsArray.push(array);
      
      // DISPLAY SOLUTION PERM, SOLUTION BOARD, AND A MESSAGE ANNOUNCING SOLUTION
      showBoard(array);
      console.log('SOLUTION FOUND: ', array);
    }
  
  } else {
    for (var i = 1; i <= n; i += 1) {
      permTestEngine((n - 1), array);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(array, j - 1, n - 1); // -1 TO ACCOUNT FOR JAVASCRIPT ZERO-INDEXING
    }
  }
};

//=============================================================================//
//================  FUNCTION TO GENERATE ARRAY OF PERMUTATIONS  ===============//
//=============================================================================//
  
var permGenArray = function (n, inputArray) {
  
  if (n < 1) { return 'Input value must be positive.'; };
  
  if(inputArray){
    array = inputArray.slice();
    } else {
      array = starterArrayGen(n);
    };

  if (n === 1) {
    permutationsArray.push(array);
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
  var outputArray = [];
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
    outputArray.push(row);
  }

  return outputArray;
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
