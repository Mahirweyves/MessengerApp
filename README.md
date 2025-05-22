# MessengerApp

## Setup Instructions

### 1. **Clone the Repository**
```
git clone https://github.com/Mahirweyves/MessengerApp

cd MessengerApp
```

### 2. **Install Dependencies**
```sh
npm install
```

### 3. **Install Expo CLI (if not installed)**
```sh
npm install -g expo-cli
```

### 4. **Start Metro Bundler**
```sh
npx expo start
```
or
```sh
npm start
```

### 5. **Run on Android Emulator**
- Open Android Studio > Device Manager > Start a virtual device.
- In the Expo DevTools, click **Run on Android device/emulator**.

### 6. **Run on iOS Simulator (Mac only)**
- Open Xcode > Open Simulator.
- In the Expo DevTools, click **Run on iOS simulator**.

### 7. **Run on Physical Device**
- Install **Expo Go** from the App Store/Google Play.
- Scan the QR code from Expo DevTools.

---

## Features

- **HomeScreen**: Shows 6 directories (School, Home, Love, Family, Friends, Work) in a 2-column, 3-row grid with icons.
- **MessageScreen**: View, add, edit, and delete messages for each directory.
- Messages are persisted using AsyncStorage.

---

## Troubleshooting

- **Stuck on Splash Screen**:  
  - Make sure Metro Bundler is running (`npx expo start`).
  - Try clearing cache: `npx expo start -c`.
  - Check for errors in the terminal.

- **ADB Not Recognized**:  
  - Add `platform-tools` to your system PATH or use the full path to `adb.exe`.

- **App Icon**:  
  - Replace the default icon in `android/app/src/main/res/mipmap-*` and `ios/YourApp/Images.xcassets/AppIcon.appiconset/`.

---

## Notes

- The app uses `react-native-vector-icons` for directory icons.
- All messages are stored locally per directory using AsyncStorage.
- The project is compatible with Expo and React Native CLI.

---

## Contact

For any issues, please open an issue in the repository or contact the maintainer.
