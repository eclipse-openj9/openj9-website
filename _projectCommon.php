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

  # Set the theme for your project's web pages.
  # See the Committer Tools "Phoenix" secion in the How Do I? for list of themes
  # https://dev.eclipse.org/committers/
  $theme = "solstice";

  # Define your project-wide Nav bars here.
  # Format is Link text, link URL (can be http://www.someothersite.com/), target (_self, _blank).
  $Nav->addNavSeparator("Solstice",   "/eclipse.org-common/themes/solstice/docs/");
  $Nav->addCustomNav("Documentation", "/eclipse.org-common/themes/solstice/docs/", "_self", NULL);
  $Nav->addCustomNav("Source code", "http://git.eclipse.org/c/www.eclipse.org/eclipse.org-common.git/tree/themes/solstice/", "_self", NULL);
  $Nav->addCustomNav("Using Phoenix", "http://wiki.eclipse.org/Using_Phoenix", "_self", NULL);
