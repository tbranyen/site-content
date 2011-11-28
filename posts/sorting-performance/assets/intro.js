largeList.sort(sortCode);
// Sort the potential list
var sortCode = function(a, b) {	
  return (a["obj"].someProp < b["obj"].someProp);
};
