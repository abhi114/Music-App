import React, { FC, useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import CustomText from './CustomText';

interface SlidingTextProps {
    text: string | undefined;
    fontSize: number;
    fontFamily: string;
}

const SlidingText: FC<SlidingTextProps> = ({ text, fontSize, fontFamily, }) => {
    const [textWidth, setTextWidth] = useState<number>(0);
    const containerWidth = Dimensions.get('window').width - 190;
    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const handleTextLayout = (e: LayoutChangeEvent) => {
        const { width } = e.nativeEvent.layout;
        console.log('Measured Text Width:', width);
        setTextWidth(width);
    };

    useEffect(() => {
        console.log('Container Width:', containerWidth);
        console.log('Text Width:', textWidth);

        if (textWidth > containerWidth) {
            translateX.value = withRepeat(
                withTiming(-textWidth + containerWidth, {
                    duration: 5000,
                    easing: Easing.linear,
                }),
                -1,
                true
            );
        } else {
            translateX.value = 0;
        }
    }, [textWidth, containerWidth]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[animatedStyle,styles.textContainer]}
                
                 // Attach directly here
            >
                <CustomText fontSize={fontSize} onLayout={handleTextLayout} numberOfLines={1}  fontFamily={fontFamily}>
                    {text}
                </CustomText>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        width: '100%',
    },
    textContainer:{
        flexDirection:'row',
        width:650
    }
});

export default SlidingText;
