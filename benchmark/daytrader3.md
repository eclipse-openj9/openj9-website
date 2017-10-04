Measuring the strengths of OpenJDK with Eclipse OpenJ9
======================================================

***Performance is not just throughput!***

Many different metrics exist to measure the performance of an application including startup time, ramp up time, footprint, response time, as well as throughput. At Eclipse OpenJ9, we keep a watchful eye on all of these metrics, making sensible tradeoffs and providing tuning options that allow the JVM to be optimized for different workloads.

To showcase our performance pedigree we set about measuring the strengths of OpenJDK with Eclipse OpenJ9 compared to an OpenJDK with Hotspot. We chose the Daytrader3 application because it is meaningful to measure different performance metrics, unlike many microbenchmarks that focus almost exclusively on throughput. The metrics we focused on include startup time, the JVM footprint size during the experiment, and of course, throughput.

Take a look at these charts, which speak for themselves!


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

## So how did we do overall?

While the specific levels of performance shown in the graphs might change from benchmark to benchmark or even from machine to machine, the same trends are expected to hold for a large class of server type applications.

OpenJ9 achieves a good balance between (often conflicting) performance metrics. As seen above, it offers excellent footprint savings and faster start-up time with the help of AOT technology while also delivering throughput performance that is competitive with Hotspot.

Due to its low memory footprint, OpenJ9 is particularly well suited for cloud computing environments where memory savings translate into cost savings for cloud users and providers alike.

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

When AOT was enabled, the values set reflect the default settings in OpenLiberty. All performance numbers with AOT enabled were collected with a shared class cache populated by a previous 'cold' run, which was excluded from the measurements.

To run OpenLiberty with OpenJDK9 (either with HotSpot or OpenJ9) the following options were added to the Java command line:

`--add-modules java.se.ee --add-exports jdk.management.agent/jdk.internal.agent=ALL-UNNAMED --add-exports java.base/jdk.internal.vm=ALL-UNNAMED --add-exports java.base/sun.security.action=ALL-UNNAMED --add-exports java.naming/com.sun.jndi.ldap=ALL-UNNAMED --add-exports java.xml.bind/com.sun.xml.internal.bind=ALL-UNNAMED --add-exports jdk.attach/sun.tools.attach=ALL-UNNAMED --add-reads java.base=ALL-UNNAMED --add-reads java.logging=ALL-UNNAMED --add-reads java.management=ALL-UNNAMED --add-reads java.naming=ALL-UNNAMED --add-reads java.rmi=ALL-UNNAMED --add-reads java.sql=ALL-UNNAMED --add-reads java.xml=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util.concurrent=ALL-UNNAMED --add-opens java.base/java.io=ALL-UNNAMED --add-opens java.naming/javax.naming.spi=ALL-UNNAMED --add-opens java.naming/javax.naming=ALL-UNNAMED --add-opens java.rmi/java.rmi=ALL-UNNAMED --add-opens java.sql/java.sql=ALL-UNNAMED --add-opens java.xml.bind/javax.xml.bind=ALL-UNNAMED --add-opens java.management/javax.management=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens java.desktop/java.awt.image=ALL-UNNAMED --add-opens java.base/java.security=ALL-UNNAMED`

**Note:** Because Daytrader is a Java EE 6 application and the public package of OpenLiberty does not include all the features needed to run the Java EE 6 spec, we had to change the Liberty [server.xml](server.xml) configuration file.

---

Click [here](http://www.eclipse.org/openj9) for the Eclipse OpenJ9 website.
