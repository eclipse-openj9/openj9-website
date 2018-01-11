<!--
Copyright (c) 2017, 2018 IBM Corp. and others

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
-->
 
Measuring the strengths of OpenJDK with Eclipse OpenJ9
======================================================

***Performance is not just throughput!***

Many different metrics exist to measure the performance of an application including startup time, ramp up time, footprint, response time, as well as throughput. At Eclipse OpenJ9, we keep a watchful eye on all of these metrics, making sensible tradeoffs and providing tuning options that allow the JVM to be optimized for different workloads.

To showcase our performance pedigree we set about measuring the strengths of OpenJDK with Eclipse OpenJ9 compared to an OpenJDK with Hotspot. We chose the DayTrader 3 application because it is meaningful to measure different performance metrics, unlike many microbenchmarks that focus almost exclusively on throughput. The metrics we focused on include startup time, the JVM footprint size during the experiment, and of course, throughput.

Take a look at these charts:

- [40% less footprint during ramp up](#footprint-during-ramp-up)
- [60% less footprint after startup](#footprint-after-startup)
- [2x faster startup time](#startup-time)
- [Comparable throughput](#throughput)

In a further experiment we tuned Eclipse OpenJ9 for an environment with constrained resources, much like you'd find in a standard cloud deployment. In this scenario, OpenJ9 ramped up 4x faster than Hotspot, performing far more work during the first 8 minutes. An excellent option for short-lived applications in the cloud that are sensitive to response times!

Read more about this experiment:

- [4x faster ramp up time - Tuning OpenJ9 for a CPU-constrained environment in the cloud ](#tuning-openj9-for-a-cpu-constrained-environment-in-the-cloud)

### Footprint during ramp up


![The explanation for this graph is provided in the surrounding text.](../assets/perf_rss_ramp_xmx1g_2.png)

**Figure.1** DayTrader 3 footprint size during ramp up with a maximum Java heap size set to 1 GB. Comparison between **OpenJDK 9 with Hotspot** and **OpenJDK 9 with OpenJ9**.

In all three scenarios, memory footprint (Resident Set Size) increased abruptly when load was applied to the system (time = 0), but more or less settled after about 3 minutes. OpenJDK with HotSpot was found to use approximately 80% more physical memory than OpenJDK with OpenJ9. Enabling AOT on the OpenJ9 VM made almost no difference to the results.

### Footprint after startup

![The explanation for this graph is provided in the surrounding text.](../assets/perf_startup_footprint_xmx1g_2.png)

**Figure 2.** DayTrader 3 footprint after startup with a maximum Java heap size set to 1 GB. Comparison between **OpenJDK 9 with Hotspot** and **OpenJDK 9 with OpenJ9**.

Immediately after startup OpenJ9 shows a footprint size of around 60% less than Hotspot. When OpenJ9 was tested with AOT enabled, and with AOT and -Xquickstart enabled, the footprint size remained at around 60% less than Hotspot.

### Startup time

![The explanation for this graph is provided in the surrounding text.](../assets/perf_startup_xmx1g_2.png)

**Figure 3.** DayTrader 3 startup time with a maximum Java heap size set to 1 GB. Comparison between **OpenJDK 9 with Hotspot** and **OpenJDK 9 with OpenJ9**.

With no command line options OpenJ9 shows a slightly longer startup time than Hotspot. However, with AOT enabled, startup time for OpenJ9 is almost 40% lower than Hotspot. Moreover, with AOT enabled and -Xquickstart, startup time for OpenJ9 is almost 50% lower than Hotspot.

### Throughput

![The explanation for this graph is provided in the surrounding text.](../assets/perf_thr_ramp_xmx1g_2.png)

**Figure 4.** DayTrader 3 throughput during ramp up with a maximum Java heap size set to 1 GB. Comparison between **OpenJDK 9 with Hotspot** and **OpenJDK 9 with OpenJ9**.

Although both OpenJ9 and Hotspot reach a similar peak throughput, OpenJ9 reaches the peak about 7 minutes faster. The small amount of AOT code (8 MB) does not make a difference in this case.

### So how did we do overall?

While the specific levels of performance shown in the graphs might change from benchmark to benchmark or even from machine to machine, the same trends are expected to hold for a large class of server type applications.

OpenJ9 achieves a good balance between (often conflicting) performance metrics. As seen above, it offers excellent footprint savings and faster start-up time with the help of AOT technology while also delivering throughput performance that is competitive with Hotspot.

Due to its low memory footprint, OpenJ9 is particularly well suited for cloud computing environments where memory savings translate into cost savings for cloud users and providers alike.

## Tuning OpenJ9 for a CPU-constrained environment in the cloud

Virtualization is heavily used in the cloud to split big computing machines into many smaller VM guests. These guests are typically provisioned with a small number of virtual CPUs in order to achieve a high application density and to control the resources dedicated to applications. One side-effect is that Java applications can take longer to ramp-up because JIT compilation threads compete with application threads over the more limited computing resources. OpenJ9 offers a couple of solutions to this problem:

**Use a large shared class cache and dynamic Ahead-of-Time (AOT) compilation**

Loading AOT compiled code from the shared classes cache is typically 100x faster than compiling the same methods with the JIT compilation process. Although this achieves a very fast ramp up, some throughput loss (10-30%) would normally be expected because the code quality of an AOT compiled method is lower. However, the OpenJ9 JIT compiler has two tricks to counteract this problem:

1. JIT heuristics limit the generation of AOT code only to the start-up phase of an application.
2. The JIT detects the AOT compiled methods that are important to performance and upgrades them through the normal JIT recompilation process.

**Use -Xtune:virtualized on the Java command line**

When `-Xtune:virtualized` is enabled, the JIT compiler is less aggressive in its optimizations, which uses fewer CPU resources. In addition, the mechanism that is responsible for recompiling important methods at higher optimization levels is significantly subdued. The net effect is a 20-30% reduction in the amount of CPU used by the JIT compiler at the expense of a small 2-3% loss in throughput. On the positive side there is also a small reduction in footprint (1-3%).

Here are the results of our tests:

![The explanation for this graph is provided in the surrounding text.](../assets/perf_ramp_cloud_AOT_xtune.png)

**Figure 5.** DayTrader 3 throughput during ramp up. Comparison between **OpenJDK 9 with Hotspot**, **OpenJDK 9 with OpenJ9** (default settings), and **OpenJDK 9 with OpenJ9** with AOT and `-Xtune:virtualized`.

Without any additional configuration set, OpenJ9 already ramps-up much better than HotSpot. Although we haven't shown it on the graph, HotSpot needs about 30 minutes to reach its peak throughput; in contrast, OpenJ9 needs only 7.5 minutes!

With our recommended configuration for the cloud, the ramp-up curve for OpenJ9 improves substantially compared to its default settings. Whilst OpenJ9 with default settings obtains a higher throughput in the end, it takes a full 3 minutes to equal the peak throughput of our configured OpenJ9. The lower peak throughput seen in the chart results from the use of a lot of AOT-compiled code, which is less optimized, and the presence of `-Xtune:virtualized` prevents most recompilations.

The total work done by the JVM since load was applied is represented by the area under the curve. The results show that our cloud configuration performs more work than the default OpenJ9 configuration and much more work than Hotspot in the first 8 minutes of the run. Therefore, configuring OpenJ9 to use AOT and `-Xtune:virtualized` is an excellent solution for short lived JVMs running in a CPU constrained environment.

Click [here](http://www.eclipse.org/openj9) for the Eclipse OpenJ9 website.
___

### Benchmark testing details

If you want to learn more about the system environment and the process that we used to collect the measurements, read on.

**System under test:**
- Desktop machine using one Intel(R) Core(TM) i7-3770K CPU @ 3.50GHz
-	16GB RAM
-	HyperThreading enabled, yielding 8 hardware threads.
-	CentOS 7.3 operating system


**Benchmark application:**

Tests were performed using the [DayTrader 3  application](https://github.com/WASdev/sample.daytrader3), which models an online stock trading system. DayTrader 3 was installed on top of
[OpenLiberty](http://openliberty.io/downloads). However, due to a missing dependency, the public version of OpenLiberty is not capable of running DayTrader 3 with Java 9. This dependency, the ASM V6 library, which provides low-level bytecode manipulation capabilities, is expected to be included soon. For this experiment we used a private version of OpenLiberty with a beta version of ASM V6.

**OpenJDK binaries:**

For the performance comparison, the following JDKs were obtained from [AdoptOpenJDK](https://adoptopenjdk.net):


- OpenJDK9 with OpenJ9 (OpenJDK9-OPENJ9_x64_Linux_20172509 build) with the following version information:
```
OpenJDK Runtime Environment (build 9-internal+0-adhoc.jenkins.openjdk)
Eclipse OpenJ9 VM (build 2.9, JRE 9 Linux amd64-64 Compressed References 20170925_14 (JIT enabled, AOT enabled)
J9VM - 291a949
JIT  - 291a949
OMR  - 3271be8
OpenJDK  - a3670d2 based on jdk-9+181)
```
- OpenJDK9 with Hotspot (OpenJDK9_x64_Linux_20172509 build) with the following version information:
```
openjdk version "9-internal"
OpenJDK Runtime Environment (build 9-internal+0-adhoc.jenkins.openjdk)
OpenJDK 64-Bit Server VM (build 9-internal+0-adhoc.jenkins.openjdk, mixed mode)
```

**Test environment:**

- The persistence layer was ensured by **Db2**, which was running on a separate machine.
- The workload generator, **JMeter**, was set up on a further machine.
- The two machines were connected to the system under test by 10 GB Ethernet.

### Test process

This section covers how the tests were performed and interpreted.

- For ramp up curves, which illustrate application throughput, the load is applied continuously for 30 minutes using 50 jmeter threads.
-	For startup experiments, the startup time is the time needed for OpenLiberty to print "Liberty is ready to run a smarter planet". At this point, there is no load applied to the system.
-	The reported footprint is the Resident Set Size (RSS) of the Java process, as reported by Linux with the command: `ps  -orss --no-headers -–pid JvmPid`
-	For ramp up curves, footprint values are read periodically, every 10 seconds.
-	For startup experiments, the footprint values are read just after OpenLiberty has finished starting up.
-	For startup experiments, the JVM was pinned to 4 hardware threads residing on 2 cores; for ramp up experiments, the JVM was pinned to 4 hardware threads residing on 4 different cores.

Additional runs were performed for OpenJDK9 with OpenJ9 with additional JVM tuning parameters:

1.	Ahead-Of-Time (AOT) enabled: Options `-Xshareclasses -Xscmx60M -Xscmaxaot8M`
2.	AOT and JIT compiler optimizations: Options `-Xshareclasses -Xscmx60M -Xscmaxaot8M -Xquickstart`

When AOT was enabled, the values set reflect the default settings in OpenLiberty. All performance numbers with AOT enabled were collected with a shared class cache populated by a previous 'cold' run, which is not included in the measurements.

To run OpenLiberty with OpenJDK9 (either with HotSpot or OpenJ9) the following options were added to the Java command line:

```
--add-modules java.se.ee --add-exports jdk.management.agent/jdk.internal.agent=ALL-UNNAMED --add-exports java.base/jdk.internal.vm=ALL-UNNAMED --add-exports java.base/sun.security.action=ALL-UNNAMED --add-exports java.naming/com.sun.jndi.ldap=ALL-UNNAMED --add-exports java.xml.bind/com.sun.xml.internal.bind=ALL-UNNAMED --add-exports jdk.attach/sun.tools.attach=ALL-UNNAMED --add-reads java.base=ALL-UNNAMED --add-reads java.logging=ALL-UNNAMED --add-reads java.management=ALL-UNNAMED --add-reads java.naming=ALL-UNNAMED --add-reads java.rmi=ALL-UNNAMED --add-reads java.sql=ALL-UNNAMED --add-reads java.xml=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util.concurrent=ALL-UNNAMED --add-opens java.base/java.io=ALL-UNNAMED --add-opens java.naming/javax.naming.spi=ALL-UNNAMED --add-opens java.naming/javax.naming=ALL-UNNAMED --add-opens java.rmi/java.rmi=ALL-UNNAMED --add-opens java.sql/java.sql=ALL-UNNAMED --add-opens java.xml.bind/javax.xml.bind=ALL-UNNAMED --add-opens java.management/javax.management=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens java.desktop/java.awt.image=ALL-UNNAMED --add-opens java.base/java.security=ALL-UNNAMED
```

**Note:** Because DayTrader 3 is a Java EE 6 application and the public package of OpenLiberty does not include all the features needed to run the Java EE 6 spec, we had to change the Liberty [server.xml](server.xml) configuration file.

### Additional test information for tuning OpenJ9 for CPU-constrained environments in the cloud

To simulate a CPU constrained environment, the JVM process was pinned to a single core. The following command line options were set for OpenJ9 with AOT and `-Xtune:virtualized`:
```
-Xscmx150M -Xscmaxaot120m -Xtune:virtualized
```

Copyright (c) 2017, 2018 IBM Corp. and others

---

Click [here](http://www.eclipse.org/openj9) for the Eclipse OpenJ9 website.
