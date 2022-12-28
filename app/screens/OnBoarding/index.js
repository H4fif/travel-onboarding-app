import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Constants
import { images, theme } from '../../constants';
const { onBoarding1, onBoarding2, onBoarding3 } = images;

// Themes
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data
const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      'Enim beatae non magnam ad expedita perferendis ad qui. Praesentium in ut cum fugiat quaerat incidunt dolore iure nam. Et similique sed aut cum voluptatum id dolorem. Consectetur quidem blanditiis asperiores velit assumenda modi possimus veniam. Ad sapiente error.',
    img: onBoarding1,
  },
  {
    title: 'Navigation',
    description:
      'Enim beatae non magnam ad expedita perferendis ad qui. Praesentium in ut cum fugiat quaerat incidunt dolore iure nam. Et similique sed aut cum voluptatum id dolorem. Consectetur quidem blanditiis asperiores velit assumenda modi possimus veniam. Ad sapiente error.',
    img: onBoarding2,
  },
  {
    title: 'Destination',
    description:
      'Enim beatae non magnam ad expedita perferendis ad qui. Praesentium in ut cum fugiat quaerat incidunt dolore iure nam. Et similique sed aut cum voluptatum id dolorem. Consectetur quidem blanditiis asperiores velit assumenda modi possimus veniam. Ad sapiente error.',
    img: onBoarding3,
  },
];

const OnBoarding = () => {
  const scrollX = useMemo(() => new Animated.Value(0), []);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  const renderContent = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false },
      )}>
      {onBoardings.map((item, index) => (
        <View
          key={'onboarding-container-' + index}
          style={{ width: SIZES.width }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={item.img}
              resizeMode="cover"
              style={{ height: '100%', width: '100%' }}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: '10%',
              left: 40,
              right: 40,
            }}>
            <Text
              style={{ ...FONTS.h1, color: COLORS.gray, textAlign: 'center' }}>
              {item.title}
            </Text>

            <Text
              style={{
                ...FONTS.body3,
                textAlign: 'center',
                marginTop: SIZES.base,
                color: COLORS.gray,
              }}>
              {item.description}
            </Text>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={'dot-' + index}
              opacity={opacity}
              style={[
                styles.dot,
                { width: dotSize, height: dotSize },
              ]}></Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => console.log('skip button pressed')}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>
          {completed ? "Let's Go!" : 'Skip'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '3.5%' : '20%',
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
  skipButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 125,
    height: 60,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: COLORS.blue,
    paddingLeft: 20,
  },
});

export default OnBoarding;
