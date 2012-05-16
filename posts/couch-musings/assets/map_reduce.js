// Increment the count by 1 for each document and emit an Array of date
// segments for easy filtering.
map: function(doc) {
  emit([doc.month, doc.day, doc.hour, doc.minute], 1);
},

// Calculate the total count to the respective group_level.
reduce: function(keys, values, rereduce) {
  return sum(values);
}
