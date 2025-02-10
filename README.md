# Short Bio App

This is a simple React Native app that allows users to create and save a short bio profile.  Users can set a profile picture, first name, last name, date of birth, nationality, and a short bio.  The data is persisted using MMKV for local storage.

## Features

* Profile picture selection (from device gallery)
* Input fields for first name, last name, date of birth, nationality, and bio
* Data persistence using MMKV
* Edit profile functionality
* Form validation

## Technologies Used

* React Native
* Expo
* react-native-mmkv
* @react-native-community/datetimepicker (attempted)
* expo-image-picker

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd short-bio-app-hw`
3. Install dependencies: `npm install` or `yarn install`
4. Run the app: `npx expo start` or `expo start`

## How to Use

1. Run the app on your device or emulator.
2. The main screen displays the current profile information (if any).
3. Tap the "Edit Profile" button to open the edit modal.
4. In the modal, you can change the profile picture, first name, last name, date of birth, nationality, and bio.
5. Tap "Save" to save the changes.
6. Tap "Cancel" to close the modal without saving.

## Complications

I encountered difficulties while integrating the `@react-native-community/datetimepicker` component for the date of birth input. While I was able to display the date picker, I faced challenges with properly updating the state and handling date formatting consistently.  Due to these issues, the date picker functionality is not fully implemented in this version.  The current implementation uses a text input for the date of birth, which is not ideal for user experience.  Future development will focus on resolving these issues and providing a more user-friendly date selection experience.

## Future Improvements

* Implement a fully functional date picker.
* Improve UI/UX.
* Add more robust form validation.
* Implement unit tests.

## Author

Juan Marenco 
