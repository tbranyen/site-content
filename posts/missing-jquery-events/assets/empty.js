// Remove element nodes and prevent memory leaks
if ( elem.nodeType === 1 ) {
  jQuery.cleanData( elem.getElementsByTagName("*") );
}
