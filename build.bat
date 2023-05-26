keytool -genkey -v -keystore android/app/release-key.keystore -alias suivis -keyalg RSA -keysize 2048 -validity 10000

keytool -list -v -alias suivis -keystore android/app/release-key.keystore