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

### Eclipse OpenJ9 version 0.24.0 released 

*19 January 2021*

OpenJ9 version 0.24.0 supports OpenJDK version 8, 11, and 15. OpenJDK builds that contain version 0.24.0 are now available from the AdoptOpenJDK community project:

- [OpenJDK version 8](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9)
- [OpenJDK version 11](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=openj9)
- [OpenJDK version 15](https://adoptopenjdk.net/releases.html?variant=openjdk15&jvmVariant=openj9)


To learn more about support for OpenJ9 releases, including OpenJDK levels and platform support, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

This release of OpenJ9 sees several performance enhancements: 


For compatibility with the reference implementation, we've added support for the `JAVA_OPTIONS` environment variable. You can use this environment variable, which can be overridden by `OPENJ9_JAVA_OPTIONS`, to set command line options.

From OpenJDK 15, the `-XX:[+|-]ShareAnonymousClasses` option enables and disables the storage of hidden classes in the shared classes cache. (In previous versions, it enables and disables the storage of VM anonymous classes in the shared classes cache. )

Several `jcmd` `Dump` commands can now take `request=<requests>` and `opts=<options>` parameters in addition to those already allowed.

Optionally, `-Xcheck:jni` can now take an additional suboption, `abortonerror`, that provides diagnostic data when fatal JNI errors occur. 

To avoid confusion with the reference implementation of the `-Xlog` option, the `-Xsyslog` option replaces the existing OpenJ9 `-Xlog` option for message logging. For compatibility with the reference implementation, a limited set of `-Xlog` suboptions are supported.
A new option, `-XX:[+|-]LegacyXlogOption`, controls how `-Xlog` is processed when set on the command line.

The `-XX:[+|-]PortableSharedCache` option is now supported on IBM Z&reg; and POWER&reg; platforms. AOT-compiled code that is generated with this option is guaranteed to be portable across IBM z10 or newer microarchitectures on IBM Z platforms and IBM POWER8&reg; or newer microarchitectures on POWER platforms.

The `jextract` utility gathers relevant files following a system dump. It is important that the utility is run from the same SDK that generated the dump. From this release, if the build ID of the `jextract` utility does not match the build ID of the SDK recorded in the system dump, an exception message is generated. To force `jextract` to continue, a new option, `-r`, is introduced.


For all the details of changes and improvements in 0.24.0, read the [Version 0.24.0 "What's New" page](https://www.eclipse.org/openj9/docs/version0.24/) and see also the [OpenJ9 Release notes](https://github.com/eclipse/openj9/blob/master/doc/release-notes/0.24/0.24.md).
