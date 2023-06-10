

import Toast from 'react-native-toast-message';

export const showToast = (
  type: 'success' | 'error',
  title: string,
  desc: string,
  position: 'top' | 'bottom',
) => {
  Toast.show({
    type: type,
    text1: title,
    text2: desc,
    position: position,
  });
};
export const showError = (title: string, subtitle: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: subtitle,
    position: 'bottom',
  });
};
export const showInfo = (title: string, subtitle: string) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: subtitle,
    position: 'bottom',
  });
};
export const showSuccess = (title: string, subtitle: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: subtitle,
    position: 'bottom',
  });
};