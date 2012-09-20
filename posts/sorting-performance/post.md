title: 'Increasing Javascript array sorting performance'
tags: ['javascript', 'performance']
posted: new Date('12/8/2009')

Alright its early in the morning here and I've been working all day... specifically on a project that has ~19k objects loaded from a webservice call into an array.  On top of that monstrosity, they need to be sorted on a given property that has a numerical value.  This was doable through a custom Array.sort method, it was simple to write and achieved the results I was looking for.  It was, however, dreadfully slow.  On the CEO's box IE 7 would constantly have a fit throwing the infamous "Script is running slow, continue running scripts?" dialog.  The code looked something like this:

{{'intro.js'|render}}

At a glance this looks reasonably efficient.  With 18,836 objects in the list, it took _6,516.887ms_ in _189,578_ calls.  Nearly 190k calls just to sort, not to mention nearly 7 seconds of processing on a reasonably fast dual core virtual machine!

Being a self taught coder and skipping out on CS theory in college, I missed out on sorting algorithm lessons.  After talking with some CS majors and help from Wikipedia, I decided on using the Merge Sort Algorithm.  Implementing it was straight forward enough.  A little more code, but the results were impressive.

{{'mergesort.js'|render}}

By replacing the code with the above, the sorting only takes __66,601__ calls, and executes in.... __1,393.083ms__, very impressive!

I do not take full credit for the source above, inspiration came from the Wikipedia psuedo code found here: <a target="_blank" href="http://en.wikipedia.org/wiki/Merge">http://en.wikipedia.org/wiki/Merge</a> and a working Javascript implementation here: <a target="_blank" href="http://en.literateprograms.org/Merge_sort_%28JavaScript%29">http://en.literateprograms.org/Merge_sort_%28JavaScript%29</a>

I will, however, take full credit for making my version the most efficient sorting implementation I've seen so far.  If you have any suggestions, questions, tips, etc. You know the drill post in the comments!

__Update:__
I found a way to cut back even more on processing time.  By swapping the Array.shift (which recreates the array each time) I instead changed the code to run a counter and managed entries that way.  
