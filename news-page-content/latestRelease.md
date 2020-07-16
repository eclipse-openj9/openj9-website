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

### Eclipse OpenJ9 version 0.20.0 released 

*17 April 2020*

OpenJ9 version 0.20.0 supports OpenJDK version 8, 11, and 14. OpenJDK builds that contain version 0.20.0 are now available from the AdoptOpenJDK community project:

- [OpenJDK version 8](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=openj9)
- [OpenJDK version 11](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=openj9)
- [OpenJDK version 14](https://adoptopenjdk.net/releases.html?variant=openjdk14&jvmVariant=openj9)

In addition to the usual Linux distributions available, we're pleased to introduce an early access release of OpenJDK 11 for the 64-bit ARM architecture (AArch64). You can find this binary on the [Latest Release](https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=openj9) page. We'd like as many people as possible to try it out and we'd really appreciate any feedback you have. If you do find a problem that we're not already trying to fix (see [OpenJ9 Known Issues](https://github.com/eclipse/openj9/blob/master/doc/release-notes/0.20/0.20.md#known-issues)), please open an issue at the [OpenJ9 GitHub repo](https://github.com/eclipse/openj9/issues).

In this release, we've introduced a new option (-XX:+GlobalLockReservation) that aims to speed up the handling of object locks. Heuristics are used to try and determine when an object will be exclusively locked by a single thread, so that faster, more specialized code can be used for locking the object. Performance improvements are expected for applications with lots of uncontended locked objects. On the IBM Power Systems™ platform, we have observed improvements of up to 12% on some big data queries that are part of the [TPCDS suite](https://relational.fit.cvut.cz/dataset/TPCDS).

We've also made improvements to several cryptographic algorithms on the IBM Power Systems platform with almost a 6x performance improvement when verifying with the ECDSA algorithm and a 10-20% improvement when signing with the RSA, ECDH, and ECDSA algorithms.

OpenJ9 Version 0.20.0 also contains a few improvements to existing command line options, some of which change behavior, so make sure you read the [Version 0.20.0 release notes](https://www.eclipse.org/openj9/docs/version0.20/). If you are obtaining OpenJDK 8 or 11 from the AdoptOpenJDK community, you should also read the [Version 0.19.0 release notes](https://www.eclipse.org/openj9/docs/version0.19/) to learn about all the other features and changes in the VM since their last OpenJDK 8 and 11 binaries were made available.