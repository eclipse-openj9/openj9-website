/*******************************************************************************
 * Copyright (c) 2017, 2024 IBM Corp. and others
 *
 * This program and the accompanying materials are made available under
 * the terms of the Eclipse Public License 2.0 which accompanies this
 * distribution and is available at https://www.eclipse.org/legal/epl-2.0/
 * or the Apache License, Version 2.0 which accompanies this distribution and
 * is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * This Source Code may also be made available under the following
 * Secondary Licenses when the conditions for such availability set
 * forth in the Eclipse Public License, v. 2.0 are satisfied: GNU
 * General Public License, version 2 with the GNU Classpath
 * Exception [1] and GNU General Public License, version 2 with the
 * OpenJDK Assembly Exception [2].
 *
 * [1] https://www.gnu.org/software/classpath/license.html
 * [2] https://openjdk.org/legal/assembly-exception.html
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0 OR GPL-2.0-only WITH OpenJDK-assembly-exception-1.0
 *******************************************************************************/

REPO = 'github.com/eclipse-openj9/openj9-website-publish'
BRANCH = (params.BRANCH) ?: 'staging'
CREDENTIAL_ID = 'github-bot'

timeout(time: 3, unit: 'HOURS') {
    timestamps {
        stage('Queue') {
            node('hw.arch.x86 && sw.tool.docker && sw.os.linux') {
                try {
                    stage('Checkout') {
                        checkout scm
                    }
                    def my_image
                    stage('Docker Build') {
                        my_image = docker.build "openj9-website"
                    }
                    stage('Website Build') {
                        my_image.inside {
                            sh """
                            git config user.email "openj9-bot@eclipse.org"
                            git config user.name "genie-openj9"
                            git status
                            """
                            sh "npm install"
                            stage('Website Deploy') {
                                withCredentials([usernamePassword(credentialsId: CREDENTIAL_ID, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                    sh "REPO=https://${USERNAME}:${PASSWORD}@${REPO} BRANCH=${BRANCH} npm run deploy"
                                }
                            }
                        }
                    }
                } finally {
                    cleanWs()
                    sh "docker system prune -af"
                }
            }
        }
    }
}
