<!--
Copyright (c) 2017, 2024 IBM Corp. and others

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
[2] https://openjdk.org/legal/assembly-exception.html

SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0 OR GPL-2.0-only WITH OpenJDK-assembly-exception-1.0

The project website pages cannot be redistributed
-->

### Eclipse OpenJ9 version 0.38.0 released

May 2023

We're pleased to announce the availability of Eclipse OpenJ9&trade; v0.38.0.

This release supports OpenJDK version 8, 11, and 17. For more information about supported platforms and OpenJDK versions, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

Other updates in this release include the following:

- New `-XX:[+|-]HandleSIGUSR2` option is added to enable the handling of the `SIGUSR2` signal by the application signal handler instead of the VM signal handler in the absence of signal chaining.
- Support for the Checkpoint/Restore In Userspace (CRIU) tool is currently provided as a technical preview. This preview is supported for use in production environments, however, all APIs and options are subject to change. You can use the CRIU feature to stop the VM at a checkpoint, save its state, then run the VM from the point where it was stopped, hence improving the VM startup time and performance. 

To read more about these and other changes, see the [OpenJ9 user documentation](https://www.eclipse.org/openj9/docs/openj9_releases/).

#### Performance highlights include:

-  StackWalking for refreshing LatestUserDefinedClassLoader (LUDCL) cache is optimized, saving substantial amount of CPU time for applicable workloads.

### Eclipse OpenJ9 version 0.37.0

OpenJ9 v0.37.0. release supported OpenJDK version 19. OpenJDK 19 was out of support at the time of the 0.37.0 release. Builds of 0.37.0 should not be used in production and might contain known security vulnerabilities as of 18 April 2023.

Other updates in that release included the following:

- The OpenJ9 ThreadMXBean interface extends the [com.sun.management.ThreadMXBean](https://docs.oracle.com/javase/8/docs/jre/api/management/extension/com/sun/management/ThreadMXBean.html) interface instead of the java.lang.management.ThreadMXBean interface.
- OpenJ9 supports the use of an extra attribute, `tokenlabel`, in the SunPKCS11 configuration file on z/OS&reg; and Linux on IBM Z to assign a label to a PKCS#11 token. The `tokenlabel` attribute can be used instead of the `slot` or `slotListIndex` attributes.

#### Performance highlights included:

-  With the implementation of CRC-32C polynomial acceleration on Linux on POWER LE (ppc64le) and AIX POWER&reg; BE (ppc64), performance of CRC-32C calculations on these platforms is 25 times faster (even up to 42 times faster) on data payload of typical sizes.
