## Building HEXA

### Prerequisites:

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/)
- [CocoaPods](https://cocoapods.org/)
- [Xcode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio)

Make sure you have `rn-nodeify` as a global dependency. If you don't, run `npm install -g rn-nodeify` to install it.

```
git clone https://github.com/bithyve/hexa.git
cd hexa
yarn install
```

In case you're using a windows machine, open setup.bat in a text editor and enter your user account name where prompted. If you changed the location of the android sdk during installation, enter the path to the sdk instead of the one already present.
Then, from the command prompt, run:

```
setup.bat
```

Make sure you have a `.env` similar to `.env.example` in your project's root directory before running hexa. If this file is not present with the appropriate values then the app will crash abruptly.

### Run on iOS

```
yarn ios
```

### Run on Android

```
yarn android
```

## Contributing

Please feel free to open a pull requests, issues with bugfixes and suggestions.

## License

[LICENSE](LICENSE)
