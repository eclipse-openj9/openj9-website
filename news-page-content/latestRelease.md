<!--
Copyright (c) 2017, 2022 IBM Corp. and others

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

### Eclipse OpenJ9 version 0.30.1 released

We're pleased to announce the availability of Eclipse OpenJ9 v0.30.1.

- The 0.30.1 release supports OpenJDK 8, 11 and 17. For more information about supported platforms and OpenJDK versions, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

- The problem creating system core files on macOS 12 is resolved.

- To read more about these and other changes, see the [OpenJ9 user documentation](docs/openj9_releases/).


### Eclipse OpenJ9 version 0.30.0 released

We're pleased to announce the availability of Eclipse OpenJ9 v0.30.0.

- The 0.30.0 release supports OpenJDK 8, 11 and 17. For more information about supported platforms and OpenJDK versions, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

- In this release, users should remove obsolete shared cache files created by older releases, heap resizing is redesigned for the balanced GC policy, ignored options are listed in the javacore, and a new option `-XX:[+|-]EnsureHashed` is added.

- There is a known problem creating system core files on macOS 12.

- To read more about these and other changes, see the [OpenJ9 user documentation](docs/openj9_releases/).

#### Other performance highlights ####

- 14% better write-barrier sequence on Power

- 15-30% better String.indexOf() performance on Power10
