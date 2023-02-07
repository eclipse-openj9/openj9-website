<!--
Copyright (c) 2017, 2023 IBM Corp. and others

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

SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception

The project website pages cannot be redistributed
-->

### Eclipse OpenJ9 version 0.36.x released

February 2023
 
We're pleased to announce the availability of Eclipse OpenJ9&trade; v0.36.x.
 
OpenJ9 release 0.36.0 supports OpenJDK version 8 and 17. Release 0.36.1 supports OpenJDK 11. 

For more information about supported platforms and OpenJDK versions,
see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

Other updates in this release include the following:

- On operating systems other than Windows&trade; and z/OS&reg;, the default shared classes cache directory in the user's home directory is changed from `javasharedresources` to `.cache/javasharedresources`.
- New `-XX:[+|-]MergeCompilerOptions` option is added to enable or disable the merging of multiple `-Xjit` or `-Xaot` options into a single `-Xjit` or `-Xaot` option.
- If a client JVM does not indicate a specific JITServer AOT cache it wants to use with the `-XX:JITServerAOTCacheName=<cache_name>` option, the `default` JITServer AOT cache is used instead of a nameless cache.
- New `-XX:JITServerAOTmx` option is added to specify the maximum amount of memory that all AOT cache instances combined can use at the JITServer server.
- New `-XX:[+|-]JITServerAOTCachePersistence` option is added to specify whether the JITServer server periodically saves its AOT caches to files. Other JITServer instances can then load these caches the first time that a client requests a particular cache.
- New `-XX:JITServerAOTCacheDir` option is added to specify the directory for saving or loading the JITServer AOT cache files.

To read more about these and other changes, see the [OpenJ9 user documentation](https://www.eclipse.org/openj9/docs/openj9_releases/).
