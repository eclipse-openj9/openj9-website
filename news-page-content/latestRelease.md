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

### Eclipse OpenJ9 version 0.37.0 released

April 2023
 
We're pleased to announce the availability of Eclipse OpenJ9&trade; v0.37.0.
 
This release works with OpenJDK version 19. OpenJDK 19 is out of support at the time of the 0.37.0 release. Builds of 0.37.0 should not be used in production and might contain known security vulnerabilities as of 18 April 2023. For more information about supported platforms and OpenJDK versions,
see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

Other updates in this release include the following:
 
- Linux&reg; builds for platforms Linux x86 64-bit, Linux on POWER&reg; LE 64-bit, and Linux on IBM Z&reg; 64-bit now use gcc 11.2 instead of gcc 10.3. Linux AArch64 64-bit continues to use the gcc 10.3 compiler.
- The OpenJ9 ThreadMXBean interface extends the [com.sun.management.ThreadMXBean](https://docs.oracle.com/javase/8/docs/jre/api/management/extension/com/sun/management/ThreadMXBean.html) interface instead of the java.lang.management.ThreadMXBean interface.
- OpenJ9 now supports the use of an extra attribute, `tokenlabel`, in the SunPKCS11 configuration file on z/OS&reg; and Linux on IBM Z to assign a label to a PKCS#11 token. The `tokenlabel` attribute can be used instead of the `slot` or `slotListIndex` attributes.

To read more about these and other changes, see the [OpenJ9 user documentation](https://www.eclipse.org/openj9/docs/openj9_releases/).
 
#### Performance highlights include:
 
-  With the implementation of CRC-32C polynomial acceleration on Linux on POWER LE (ppc64le) and AIX POWER&reg; BE (ppc64), performance of CRC-32C calculations on these platforms is 25 times faster (even up to 42 times faster) on data payload of typical sizes.
