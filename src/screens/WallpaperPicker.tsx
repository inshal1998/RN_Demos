import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Alert,
} from 'react-native';
import React from 'react';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import { CustomBtn } from '../components';

const {WallpaperModule} = NativeModules;
const WallpaperPicker = () => {
  const requestStoragePermission = async (): Promise<boolean> => {
    let permission;

    if (Number(Platform.Version) > 32) {
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
    const result = await check(permission);
    if (result === RESULTS.GRANTED) return true;

    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED;
  };

  const pickImageAndSetWallpaper = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Cannot access gallery without permission',
      );
      return;
    }
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) return;

      const asset = response.assets?.[0];
      const uri = asset?.uri;

      if (!uri) {
        Alert.alert('Error', 'No image selected');
        return;
      }

      try {
        const filePath = uri.startsWith('file://') ? uri : `file://${uri}`;
        console.log(filePath , 'FilePath');
        
        const result = await WallpaperModule.setWallpaper(filePath);
        Alert.alert('Success', result);
      } catch (err) {
        console.log(err , "Err");
        
        Alert.alert('Error setting wallpaper', JSON.stringify(err));
        console.log('Error setting wallpaper', JSON.stringify(err));
      }
    });
  };

  return (
    <View style={styles.container}>
      <CustomBtn title="Pick Image & Set as Wallpaper" onPress={pickImageAndSetWallpaper} />
    </View>
  );
};

export default WallpaperPicker;

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20
    }
});
