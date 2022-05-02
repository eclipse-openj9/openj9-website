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

### Eclipse OpenJ9 version 0.32.0 released
April 2022

We're pleased to announce the availability of Eclipse OpenJ9 v0.32.0.

This release supports OpenJDK version 8, 11, 17, and 18. For more information about supported platforms and OpenJDK versions,
see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

This release includes an early access build for Apple Silicon (AArch64) macOS. You can use this build for evaluation purposes;
it is not yet suitable for use in production environments.

Other updates in this release include the following:

- The JITServer technology feature is now fully supported on Linux for IBM Z&reg; (64-bit)
- In Java 11 and later, the default value of the `-XX:MaxDirectMemorySize` option, which limits the amount of heap memory that is used for
direct byte buffers, is now the same as the maximum heap size. Previously, the limit was 87.5% of the maximum heap size.
- You can now use the `SharedClassStatistics` API to get the name, path, and directory of a shared classes cache.
Depending on the operating system, you can also get the number of attached VMs for a non-persistent cache.
This information is available through the following new methods: `cacheDir()`, `cacheName()`, `cachePath()`, and `numberAttached()`.
For more information, see the [API documentation](https://www.eclipse.org/openj9/docs/api-overview/).

To read more about these and other changes, see the [OpenJ9 user documentation](https://www.eclipse.org/openj9/docs/openj9_releases/).

#### Other performance highlights include exploitation of the new IBM&reg; z16&trade; hardware platform, for example:

- External decimal conversion acceleration with the Vector Packed Decimal Facility in the data access accelerator library
- Acceleration of the `Integer.toString()`, `Long.toString()`, and `BigDecimal.toString()` methods
