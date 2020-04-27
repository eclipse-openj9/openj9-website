# OpenJ9 Development

The OpenJ9 website is built with [Gatsby.js](https://www.gatsbyjs.org/). See the Gatsby [quick start guide](https://www.gatsbyjs.org/docs/quick-start) for the basics.

## Prerequisites

- **Node 10+**
  Download Node.js from https://nodejs.org/en/

- [**Gatsby.js**](https://www.gatsbyjs.org)
  When Node is installed, run the following command to install Gatsby.js:

  ```bash
    npm install -g gatsby-cli
  ```

- **Install Node dependencies** Clone the website Git repo and install the dependencies with the following commands:

  ```bash
    git clone https://github.com/eclipse/openj9-website.git
    cd website

    npm install
  ```

## Developing locally

1. Run the development server:

```bash
gatsby develop
```

This command compiles your changes as you develop and hosts the website at http://localhost:8000. To explore GraphQL queries that Gatsby exposes, use http://localhost:8000/__graphql.

:pencil: **Note about clearing your Cache:**
Sometimes when developing locally, the website shows cached content from previous versions of the website. To clear the cache before developing, run the following command:

```bash
gatsby clean
```

## Update Latest release section
Open `news-page-content/productUpdates.md` and edit it as required and this will automatically be converted to HTML during the build.

## Update Performance Page
1. Add a new image inside a `src/images`
2. Add an import statement to the top of the `src/pages/performance.js` file:
    ```
    import <your-image-name> from "../images/<your-image-file-name>";
    ```
3. Add a new `performanceCard` component to the list of performance cards found in `src/pages/performance.js`.  
Here is a template for you to use:
    ```
    <PerformanceCard 
      image={<your-image-name>}
      heading="Heading for performance card"
      flex="0 0 250px" // do not edit
      primary={true} // do not edit
    > 
      <p>This is the description for performance card.</p>
    </PerformanceCard>
    ```
4. When adding a new card in the list order matters. So, if you add a component at the end of the list, the performance card will appear last in the list.





