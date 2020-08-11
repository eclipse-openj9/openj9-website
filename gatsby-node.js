exports.createPages = ({ actions }) => {
    const {createRedirect} = actions

    // Redirects section

    createRedirect({ 
        fromPath: '/oj9_performance.html',
        toPath: '/performance',
        isPermanent: true 
    });

    createRedirect({ 
        fromPath: '/oj9_whatsnew.html',
        toPath: '/news',
        isPermanent: true 
    });
}