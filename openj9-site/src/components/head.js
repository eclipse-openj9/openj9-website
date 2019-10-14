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
