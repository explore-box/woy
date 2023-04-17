# Contributing to Woy

Thank you for your interest in contributing to Woy - Password manager! Your help in making this project better is much appreciated.

<br/>

## Getting Started

Before you begin contributing, please read the [README](README.md) file to understand the project and its goals. If you have any questions, feel free to ask in the Issues section.

<br/>

### Prerequisites

- Flutter
- NPM
- NodeJS

<br/>

To set up the project locally, follow these steps:

- Clone the repository:
  ```bash
    git@github.com:sonibble/woy.git
  ```
- Now open your code editor, You will find two main directory in this project. One for web that build using `NEXTJS` and Mobile is build using `Flutter`
- To start into web platform run this command to start the developemnt server
  ```bash
    cd web
    npm run install --legacy-peer-deps --silent
    npm run dev
  ```
- To start the mobile platform run this command to start running application in mobile.
  ```bash
    flutter pub get
    flutter run
  ```

<br/>

## Issues and Pull Requests

If you find a bug or have a feature request, please create an issue in the issue tracker before starting work on it. This will ensure that the issue is not already being worked on by someone else, and will allow other contributors to provide feedback and suggestions.

If you want to contribute code, please fork the repository and submit a pull request. Make sure your pull request:

- Addresses an open issue.
- Follows the Code of Conduct of the project.
- Adheres to the project's Code Style.
- Includes a description of the changes made in the pull request.

<br/>

## Code Style

Please follow the existing code style in the project. This includes things like indentation, naming conventions, and comments. We use monorepo concept for this project. So the all source code for app is being one place.

<br/>

## Testing

Please make sure your code passes all tests before submitting a pull request.

<br/>

## Security

If you find a security vulnerability in the project, please do not create an issue. Instead, contact the maintainers directly at [@nyomansunima@gmail.com](mailto:nyomansunima@gmail.com) to report the issue.

<br/>

# Code of Conduct

Please note that we have a Code of Conduct in place. We expect all contributors to follow it in all interactions with the project. You can read more detail [here](CODE_OF_CONDUCT.md)

<br/>

# License

By contributing to Woy, you agree that your contributions will be licensed under the ISC license. You can read more [here](LICENSE.md)
