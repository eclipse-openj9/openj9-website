/*
Copyright (c) 2017, 2018 IBM Corp. and others

This program and the accompanying materials are made available under the terms of the Eclipse Public License 2.0 which accompanies this distribution and is available at http://eclipse.org/legal/epl-2.0 or the Apache License, Version 2.0 which accompanies this distribution and is available at https://www.apache.org/licenses/LICENSE-2.0. 

This Source Code may also be made available under the following Secondary Licenses when the conditions for such availability set forth in the Eclipse Public License, v. 2.0 are satisfied: GNU General Public License, version 2 with the GNU Classpath Exception [1] and GNU General Public License, version 2 with the OpenJDK Assembly Exception [2]. 

[1] https://www.gnu.org/software/classpath/license.html  
[2] http://openjdk.java.net/legal/assembly-exception.html 

SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
The project website pages cannot be redistributed
 */
 
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
 
  if(url == "https://blog.openj9.org/"  ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>Blog</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='https://blog.openj9.org/' target='_blank'>Blog</a></p>");
  
  if(url == "oj9_faq"        ) document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i>FAQ</p>");
  else                         document.write("<p><i class='fa fa-chevron-circle-right f_mini' aria-hidden='true'></i><a class='nav-item' href='oj9_faq.html'>FAQ</a></p>");

  document.write("</div>");
  document.write("</div>");
}


