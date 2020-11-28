function add_animate(obj){window.animate_onclick=Object.assign(window.animate_onclick?window.animate_onclick:{},obj);}
function check_common_closest(button,a,button_selector,common_select="self"){
  if(common_select=="self"){
    console.log($(a).closest(button_selector));
    return $(button).is($(a).closest(button_selector));
  }
  else if(common_select=="other"){
    return $(button).is($(a).find(button_selector));
  }
  else{
    return $(button).closest(common_select).is($(a).closest(common_select));
  }
}
function bind_animate(){
/*
{
button:target~toggle~toggleclass
button:target~toggleOne~toggleclass~commonParent(or self/other)
button:target~addOne~addClass~commonParent(or self/other)
button:target~removeOne~removeClass~commonParent(or self/other)
button:target~add/toggleOne~addClass~commonParent(or self/other)
button:target~remove/toggleOne~addClass~commonParent(or self/other)
}
*/
  Object.keys(window.animate_onclick?window.animate_onclick:{}).map(function(button_selector){
    var settings=window.animate_onclick[button_selector].split("~");
    $(button_selector).on("click",function(event){
      switch (settings[1]) {
        case "toggle":
          $(settings[0]).toggleClass(settings[2]);
          break;
        case "toggleOne":
          $(settings[0]).each(function(i,a){
          if(check_common_closest(event.target,a,button_selector,settings[3])){
            $(a).toggleClass(settings[2]);
          }});
          break;
        case "addOne":
        case "add/toggleOne":
          $(settings[0]).each(function(i,a){
          if(check_common_closest(event.target,a,button_selector,settings[3])){
            if(settings[1]=="addOne"){$(a).addClass(settings[2]);}
            else{$(a).toggleClass(settings[2]);}
          }else {
            $(a).removeClass(settings[2]);
          }});
          break;
        case "removeOne":
        case "remove/toggleOne":
          $(settings[0]).each(function(i,a){
          if(check_common_closest(event.target,a,button_selector,settings[3])){
            if(settings[1]=="removeOne"){$(a).removeClass(settings[2]);}
            else{$(a).toggleClass(settings[2]);}
        }else {
            $(a).addClass(settings[2]);
          }});

          break;

        default:
      }
    });
  });

}
$(document).ready(function(){bind_animate();});
