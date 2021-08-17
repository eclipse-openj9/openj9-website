<!--
Copyright (c) 2017, 2021 IBM Corp. and others

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

### Eclipse OpenJ9 version 0.27.0 released

*July 2021*

We're pleased to announce the availability of Eclipse OpenJ9 v0.27.0.

This release supports OpenJDK version 8, 11, and 16. For more information about supported platforms and OpenJDK versions, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

In this release, the following new options are added and enabled by default to improve performance:
- `-XX:[+|-]AdaptiveGCThreading` dynamically adjusts the garbage collection thread count to reduce collection pause times.
- `-Xgc:dynamicBreadthFirstScanOrdering` enables a new scan mode to improve performance of the `balanced` garbage collection policy.

Existing option `-XX:[+|-]GlobalLockReservation` (AIX and Linux on Power systems only), which improves the performance of locking and unlocking of Java&trade; objects, is now also enabled by default.

To read more about these and other changes, see the [OpenJ9 user documentation](docs/openj9_releases/).

#### Other performance highlights ####

- The performance of method invocation via reflection is improved by reducing stack walking overhead related to access checking associated with that API.
- The JIT compiler includes several incremental throughput improvements related to the warm hotness level and loop handling.
- On AArch64, the JIT compiler provides incremental performance improvements for applications generally, including: reducing Java synchronization overhead, improving array access performance in loops, and increased virtual and JNI method dispatch performance.
- New POWER10 hardware features are exploited to improve application path length and the performance of various array and byte operations.
