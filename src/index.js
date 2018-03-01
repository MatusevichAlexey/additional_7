module.exports = function solveSudoku(matrix) {


  solve(matrix,0,0);
  return matrix;

  function solve(matrix, line, column) {
    var cell = findUnassignedLocation(matrix, line, column);
    line = cell[0];
    column = cell[1];
    
    if (line == -1) {
      return true;
    }

    for (var number = 1; number <= 9; number++) {

      if ( checkConflicts(matrix, line, column, number) ) {   
        matrix[line][column] = number;

        if ( solve(matrix, line, column) ) {                
          return true;
        }

        matrix[line][column] = 0;
      }
    }

    return false;
  }


  function findUnassignedLocation(matrix, line, column) {
    var finded = false;
    var location = [-1, -1];

    while (!finded) {
      if (line == 9) {
        finded = true;
      } else {
        if (matrix[line][column] == 0) {
          location[0] = line;
          location[1] = column;
          finded = true;
        } else {
            
          if (column < 8) {
          column++;
          } else {
            line++;
            column = 0;
          }
        }
      }
    }
    return location;
  }

  function checkConflicts(matrix, line, column, number) {    
    
    var noConflictsInLine = true;
    for (var j = 0; j < 9; j++)
      if (matrix[line][j] === number) {
        noConflictsInLine = false;
      }

    var noConflictsInColumn = true;
    for (var i = 0; i < 9; i++)
      if (matrix[i][column] === number) {
        noConflictsInColumn = false;
      }

    var noConflictsInBox = true;
      for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
          if (matrix[(Math.floor(line / 3) * 3)  + i][(Math.floor(column / 3) * 3) + j] === number) {
            noConflictsInBox = false;
          }
  
  return noConflictsInLine && noConflictsInColumn && noConflictsInBox;
  }
  

}
