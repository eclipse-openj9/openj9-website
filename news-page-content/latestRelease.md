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

### Eclipse OpenJ9 version 0.21.0 released 

*20 July 2020*

OpenJ9 version 0.21.0 supports OpenJDK version 8, 11, and 14. OpenJDK builds that contain version 0.21.0 are now available from the AdoptOpenJDK community project:

- [OpenJDK version 8](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9)
- [OpenJDK version 11](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=openj9)
- [OpenJDK version 14](https://adoptopenjdk.net/releases.html?variant=openjdk14&jvmVariant=openj9)

This release of OpenJ9 sees several performance enhancements: 

- If the `-Xtune:virtualized` command line option is used, the default JIT scratch memory limit is now reduced from 256 MB to 16 MB. This reduces the peak from JIT compilation activity, allowing you to size containers more easily, based on the particular application's memory usage.

- If the JIT is running in a container and no swap space is defined, the JIT dynamically adjusts its scratch memory consumption based on the amount of free physical memory available, to avoid out-of-memory (OOM) occurrences.

- Several performance features were added to the AArch64 JIT compiler implementation that led to a throughput improvement on multiple applications of at least 20%. The most notable improvements were seen in global register allocation, recompilation (without profiling), CUDA support, concurrent scavenge GC policy, and the inlined code sequence for object allocations.

In this release, we've introduced two new options:

- `-XX:[+|-]HandleSIGABRT` affects the handling of the operating system signal `SIGABRT`. For compatibility with the reference implementation, set `-XX:-HandleSIGABRT`. 

- `-XX:[+|-]PrintFlagsFinal` outputs the values of a subset of configuration parameters in a format compatible with that produced by HotSpot. This is an initial implementation, and over time, we expect more options to be added to the output.

And for your convenience, the Application Programming Interface (API) documentation that applies to OpenJ9 can now be found in the user documentation for both JDK 8 and JDK 11. The documentation includes links to Oracle API documentation for information that is not specific to OpenJ9.

On macOS&reg; systems: You should note that in this release, the version information for shared libraries on macOS has been updated from 0.0.0 to 1.0.0. If an application has linked against a shared library from a previous OpenJ9 release, it needs to be re-linked against the new release. Failure to re-link causes an error `Incompatible library version`, `requires version 0.0.0`.

For all the details of changes and improvements in 0.21.0, read the [Version 0.21.0 "What's New" page](https://www.eclipse.org/openj9/docs/version0.21/) and see also the [OpenJ9 Release notes](https://github.com/eclipse/openj9/blob/master/doc/release-notes/0.21/0.21.md).
