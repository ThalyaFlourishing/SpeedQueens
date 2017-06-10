                        // INFOZ: . INDEX = ROW
                        // INFOZ: . VALUE = COL
                        // QUEST: ? STILL NEED TO DEAL WITH +1/-1 OFFSETS?
                        // QUEST: ? WHAT PROBLEM IS CAUSED BY STARTING LOCATIONS AT 1 INSTEAD OF 0?
                        // ANSWR: . THEORY: AS LONG AS EVERYTHING IS SET THE SAME RE OFFSETS,
                                  // THEN IT DOES NOT MATTER
                        // INFOZ: . YOU DO NOT NEED TO WORRY ABOUT SEARCHING PAST THE BOTTOM
                                  // OF THE BOARD BECAUSE THERE WILL NEVER BE PIECES THERE
                                  // THE FALSE-POSITIVES COME FROM WRAPPING OVER COLUMNS, NOT ROWS

// DELCARE FUNCTION WITH A SINGLE PERM ARRAY AS INPUT
function nQueensTest(permArray) {  // COMPLEXITY: O(n^2 + n)

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

function nQueensTestIndexee(n) {
  var i = 0;
  return (new Set(permArray.map(function(e){
    i++;
    console.log(e-i);
    console.log('i = ', i, '\ne = ', e);
    return e-i;
  })).size === permArray.length
  
  &&
  
  new Set(permArray.map(function(e){
  i++;
  console.log(e-(n-i));
  console.log('i = ', i, '\ne = ', e);
  return e-i;
  })).size === permArray.length );

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