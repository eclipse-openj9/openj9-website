<?php
/*******************************************************************************
 * Copyright (c) 2014 Eclipse Foundation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Christopher Guindon (Eclipse Foundation) - Initial implementation
 *******************************************************************************/

  require_once($_SERVER['DOCUMENT_ROOT'] . "/eclipse.org-common/system/app.class.php");
  require_once($_SERVER['DOCUMENT_ROOT'] . "/eclipse.org-common/system/nav.class.php");
  require_once($_SERVER['DOCUMENT_ROOT'] . "/eclipse.org-common/system/menu.class.php");

  $App   = new App();
  $Nav  = new Nav();
  $Menu   = new Menu();

  # Shared variables/configs for all pages of your website.
  require_once('_projectCommon.php');

  # Begin: page-specific settings.  Change these.
  $pageTitle = "Starterkit Template";
  $pageKeywords = "Add maximal 20 keywords and seperate them from each other by a comma en a space.";
  $pageAuthor = "Christopher Guindon";

  # Initialize custom solstice $variables.
  $variables = array();

  # Add classes to <body>. (String)
  $variables['body_classes'] = '';

  # Insert custom HTML in the breadcrumb region. (String)
  $variables['breadcrumbs_html'] = "";

  # Hide the breadcrumbs. (Bool)
  $variables['hide_breadcrumbs'] = FALSE;

  # Insert HTML before the left nav. (String)
  $variables['leftnav_html'] = '';

  # Update the main container class (String)
  $variables['main_container_classes'] = 'container';

  # Insert HTML after opening the main content container, before the left sidebar. (String)
  $variables['main_container_html'] = '';

  # Set Solstice theme variables. (Array)
  $App->setThemeVariables($variables);

  # Place your html content in a file called content/en_pagename.php
  ob_start();
  include("content/en_" . $App->getScriptName());
  $html = ob_get_clean();

  # Insert extra html before closing </head> tag.
  //$App->AddExtraHtmlHeader('<link rel="stylesheet" type="text/css" href="style.css" media="screen" />');

  # Insert script/html before closing </body> tag.
  //$App->AddExtraJSFooter('<script type="text/javascript" src="script.min.js"></script>');

  # Generate the web page
  $App->generatePage($theme, $Menu, $Nav, $pageAuthor, $pageKeywords, $pageTitle, $html);

