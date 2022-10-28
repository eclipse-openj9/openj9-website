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

### Eclipse OpenJ9 version 0.35.0 released

October 2022

We're pleased to announce the availability of Eclipse OpenJ9&trade; v0.35.0.

This release supports OpenJDK version 8, 11, and 17. For more information about supported platforms and OpenJDK versions,
see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

Other updates in this release include the following:

- Java dump files contain more information about waiting threads
- New `user2` event added for taking system dump files with exclusive access without overriding the `user` event
- New `-XX:[+|-]PerfTool` option added for enabling or disabling the JIT support for the `perf` tool without affecting the existing `-Xjit` options
- `-XX:+EnsureHashed:java/lang/Class,java/lang/Thread` is added to the list of default options in the `options.default` file for pre-hashing `Class` and `Thread` objects from the start and hence, improving performance
- New options, `-XX:JITServerMetricsSSLKey` and `-XX:JITServerMetricsSSLCert`, added for encrypting the custom metrics with SSL or TLS
- `-XX:[+|-]JITServerLocalSyncCompiles` is now enabled in most cases to reduce the latency of the compilations that are performed synchronously. It is disabled when you specify [`-Xjit:count=0`](xjit.md#count) and in a few advanced use cases such as running the JVM in debug mode.

To read more about these and other changes, see the [OpenJ9 user documentation](https://www.eclipse.org/openj9/docs/openj9_releases/).
