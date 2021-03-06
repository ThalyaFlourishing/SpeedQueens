var permGenDisplayOnly = function (array, output, n) {
  n = n || array.length; // SET N DEFAULT TO ARRAY.LENGTH
  if (n === 1) {
    output(array);
  } else {
    for (var i = 1; i <= n; i += 1) {
      permGenDisplayOnly(array, output, n - 1);
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
var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

//=============================================================================//
//=============================================================================//

var display = function(input){
  console.log(input);
}


var displayPermutationMatrix = function(matrix) {

  var outputString = '';

  for(var i = 0; i < matrix.length; i++) {
    outputString += ('|' + matrix[i].join('|') + '|\n');
    }
  
  return outputString + '\n';
}

//=============================================================================//
//=============================================================================//

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
var showBoard = function(permutation) {
  return console.log(displayPermutationMatrix(translatePermutationToCharacterMatrix(permutation)));
}

