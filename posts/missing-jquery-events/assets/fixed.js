var el = $("<div>lol</div>");

el.click(function() {
   alert("hi"); 
});
 
$("body").empty().append(el);
$(el).detach();
$("body").empty().append(el);
