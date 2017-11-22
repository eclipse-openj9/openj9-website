function test(url) {
//this removes the anchor at the end, if there is one
url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
//this removes the query after the file name, if there is one
url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
//this removes everything before the last slash in the path
url = url.substring(url.lastIndexOf("/") + 1, url.length);
//this removes everything after the last dot
url = url.substring(0, (url.indexOf(".") == -1) ? url.length : url.indexOf("."));
alert(url);
}

function navigation(url) {
  url = url.substring(url.lastIndexOf("/") + 1, url.length);                        // remove up to last slash
  url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#")); // remove after anchor
  url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?")); // remove after query
  url = url.substring(0, (url.indexOf(".") == -1) ? url.length : url.indexOf(".")); // remove after last dot

  document.write("<div class='nav'>");
  document.write("<span><i class='fa fa-bars' aria-hidden='true'></i></span>");
  document.write("<div class='nav-content'>");

  if(url == "index"          ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>Home</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='index.html'>Home</a></p>");

  if(url == "oj9_whatsnew"   ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>What's new?</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='oj9_whatsnew.html'>What's new?</a></p>");
  
  if(url == "oj9_build"      ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>Build</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='oj9_build.html'>Build</a></p>");
  	
  if(url == "oj9_performance") document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>Performance</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='oj9_performance.html'>Performance</a></p>");
  	
  if(url == "oj9_resources"  ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>Resources</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='oj9_resources.html'>Resources</a></p>");
  	
  if(url == "oj9_faq"        ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>FAQ</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='oj9_faq.html'>FAQ</a></p>");

  document.write("</div>");
  document.write("</div>");
}


