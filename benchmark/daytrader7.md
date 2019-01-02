<!--
Copyright (c) 2017, 2019 IBM Corp. and others

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

# OpenJDK 8 performance with Eclipse OpenJ9

**Benchmark testing demonstrates significantly better performance for OpenJDK 8 when using the Eclipse OpenJ9 VM, than with the Hotspot VM - just as for OpenJDK 9.**

Many different metrics exist to measure the performance of an application including startup time, ramp up time, footprint, response time, as well as throughput. At Eclipse OpenJ9, we keep a watchful eye on all of these metrics, making sensible tradeoffs and providing tuning options that allow the virtual machine (VM) to be optimized for different workloads.

Our original tests were carried out with OpenJDK version 9, but as most Java users have not yet migrated to version 9, we have taken the opportunity to re-evaluate the performance of OpenJ9 when running OpenJDK version 8 using the same metrics as before, namely footprint after start up and during ramp up, start-up time, throughput, and ramp-up time.

The results for OpenJDK 8 with OpenJ9 are very much in line with our previous tests using OpenJDK 9, and both demonstrate a significantly better performance than when using the Hotspot VM.

Take a look at these results:

- [66% smaller footprint after startup](#memory-footprint-after-startup)
- [63% smaller footprint during ramp up](#memory-footprint-during-ramp-up)
- [42% faster startup time](#startup-time)
- [Comparable throughput](#throughput)
- [Significantly faster ramp up time in a CPU constrained environment](#ramp-up-time-in-cpu-constrained-environments)

For the evaluation of OpenJDK 8, we used the Daytrader 7 benchmark (download from [GitHub](https://github.com/wasdev/sample.daytrader7)). Although Daytrade 3, which we used previously, is an application conforming to the Java EE 6 specification, Daytrader 7 has been re-designed to use the latest Java EE 7 features, including the new WebSockets specification. Thus, we feel that the new benchmark is more representative of the types of Java applications and technologies in use today and therefore more relevant to existing Java users.

While the specific levels of performance shown in these tests might change from benchmark to benchmark or even from machine to machine, the same trends are expected to hold for a large class of server-type applications.



## Memory footprint after startup

OpenJ9 is highly optimized for cloud workloads. The memory footprint (Resident Set Size) is around a third the size of other VM implementations.

![The explanation for this graph is provided in the surrounding text.](../assets/perf_v8_startup_footprint.png)

**Fig 1.** *DayTrader 7 footprint size after start up with a maximum Java heap size set to 1 GB. Comparison between OpenJDK 8 with Hotspot and OpenJDK 8 with OpenJ9.*

Immediately after startup OpenJDK 8 with OpenJ9 showed a footprint size about 66% less than OpenJDK 8 with Hotspot.

When OpenJ9 was tested with AOT enabled, and with AOT and `-Xquickstart` enabled, the footprint size remained at around 66% less than Hotspot.



## Memory footprint during ramp up

![The explanation for this graph is provided in the surrounding text.](../assets/perf_v8_ramp_footprint.png)

**Fig 2.** *DayTrader 7 footprint size during ramp up with a maximum Java heap size set to 1 GB. Comparison between OpenJDK 8 with Hotspot and OpenJDK 8 with OpenJ9.*

In all three scenarios, memory footprint (Resident Set Size) increased abruptly when load was applied to the system (time = 0). But at steady state, OpenJDK 8 with OpenJ9 was found to use approximately 63% less physical memory than OpenJDK 8 with HotSpot. This difference is even more striking than in the experiments with OpenJDK 9. This can be attributed to the ParallelGC collector used by default in OpenJDK 8 with HotSpot which is less memory efficient than the G1GC collector used in OpenJDK 9 with HotSpot.

Enabling AOT on the OpenJ9 VM made almost no difference to these results.



## Startup time

Shared classes and Ahead-of-Time (AOT) technologies typically reduce startup time while improving the overall ramp-up time of applications. As a developer you can achieve even faster startup times by using `-Xquickstart` mode as well.

![The explanation for this graph is provided in the surrounding text.](../assets/perf_v8_startup_time.png)

**Fig 3.** *DayTrader 7 startup time with a maximum Java heap size set to 1 GB. Comparison between OpenJDK 8 with Hotspot and OpenJDK 8 with OpenJ9.*

With AOT enabled, startup time for OpenJDK 8 with OpenJ9 is 36% lower than Hotspot. Moreover, with AOT enabled and using the `-Xquickstart` option, start-up time for OpenJ9 is almost 42% lower than Hotspot.



## Throughput

![The explanation for this graph is provided in the surrounding text.](../assets/perf_v8_ramp_throughput.png)

**Fig 4.** *DayTrader 7 throughput during ramp up with a maximum Java heap size set to 1 GB. Comparison between OpenJDK 8 with Hotspot and OpenJDK 8 with OpenJ9.*

Although both OpenJDK 8 with OpenJ9 and OpenJDK 8 with Hotspot reach a similar peak throughput, OpenJDK 8 with OpenJ9 reaches the peak about 1 minute faster. The small amount of AOT code (8 MB) does not make a difference in this case.



## Ramp up time in CPU-constrained environments

Virtualization is heavily used in the cloud to split big computing machines into many smaller VM guests. These guests are typically provisioned with a small number of virtual CPUs in order to achieve a high application density and to control the resources dedicated to applications. One side-effect is that Java applications can take longer to ramp-up because JIT compilation threads compete with application threads over the more limited computing resources.

OpenJ9 offers a couple of solutions to this problem:

### Use a large shared class cache and dynamic Ahead-of-Time (AOT) compilation

Loading AOT compiled code from the shared classes cache is typically 100x faster than compiling the same methods with the JIT compilation process. Although this achieves a very fast ramp up, you might normally expect some throughput loss (10-30%) because the code quality of an AOT compiled method is lower. However, the OpenJ9 JIT compiler has two tricks to counteract this problem:

- JIT heuristics limit the generation of AOT code only to the start-up phase of an application.
- The JIT detects the AOT compiled methods that are important to performance and upgrades them through the normal JIT recompilation process.

### Use `-Xtune:virtualized` on the Java command line

When the `-Xtune:virtualized` option is enabled, the JIT compiler is less aggressive in its optimizations, which uses fewer CPU resources. In addition, the mechanism that is responsible for recompiling important methods at higher optimization levels is significantly subdued. The net effect is a 20-30% reduction in the amount of CPU used by the JIT compiler, at the expense of a small (2-3%) loss in throughput. On the positive side there is also a small reduction in footprint (1-3%).

Here are the results of our tests:

![The explanation for this graph is provided in the surrounding text.](../assets/perf_v8_ramp_footprint_1core.png "title")

**Fig 5.** *DayTrader 7 throughput during ramp up with a maximum Java heap size set to 1 GB and the VM pinned to 1 core. Comparison between OpenJDK 8 with Hotspot and OpenJDK 8 with OpenJ9.*

Without any additional configuration set, OpenJ9 already ramps up much better than HotSpot. Although we haven't shown it on the graph, HotSpot needs about 30 minutes to reach its peak throughput; in contrast, OpenJ9 needs only 8.5 minutes!

With our recommended configuration for the cloud, the ramp-up curve for OpenJ9 improves substantially compared to its default settings. While OpenJ9 with default settings obtains a higher throughput in the end, it takes a full 5 minutes to equal the peak throughput of our configured OpenJ9. The lower peak throughput seen in the chart results from the use of a lot of AOT-compiled code, which is less optimized, and the presence of `-Xtune:virtualized`, which prevents most recompilations.

The total work done by the VM after load is applied, is represented by the area under the curve. The results show that our cloud configuration performs more work than the default OpenJ9 configuration and much more work than Hotspot in the first 12 minutes. Therefore, configuring OpenJ9 to use AOT and `-Xtune:virtualized` is an excellent solution for short lived VM running in a CPU-constrained environment.

## Benchmark testing details

If you want to learn more about the system environment and the process that we used to collect the measurements, read on.

### System under test

- Desktop machine using one Intel(R) Core(TM) i7-3770K CPU @ 3.50GHz
- 16GB RAM
- HyperThreading enabled, yielding 8 hardware threads.
- CentOS 7.4 operating system

### Benchmark application

Tests were performed using the Daytrader7 application, which models an online stock trading system. Daytrader7 was installed on top of OpenLiberty 17.0.0.4. 

### OpenJDK binaries

For the performance comparison, the following JDKs were obtained from AdoptOpenJDK:

- OpenJDK9 with OpenJ9 (OpenJDK8-OPENJ9_x64_Linux_20181601 build) with the following version information:
        openjdk version "1.8.0-internal"
        OpenJDK Runtime Environment (build 1.8.0-internal-jenkins_2018_01_16_13_02-b00)
        Eclipse OpenJ9 VM (build 2.9, JRE 1.8.0 Linux amd64-64 Compressed References 20180116_47 (JIT enabled, AOT enabled)
        OpenJ9   - 2de1f99
        OMR      - e300a85
        OpenJDK  - daa5b5c based on )

- OpenJDK9 with Hotspot (OpenJDK8_x64_Linux_20181601 build) with the following version information:

        openjdk version "1.8.0-internal"
        OpenJDK Runtime Environment (build 1.8.0-internal-jenkins_2018_01_16_17_03-b00)
        OpenJDK 64-Bit Server VM (build 25.71-b00, mixed mode)

### Test environment

- The persistence layer was ensured by Db2, which was running on a separate machine.
- The workload generator, JMeter, was set up on a further machine.
- The two machines were connected to the system under test by 10 GB Ethernet.

### Test process - how the tests were performed and interpreted.

- For ramp up curves, which illustrate application throughput, the load is applied continuously for 30 minutes using 50 jmeter threads.
- For start-up experiments, the start-up time is the time needed for OpenLiberty to print "Liberty is ready to run a smarter planet". At this point, there is no load applied to the system.
- The reported footprint is the Resident Set Size (RSS) of the Java process, as reported by Linux with the command: `ps -orss --no-headers -–pid JvmPid`.
- For ramp up curves, footprint values are read every 10 seconds.
- For startup experiments, the footprint values are read just after OpenLiberty has finished starting.
- For startup experiments, the VM was pinned to 4 hardware threads residing on 2 cores; for ramp up experiments, the VM was pinned to 4 hardware threads residing on 4 different cores.

Additional runs were performed for OpenJDK 8 with OpenJ9 with additional VM tuning parameters:

- Ahead-Of-Time (AOT) enabled: Options `-Xshareclasses -Xscmx60M -Xscmaxaot8M`
- AOT and JIT compiler optimizations: Options `-Xshareclasses -Xscmx60M -Xscmaxaot8M -Xquickstart`

When AOT was enabled, the values set reflect the default settings in OpenLiberty. All performance numbers with AOT enabled were collected with a shared class cache populated by a previous 'cold' run, which is not included in the measurements.

### Testing in a CPU-constrained environment

To simulate a CPU constrained environment in the cloud, the VM process was pinned to a single core. For OpenJ9 with AOT and `-Xtune:virtualized`, the following command line options were set: `-Xscmx150M -Xscmaxaot120m -Xtune:virtualized`.
