# Article Imager

Article Imager is an open-source app build on the [t3-stack](https://github.com/t3-oss/create-t3-app) that generates relevant images when given an article URL using the DALL-E 2 engine. This app is built to simplify the process of finding copyright free images for articles, thus saving time, effort and money for content journalists and content creators.

# Features

- Generates relevant copyright free images for articles using the DALL-E 2 stable diffusion image generator
- User-friendly interface with Discord authentication
- Easy to integrate into any website or blog

# Usage
For usage instructions, please refer to the project's documentation on GitHub.

# Installation

To install the dependencies for Article Imager, you will need to have Node.js and npm installed on your machine.

1. Clone the repository to your local machine using `git clone https://github.com/yourusername/Article-Imager.git`
2. Navigate to the project directory using `cd Article-Imager`
3. Run `npm install` in your command line to install all the necessary dependencies.
4. Run `npm run dev` to start up the application in development mode.

# Environment Variables
Article Imager uses a database to store user information and the OpenAI API to generate relevant images. In order to use the app, you will need to set the following environment variables:

`DATABASE_URL`: The URL for the database that Article Imager will use to store user information. PostgreSQL is recommended, but will work with any database if you update the prisma schema.

`NEXTAUTH_SECRET`: A secret used for Next Auth, which is used for user authentication. You can generate the secret via 'openssl rand -base64 32' on Linux.

`NEXTAUTH_URL`: The URL for Next Auth, which is used for user authentication. Use `http://localhost:[Port]` in development mode, and the deployed url when deployed.

`DISCORD_CLIENT_ID`: The application client ID for the Discord Provider, which is used for user authentication. To create a new discord application, navigate [here](https://discord.com/developers/applications).

`DISCORD_CLIENT_SECRET`: The client secret for the Discord Provider, which is used for user authentication.

`OPENAI_API_KEY`: The API key for the OpenAI API, which is used to generate relevant images. To generate a new API key, navigate [here](https://beta.openai.com/docs/api-reference/introduction)

You can set these environment variables in a .env file in the root of the project directory, or set them in your operating system's environment variable settings.

Once you have set the environment variables, you can start the app by running npm start in the project directory.

# Contributing
We welcome contributions to Article Imager. If you're interested in contributing, please take a look at our CONTRIBUTING.md file for more information.

# Licence
Article Imager is licensed under the MIT License.

# Contact
If you have any questions or suggestions, feel free to contact us at email or open an issue on GitHub.
