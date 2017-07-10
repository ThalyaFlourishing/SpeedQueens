var permutationsArray = [];
var solutionsArray = [];

function evenSpeedierQueens(n) {
  if (n < 1) { return 'Input value must be positive.'; };
  solutionsArray = [];
  let timeStart = new Date();
  array = starterArrayGen(n);
  superSpeedPermTestEngine(n, array);
  let timeEnd = new Date();
  let elapsedTime = ((timeEnd - timeStart)/1000);
  
  console.log( 'The number of nQueens solutions for a board of size ' + n + ' is ' + solutionsArray.length + '.\n This computation took ' + elapsedTime + ' seconds. \n To see all solution boards, enter \'showBoards(solutionsArray)\'');
}


function superSpeedPermTestEngine(n, array) {  // COMPLEXITY = O(n! * (n^2 + n) )

  if (n === 1) {
    
    if(noConsecutives(array)) {
      if(nQueensTestIndexeeUniq(array)) {
        solutionsArray.push(array);
      }
    }
  } else {
    for (var i = 1; i <= n; i += 1) {
      superSpeedPermTestEngine((n - 1), array);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
//      swap(array, j - 1, n - 1);
      if(!(j === n)) {swap(array, j - 1, n - 1);}; // DO NOT BOTHER SWAPPING EQUAL INDICES
    }
  }
};


var starterArrayGen = function(n) {
  
  var outputArray = [];
  for(let i = 1; i <= n; i++) {
      outputArray.push(i);
    }
  return outputArray;
  };


var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};


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

evenSpeedierQueens(10);
