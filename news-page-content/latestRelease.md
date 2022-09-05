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

### Eclipse OpenJ9 version 0.33.x released

August 2022

We're pleased to announce the availability of Eclipse OpenJ9 v0.33.x.

This release supports OpenJDK version 8, 11, 17, and 18. For more information about supported platforms and OpenJDK versions,
see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

This release includes an early access build for Apple Silicon (AArch64) macOS. You can use this build for evaluation purposes;
it is not yet suitable for use in production environments.

Other updates in this release include the following:

- JITServer supports the use of OpenSSL 3.0.x for encrypting network traffic
- JITServer supports caching of AOT compiled methods at the server
- JITServer supports exporting of custom performance metrics to monitoring agents, such as Prometheus
- OpenJ9 supports control groups (cgroups) v2 to match the gradual transition of the Linux&reg; operating systems from cgroups v1 to v2 as their default choice

To read more about these and other changes, see the [OpenJ9 user documentation](https://www.eclipse.org/openj9/docs/openj9_releases/).

#### Performance highlights include:

- Elliptic curve (EC) algorithms are mapped to using the OpenSSL routines from the OpenJDK JCE provider leading to large improvements in some microbenchmarks (2-3x faster) across platforms.
- The performance of `String` methods is improved through better inlining/optimization in the JIT compiler.
- The recycling of Garbage Collection (GC) thread local heap copy buffers is improved for the `balanced` GC policy.
