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

### Eclipse OpenJ9 version 0.29.0 and 0.29.1 released

We're pleased to announce the availability of Eclipse OpenJ9 v0.29.0 and v0.29.1.

- The 0.29.0 release supports OpenJDK 8 and 11. The 0.29.1 release supports OpenJDK 17. For more information about supported platforms and OpenJDK versions, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

- In this release, Linux AArch64 is a fully supported, production-ready target. JITServer technology is also fully supported on Linux on x86 and Linux on IBM Power systems (64-bit only).

- To read more about these and other changes, see the [OpenJ9 user documentation](docs/openj9_releases/).

#### Other performance highlights ####

- AArch64 adds significant performance improvements to System.arraycopy() and interface method dispatches from JIT-compiled methods.