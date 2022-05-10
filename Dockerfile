###############################################################################
 # Copyright (c) 2017, 2022 IBM Corp. and others
 #
 # This program and the accompanying materials are made available under
 # the terms of the Eclipse Public License 2.0 which accompanies this
 # distribution and is available at https://www.eclipse.org/legal/epl-2.0/
 # or the Apache License, Version 2.0 which accompanies this distribution and
 # is available at https://www.apache.org/licenses/LICENSE-2.0.
 #
 # This Source Code may also be made available under the following
 # Secondary Licenses when the conditions for such availability set
 # forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
 # General Public License, version 2 with the GNU Classpath
 # Exception [1] and GNU General Public License, version 2 with the
 # OpenJDK Assembly Exception [2].
 #
 # [1] https://www.gnu.org/software/classpath/license.html
 # [2] http://openjdk.java.net/legal/assembly-exception.html
 #
 # SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
 ###############################################################################

FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl npm git
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
&& apt-get install -y nodejs \
&& npm install -g gatsby-cli

# Add Jenkins user with ID 1001 to match ubuntu hosts. This prevents permission problems.
# Do not verify git.eclipse.org. I cannot get ssh-keyscan to return anything.
RUN groupadd -r jenkins \
&& useradd -rm -u 1000 -g jenkins jenkins \
&& mkdir -p /home/jenkins/.ssh \
&& echo "Host git.eclipse.org*\n\tStrictHostKeyChecking no\n" > /home/jenkins/.ssh/config \
&& chown -R jenkins:jenkins /home/jenkins
