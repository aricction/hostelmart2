
# Hostel Mart

An online platform designed to streamline the process of
buying and selling essential items for students living in hostel .
The platform serves as a marketplace where 1st year and final
year students can easily find , purchase and sell items they
need for their room.
It would also help final year students to sell large size
items(which they arent able to take home) to sell it to other
needful students.


## Installation

Install latest Node version For running the website , install the node_modules from package manager run command on root directory in terminal.

Npm i
## Getting started

 Run the following cmd in a terminal
 
  npm start

After installation , the application should run on localhost:3000, User can Register before entering shopping.

The user itself can Ad their own post , inside the profile page.


## Replacing the firebase configuration

Step 1: Create a Firebase Project
Go to the Firebase Console.
Click on the "Add project" button.
Enter your project name and select your country/region, then click "Continue".
Follow the prompts to accept the terms and create your project.

Step 2: Set Up Firebase Authentication
Firebase Authentication allows you to authenticate users to your app.

In the Firebase Console, navigate to the "Authentication" section.
Click on the "Get started" button and choose the authentication methods you want to enable (e.g., Email/Password, Google Sign-in, etc.).
Follow the setup instructions for each authentication method.

Step 3: Add Firebase to Your App
Select your platform (iOS, Android, Web) in the Firebase Console.
Follow the setup instructions to add Firebase to your app.
Download the config file for your platform and place it in your project directory.

Replace this values with your values in the firebase.js page

 const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  Replace "YOUR_API_KEY", "YOUR_AUTH_DOMAIN", etc. with your actual Firebase configuration values.


  Step 4: Start Using Firebase Services
Now that Firebase is set up in your project, you can start using various Firebase services like Firestore, Realtime Database, Cloud Functions, etc. Refer to the Firebase documentation for detailed usage instructions.

## Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.