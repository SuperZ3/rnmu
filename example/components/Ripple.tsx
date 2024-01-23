import { Ripple as OriginRipple } from '@rnmu/components';
import { View } from 'react-native';

const Ripple = () => {
    return (
        <OriginRipple>
            {({pressed}) => <View style={{width: 100, height: 100, backgroundColor: pressed ? 'blue' : 'red'}}></View>}
        </OriginRipple>
    )
}

export default Ripple