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

### Eclipse OpenJ9 version 0.26.0 released

*April 2021*

We're pleased to announce the availability of Eclipse OpenJ9 v0.26.0.

It's been little more than a month since our last release, which supported the OpenJDK 16
feature release. We can confirm that the following features first announced in OpenJ9 v0.25.0 are now available in OpenJ9 v0.26.0 for OpenJDK 8 and 11:

- For easier adoption and deployment, compressed and non-compressed object reference support is now combined in a single binary of OpenJDK with OpenJ9 0.26.0 rather than two distinct binaries (standard and large heap). The object reference mode is selected at run time based on the Java object heap size or by specifying the mode you want to use on the command line.  
- Improved hardware acceleration is implemented for AIX systems that contain the Nest accelerator (NX) co-processor by using the <tt>zlibNX</tt> library.

<br/>

#### Performance highlights

Eclipse OpenJ9 v0.26.0 also contains a number of performance improvements.

- When the OpenJ9 VM is run in debug mode, startup time is improved significantly. This achievement is possible because the JIT can now generate AOT-compiled code for this mode. The AOT-compiled code is stored in the shared classes cache and is transparently accessible to an application that uses the cache at startup.

- Throughput performance improvements of 10-20% are seen on **AArch64** platforms due to the addition of inlined write barrier support.

- On OpenJDK 11 and later releases, improvements are made for `String` performance by fixing a JIT issue that enables an optimization for accelerating `String` concatenations.  

To read more about the changes for v0.25.0 and v.0.26.0, see the [OpenJ9 user documentation](docs/openj9_releases/).
