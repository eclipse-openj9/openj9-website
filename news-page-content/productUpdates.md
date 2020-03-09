### Eclipse OpenJ9 version 0.19.0 released    

*17 March 2020*

OpenJ9 version 0.19.0 supports only OpenJDK version 14, the latest release of the Java SE Platform. OpenJDK builds that contain Eclipse OpenJ9 version 0.19.0 are now available from the AdoptOpenJDK community project: 

[OpenJDK version 14](https://adoptopenjdk.net/releases.html?variant=openjdk14&jvmVariant=openj9)

As well as providing support for the latest release of OpenJDK, here are some of the new features and other changes that we've introduced in version 0.19.0 of OpenJ9.

Do let us know how well these work for you by posting in our [slack workspace](https://join.slack.com/t/openj9/shared_invite/enQtNDU4MDI4Mjk0MTk2LWVhNTMzMGY1N2JkODQ1OWE0NTNmZjM4ZDcxOTBiMjk3NGFjM2U0ZDNhMmY0MDZlNzU0ZjAyNzQ1ODlmYjg3MjA)

+ There are a number of performance improvements in this releases, including:
    - Up to 10% better application rampup on multi-CPU systems due to the invocation count threshold being lowered for JIT compilation, when shared classes are not in use.
    - Improvements to the class relationship verifier (originally released in version 0.17.0) with shared classes have seen a doubling of the performance benefit from the option
+ A new command line option, *-XX:+PrintCodeCache*, allows you to print the code cache memory usage to *stderr* when the VM shuts down.

+ A 1 G *char[]* or larger *StringBuffer* and *StringBuilder* now immediately grows to the maximum possible size for *all* current versions of Java, including OpenJDK 8. For OpenJDK 8 only, you can revert to the previous behavior of growing only as much as necessary to accommodate the *String* being added, by using the option *-Djava.lang.stringBuffer.growAggressively=false*.

+ The **jpackage** utility is described in JEP 343 as a tool that "packages a Java application into a platform-specific package that includes all of the necessary dependencies." Full details of the tool are available at [JEP 343: Packaging Tool](https://openjdk.java.net/jeps/343) Be aware that **jpackage** is supported on only the following OpenJ9 platforms: Linux&reg;, macOS&reg;, and Windows&trade;. It is *not* supported on AIX&reg; or z/OS&reg; platforms.

+ Windows Server 2019 is now a supported platform for OpenJDK 8, 11, and 14.

To read more about the changes in version 0.19.0, see the [Release notes](https://www.eclipse.org/openj9/docs/version0.19/) in the OpenJ9 user documentation, which will also give you detailed information about the options mentioned here.
