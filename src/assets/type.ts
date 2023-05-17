import { ImageSourcePropType} from 'react-native';


export interface ImageSource {

  imageSource: ImageSourcePropType;
}

export class RemoteImage implements ImageSource {
  source: string;

  constructor(source: string) {
    this.source = source;
  }

  get imageSource(): ImageSourcePropType {
    return { uri: this.source };
  }
}