### Eclipse OpenJ9 version 0.27.0 released

*July 2021*

We're pleased to announce the availability of Eclipse OpenJ9 v0.27.0.

This release supports OpenJDK version 8, 11, and 16. For more information about supported platforms and OpenJDK versions, see [Supported environments](https://www.eclipse.org/openj9/docs/openj9_support/).

In this release, the following new options are added and enabled by default to improve performance:
- `-XX:[+|-]AdaptiveGCThreading` dynamically adjusts the garbage collection thread count to reduce collection pause times.
- `-Xgc:dynamicBreadthFirstScanOrdering` enables a new scan mode to improve performance of the `balanced` garbage collection policy.

Existing option `-XX:[+|-]GlobalLockReservation` (AIX and Linux on Power systems only), which improves the performance of locking and unlocking of Java&trade; objects, is now also enabled by default.

To read more about these and other changes, see the [OpenJ9 user documentation](docs/openj9_releases/).

**Other performance highlights**

- The performance of method invocation via reflection is improved by reducing stack walking overhead related to access checking associated with that API.
- The JIT compiler includes several incremental throughput improvements related to the warm hotness level and loop handling.
- On AArch64, the JIT compiler provides incremental performance improvements for applications generally, including: reducing Java synchronization overhead, improving array access performance in loops, and increased virtual and JNI method dispatch performance.
- New POWER10 hardware features are exploited to improve application path length and the performance of various array and byte operations.
