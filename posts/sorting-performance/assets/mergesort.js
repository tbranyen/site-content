var sort = function(array) {
  var len = array.length;
  if(len < 2) { 
    return array;
  }
  var pivot = Math.ceil(len/2);
  return merge(sort(array.slice(0,pivot)), sort(array.slice(pivot)));
};
    
var merge = function(left, right) {
  var result = [];
  while((left.length > 0) && (right.length > 0)) {
    if(left[0]["obj"].someProp > right[0]["obj"].someProp) {
      result.push(left.shift());
    }
    else {
      result.push(right.shift());
    }
  }
        
  result = result.concat(left, right);
  return result;
};
    
var largeList = sort(largeList);
