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

### Eclipse OpenJ9 version 0.23.0 released 

*23 October 2020*

OpenJ9 version 0.23.0 supports OpenJDK version 8, 11, and 15. OpenJDK builds that contain version 0.23.0 are now available from the AdoptOpenJDK community project:

- [OpenJDK version 8](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9)
- [OpenJDK version 11](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=openj9)
- [OpenJDK version 15](https://adoptopenjdk.net/releases.html?variant=openjdk15&jvmVariant=openj9)

This release of OpenJ9 sees several performance enhancements: 

To learn more about support for OpenJ9 releases, including OpenJDK levels and platform support, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

In this release, we've improved the effectiveness of the option `-XX:[+|-]PortableSharedCache` by also making the AOT compiled code to be more portable across different heap sizes in compressed references mode on the X86 platform.

The option `-XX:[+|-]IdleTuningCompactOnIdle` that triggered a compaction of the Java heap during the idle state of the JVM is now deprecated. A new mechanism, which is independent of the option, has been implemented. This mechanism measures fragmentation and triggers heap compaction as needed.

The JITServer technology preview has been extended to Linux&reg; on IBM Power&reg; systems and Linux on IBM Z&reg; systems (64-bit only).

For compatibility, the `-XX:[+|-]AlwaysPreTouch` OpenJDK HotSpot option is now supported by OpenJ9.

For all the details of changes and improvements in 0.23.0, read the [Version 0.23.0 "What's New" page](https://www.eclipse.org/openj9/docs/version0.23/) and see also the [OpenJ9 Release notes](https://github.com/eclipse/openj9/blob/master/doc/release-notes/0.23/0.23.md).
