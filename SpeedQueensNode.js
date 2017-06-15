  var permutationsArray = [];
  var solutionsArray = [];

function speedQueens(n) {
  solutionsArray = [];
  let timeStart = new Date();
  speedPermTestEngine(n);
  let timeEnd = new Date();
  let elapsedTime = ((timeEnd - timeStart)/1000);
  
  return 'The number of nQueens solutions for a board of size ' + n + ' is ' + solutionsArray.length + '.\n This computation took ' + elapsedTime + ' seconds. \n To see all solution boards, enter \'showBoards(solutionsArray)\'';
}

function nQueens(n) {

  solutionsArray = [];
  let timeStart = new Date();
  permTestEngine(n);
  let timeEnd = new Date();
  let elapsedTime = ((timeEnd - timeStart)/1000);

  return 'The number of nQueens solutions for a board of size ' + n + ' is ' + solutionsArray.length + '.\n This computation took ' + elapsedTime + ' seconds. \n To see all solution boards, enter \'showBoards(solutionsArray)\'';
}


//=============================================================================//
//== FOR COMPARISON: GENERATE A PERMUTTION ARRAY FIRST, THEN TEST THAT ARRAY ==//
//=============================================================================//

function arrayQueens(n) {

//  permutationsArray = [];
//  permGenArray(n);
  solutionsArray = [];
  let timeStart = new Date();
  let count = arrayTestEngine(permutationsArray);
  let timeEnd = new Date();
  let elapsedTime = ((timeEnd - timeStart)/1000);

  return 'The number of nQueens solutions for a board of size ' + n + ' is ' + count + '.\n This computation took ' + elapsedTime + ' seconds. \n To see all solution boards, enter \'showBoards(solutionsArray)\'';
}

function arrayTestEngine(inputArray) {
  
  let count = 0;
  let len = inputArray.length;
  
  for(let i = 0; i < len; i++) {
    if(nQueensTestIndexee(inputArray[i])) {
      // solutionsArray.push(array);
      count++;
    }
  }
  return count;
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
    if(nQueensTestIndexeeUniq(array)) {
    
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
function tester(solutionsArray) {
  for(let i = 0; i < solutionsArray.length; i++) {
    console.log(nQueensTestIndexeeUniq(solutionsArray[i]));    
    }  
  }


function nQueensTestIndexee(permArray) {
  var i = 0;
  var j = 0;
  n = permArray.length;
  return (new Set(permArray.map(function(e){
    i++;
    return e-i;
  })).size === n
  
  &&
  
  new Set(permArray.map(function(e){
  j++;
  return e-(n-j);
  })).size === n
  );

};


function nQueensTestIndexeeUniq(permArray) {
  var i = 0;
  var j = 0;
  n = permArray.length;
  return isUnique(permArray.map(function(e){
    i++;
    return e-i;
  }))
  
  &&
  
  isUnique(permArray.map(function(e){
  j++;
  return e-(n-j);
  }));

};


// DELCARE FUNCTION WITH A SINGLE PERM ARRAY AS INPUT
function nQueensTestPositional(permArray) {  // COMPLEXITY: O(n^2 + n)

  let n = permArray.length;
  let locationArray = [];

  // ITERATE OVER ARRAY TO GENERATE ARRAY OF LOCATION NUMBERS:  --  (SEPARATE FUNCTION?)
  for(let i = 0; i < n; i++) {
    // TEST FOR IMMEDIATE DIAG COLLISION: (PERFORM EFFICIENCY COMPARISON ON HAVING THIS VS. NOT)
    if(Math.abs(permArray[i] - permArray[i+1]) === 1) { return false;};

    // SET LOCATION TO (COL + (ROW)*n)      //  - 1 ??
    let location = (permArray[i] + (i*n))

    // PUSH LOCATION NUMBER TO LOCATION ARRAY
    locationArray.push(location);
  }

  // ITERATE OVER LOCATIONS ARRAY:
  for(let i = 0; i < n-1; i++) {    // n-1 HERE BECAUSE WE DO NOT NEED TO TEST THE LAST LOCATION

    // STORE COLUMN NUMBER FOR LATER USE
    let col = locationArray[i];

    // ITERATE OVER EACH SUBSEQUENT ELEMENT
    for(let j = i+1; j < n-i; j++) {  // i+1 HERE BECAUSE WE ARE COMPARING ARRAY[i] TO ARRAY[i+1]
                                      // n-i HERE BECAUSE WE ONLY WANT TO COMPARE THE REMAINING LOCS

                                      // INFOZ: COL = LOCATIONARRAY[i]
      if(j < col){ //(!!!) FOR n-1 (MINOR), COUNT UP TO CURRENT LOCATION'S COL-1 TIMES ONLY (!!!)

      // TEST FOR MINOR DIAGONAL ALIGNMENT
        if(((locationArray[j] - locationArray[i]) % (n-1)) === 0 ){  // MINOR DIAG COLLISION TEST
          return false
        }
      };


    // (!!!) FOR n+1 (MAJOR), COUNT *UP TO CURRENT LOCATION'S n-COL TIMES ONLY (!!!)
      if(j < (n - col)){

      // TEST FOR MAJOR DIAGONAL ALIGNMENT
        if(((locationArray[j] - locationArray[i]) % (n+1)) === 0 ){  // MAJOR DIAG COLLISION TEST
          return false
        }
      }; // END SECOND IF
    };   // END J FOR LOOP
  };     // END I FOR LOOP

  // RETURN TRUE (SINCE NO ALIGNMENT WAS FOUND)
  console.log('RETURNING TRUE');
  return true
};
//============================================================================//
//=============================  DUPLICATES TEST =============================//
//============================================================================//


function isUnique(array) {
    var seen = {};
    var len = array.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = array[i];
         if(seen[item] === 1) {
           return false;
         } else {
               seen[item] = 1;
         }
    }
  return true;
}




// EXECUTION
console.log('GENERATING PERMUTATIONS ARRAY OF LENGTH 10');
console.log(permGenArray(10));
console.log('PERMUTATIONS ARRAY MADE, LENGTH = ', permutationsArray.length);

console.log(arrayQueens(10));
console.log(arrayQueens(10));
console.log(arrayQueens(10));
console.log(arrayQueens(10));
console.log(arrayQueens(10));
console.log(speedQueens(10));
console.log(speedQueens(10));
console.log(speedQueens(10));
console.log(speedQueens(10));
console.log(speedQueens(10));
