<!--
Copyright (c) 2017, 2017 IBM Corp. and others

This program and the accompanying materials are made available under
the terms of the Eclipse Public License 2.0 which accompanies this
distribution and is available at https://www.eclipse.org/legal/epl-2.0/
or the Apache License, Version 2.0 which accompanies this distribution and
is available at https://www.apache.org/licenses/LICENSE-2.0.

This Source Code may also be made available under the following
Secondary Licenses when the conditions for such availability set
forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
General Public License, version 2 with the GNU Classpath
Exception [1] and GNU General Public License, version 2 with the
OpenJDK Assembly Exception [2].

[1] https://www.gnu.org/software/classpath/license.html
[2] http://openjdk.java.net/legal/assembly-exception.html

SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception

The project website pages cannot be redistributed
-->
# Eclipse OpenJ9 website


This repository contains the HTML source files for the [Eclipse OpenJ9 website](http://www.eclipse.org/openj9).

If you would like to contribute to the content on this website, please read
these [Contributions guidelines](https://github.com/eclipse/openj9/blob/master/CONTRIBUTING.md).

Changes merged into this repository's master branch are automatically synced into the Eclipse git website repo's master branch. The two master branches should always have the same content, though possibly up to 5 minutes delayed due to sync timing.

## Previewing pull requests (whitelisted users only)

Pull requests must be previewed before merging by triggering the [Jenkins-ci job](https://ci.eclipse.org/openj9/job/PullRequest-Website-test_on_staging_site/)  
To run the job, add the following trigger comment into a pull request:  
```
Jenkins website stage
```  
Staging site: http://staging.eclipse.org/openj9

#### Please Note
The staging website is based on the staging branch of the Eclipse repo.  
Since there is only one staging branch, whichever PR job ran last, will be the current one staged to the staging website.  
You can view the [build history](https://ci.eclipse.org/openj9/job/PullRequest-Website-test_on_staging_site/) on the build page (left hand column) to see which PR ran last. Each run is annotated with the link to the PR as well as the PR title.  
Also note that it can take a few minutes for the contents of the staging website to refresh.

## OpenJ9 license information

```
Copyright (c) 2017, 2020 IBM Corp. and others

This program and the accompanying materials are made available under
 the terms of the Eclipse Public License 2.0 which accompanies this
 distribution and is available at http://eclipse.org/legal/epl-2.0
 or the Apache License, Version 2.0 which accompanies this distribution and
 is available at https://www.apache.org/licenses/LICENSE-2.0. 

This Source Code may also be made available under the following
Secondary Licenses when the conditions for such availability set
forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
General Public License, version 2 with the GNU Classpath
Exception [1] and GNU General Public License, version 2
with the OpenJDK Assembly Exception [2]. 

[1] https://www.gnu.org/software/classpath/license.html  
[2] http://openjdk.java.net/legal/assembly-exception.html 

SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
```
