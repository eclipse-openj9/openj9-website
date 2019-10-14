// Copyright (c) 2017, 2019 IBM Corp. and others
// This program and the accompanying materials are made available under the terms of the Eclipse Public License 2.0 which accompanies this distribution and is available at http://eclipse.org/legal/epl-2.0 or the Apache License, Version 2.0 which accompanies this distribution and is available at https://www.apache.org/licenses/LICENSE-2.0. 
// This Source Code may also be made available under the following Secondary Licenses when the conditions for such availability set forth in the Eclipse Public License, v. 2.0 are satisfied: GNU General Public License, version 2 with the GNU Classpath Exception [1] and GNU General Public License, version 2 with the OpenJDK Assembly Exception [2]. 
// [1] https://www.gnu.org/software/classpath/license.html  
// [2] http://openjdk.java.net/legal/assembly-exception.html 
// SPDX-License-Identifier: EPL-2.0 OR Apache-2.0 OR GPL-2.0 WITH Classpath-exception-2.0 OR LicenseRef-GPL-2.0 WITH Assembly-exception
// The project website pages cannot be redistributed

import React from "react";
import * as loadScript from 'simple-load-script';
import { Helmet } from "react-helmet";

class Head extends React.Component {

    async componentDidMount() {
        await loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js', { inBody: true });
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', { inBody: true });
        await loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', { inBody: true });
    }

    render() {
        return (
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta charset="UTF-8"></meta>
                <title>OpenJ9 - Java virtual machine</title>
                <meta name="description" content="Eclipse OpenJ9 is a high performance, scalable, Java virtual machine implementation that is fully compliant with the Java Virtual Machine Specification." />
                <meta name="keywords" content="Eclipse, OpenJ9, Java virtual machine" />
                <meta property="og:title" content="OpenJ9 - Java virtual machine" />
                <meta property="og:type" content="website" />
            </Helmet>
        )
    }
}

export default Head;
