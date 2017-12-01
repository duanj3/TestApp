import { width, height} from 'react-native-dimension';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    $largeContainerSize: width(50),
    $largeImageSize: width(25),
    $smallContainerSize: width(25),
    $smallImageSize: width(12.5),
    container:{
        alignItems:'center',
    },
    containerImage:{
        alignItems: 'center',
        justifyContent: 'center',
        width: width(50),
        height: height(50),
        marginTop: -150,
    },
    currencyText:{
        fontWeight: '300',
        fontSize: 28,
        letterSpacing: 0,
        marginTop: -50,
        color: '$white',
    },
});
