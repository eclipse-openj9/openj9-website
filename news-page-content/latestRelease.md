<!--
Copyright (c) 2017, 2020 IBM Corp. and others

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

### Eclipse OpenJ9 version 0.22.0 released 

*24 September 2020*

OpenJ9 version 0.22.0 supports the new OpenJDK version 15. OpenJDK builds that contain version 0.22.0 of Eclipse OpenJ9 are now available from the AdoptOpenJDK community project:

- [OpenJDK version 15](https://adoptopenjdk.net/releases.html?variant=openjdk15&jvmVariant=openj9)

OpenJDK 15 with Eclipse OpenJ9 is not a long term support (LTS) release.

The latest builds of OpenJDK with OpenJ9 for Java 8 and 11 at the AdoptOpenJDK community are for Eclipse OpenJ9 release 0.21.0. Features mentioned in these release notes are not available in these Java 8 and 11 builds. Although it might be possible to build an OpenJDK 8 or OpenJDK 11 with OpenJ9 0.22.0, testing at the project is not complete and therefore support for any of these features is not available.

To learn more about support for OpenJ9 releases, including OpenJDK levels and platform support, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

In this release, we've introduced a new option: `-XX:[+|-]PortableSharedCache`. This option enables AOT compiled code to be generated, based on a chosen set of processor features that maximizes its portability across machines. It is currently supported only on x86. The feature is turned on by default in Docker containers and can be disabled with `-XX:-PortableSharedCache`.

The methods `com.ibm.lang.management.MemoryMXBean.getGCMasterThreadCpuUsed()` and `com.ibm.lang.management.MemoryMXBean.getGCSlaveThreadsCpuUsed()` are are now deprecated and will be removed in Java 16.
You are recommended to use `com.ibm.lang.management.MemoryMXBean.getGCMainThreadCpuUsed()` and `com.ibm.lang.management.MemoryMXBean.getGCWorkerThreadsCpuUsed()` respectively.

You should note that from Java 15, on AIX&reg; systems, `java.lang.System.mapLibraryName()` returns a representation of a native library in a platform-specific string with a `.so` suffix.


For all the details of changes and improvements in 0.22.0, read the [Version 0.22.0 "What's New" page](https://www.eclipse.org/openj9/docs/version0.22/) and see also the [OpenJ9 Release notes](https://github.com/eclipse/openj9/blob/master/doc/release-notes/0.22/0.22.md).
