
var n8solutions = [
[4,7,3,8,2,5,1,6],
[5,2,4,7,3,8,6,1],
[4,2,7,3,6,8,5,1],
[4,6,8,3,1,7,5,2],
[3,6,8,1,4,7,5,2],
[5,3,8,4,7,1,6,2],
[5,7,4,1,3,8,6,2],
[4,1,5,8,6,3,7,2],
[3,6,4,1,8,5,7,2],
[6,2,7,1,4,8,5,3],
[4,7,1,8,5,2,6,3],
[6,4,7,1,8,2,5,3]];

var n8nonSolutions = [
[2,7,3,8,4,5,1,6],
[5,4,2,7,3,8,6,1],
[4,2,1,3,6,8,5,7],
[4,6,8,5,1,7,3,2],
[3,6,7,1,4,8,5,2],
[5,4,3,2,1,6,7,8],
[5,4,7,1,8,3,6,2],
[1,2,3,4,5,6,7,8],
[8,7,6,5,4,3,2,1],
[4,3,2,1,8,7,6,5],
[1,4,2,6,3,7,5,8],
[6,5,2,1,8,7,4,3]]

var n8someSolutions = [
[2,7,3,8,4,5,1,6],
[5,7,4,1,3,8,6,2],
[5,4,2,7,3,8,6,1],
[4,1,5,8,6,3,7,2],
[4,2,1,3,6,8,5,7],
[3,6,4,1,8,5,7,2],
[4,6,8,5,1,7,3,2],
[6,2,7,1,4,8,5,3],
[3,6,7,1,4,8,5,2],
[4,7,1,8,5,2,6,3],
[5,4,3,2,1,6,7,8],
[6,4,7,1,8,2,5,3]]

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

// --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  //
  // CONSECUTIVE-CHECKER HELPER FUNCTION

function noConsecutives(inputArray){
  
  let len = inputArray.length;

  for(let i = 0; i < len; i++) {
    if(Math.abs(inputArray[i] - inputArray[i+1]) === 1) { return false;};
  }

  return true;
}


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


// https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
// DUPE TRUTH-TEST ACQUIRED FROM STACK-OVERFLOW:

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


//=================================================================================//
//== THEN THERE IS THIS WHOLE POSITIONAL METHOD WHICH I HAVE YET TO ACTUALLY TRY ==//
//=================================================================================//


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
//============  TEST WHETHER THIS PRE-TEST IS AN EFFICIENCY GAIN: ============//
//============================================================================//

  // WHILE GENERATING THE LOCATION NUMBERS:
    // IF AT ANY POINT IN THE PERMARRAY, ABS(ARRAY[i]-ARRAY[i+1] = 1), FAIL!


//============================================================================//
//=============================  WHOLE NEW IDEA: =============================//
//============================================================================//

//TEST ONE PERM:      // COMPLEXITY = ?

//  MAJOR COLLISION:
    // MAP INPUT ARRAY TO NEW ARRAY OF ABS. DIFFERENCES BETWEEN EACH VALUE AND ITS INDEX
    // var deduped = new Set(permArray.map(function (){index-value diff})) ;
    // IF deduped.length !== permArray.length, FAIL


//  MINOR COLLISION:
    // MAP INPUT ARRAY TO NEW ARRAY OF ABS. DIFFERENCES BETWEEN EACH VALUE AND (n-ITS INDEX)
    // var deduped = new Set(permArray.map(function (){value-(n-index) diff})) ;
    // IF deduped.size !== permArray.length, FAIL

// OR  return ((new Set(permArray.map(function (){value-index diff}))).size === permArray.length) &&
//            ((new Set(permArray.map(function (){value-(n-index) diff}))).size === permArray.length);
