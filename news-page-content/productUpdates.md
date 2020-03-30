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

### Eclipse OpenJ9 version 0.19.0 released   

*17 March 2020*

OpenJ9 version 0.19.0 supports only OpenJDK version 14, the latest release of the Java SE Platform. OpenJDK builds that contain Eclipse OpenJ9 version 0.19.0 are now available from the AdoptOpenJDK community project:

[OpenJDK version 14](https://adoptopenjdk.net/releases.html?variant=openjdk14&jvmVariant=openj9)

As well as providing support for the latest release of OpenJDK, here are some of the new features and other changes that we've introduced in version 0.19.0 of OpenJ9.

Do let us know how well these work for you by posting in our [slack workspace](https://openj9.slack.com/join/shared_invite/enQtNDU4MDI4Mjk0MTk2LWVhNTMzMGY1N2JkODQ1OWE0NTNmZjM4ZDcxOTBiMjk3NGFjM2U0ZDNhMmY0MDZlNzU0ZjAyNzQ1ODlmYjg3MjA)

+ There are a number of performance improvements in this releases, including:
    - Up to 10% better application rampup on multi-CPU systems due to the invocation count threshold being lowered for JIT compilation, when shared classes are not in use.
    - Improvements to the class relationship verifier (originally released in version 0.17.0) with shared classes have seen a doubling of the performance benefit from the option *-XX:+ClassRelationshipVerifier*.
+ A new command line option, *-XX:+PrintCodeCache*, allows you to print the code cache memory usage to stderr when the VM shuts down.

+ A 1 G *char[]* or larger *StringBuffer* and *StringBuilder* now immediately grows to the maximum possible size for *all* current versions of Java, including OpenJDK 8. For OpenJDK 8 only, you can revert to the previous behavior of growing only as much as necessary to accommodate the *String* being added, by using the option *-Djava.lang.stringBuffer.growAggressively=false*.

+ The **jpackage** utility is described in JEP 343 as a tool that "packages a Java application into a platform-specific package that includes all of the necessary dependencies." Full details of the tool are available at [JEP 343: Packaging Tool](https://openjdk.java.net/jeps/343) Be aware that **jpackage** is supported on only the following OpenJ9 platforms: Linux&reg;, macOS&reg;, and Windows&trade;. It is *not* supported on AIX&reg; or z/OS&reg; platforms.

To read more about the changes in version 0.19.0, see the [Release notes](https://www.eclipse.org/openj9/docs/version0.19/) in the OpenJ9 user documentation, which will also give you detailed information about the options mentioned here.
