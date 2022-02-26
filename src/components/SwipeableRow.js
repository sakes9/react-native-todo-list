import React from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

/**
 * スワイプビュー
 *
 * @export
 * @param {(number) => void}  onPress   ボタン押下時の処理
 * @param {JSX.Element}       children  JSX要素
 * @return {SwipeableRow}
 */
export default function SwipeableRow({ onPress, children }) {
  const ref = React.useRef(null);

  const renderRightActions = (progress, _dragAnimatedValue) => {
    return <View style={{ width: 120, flexDirection: 'row' }}>{renderRightAction(0, '削除', '#dd2c00', 40, progress)}</View>;
  };

  const renderRightAction = (btnId, text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      ref?.current.close();
      onPress(btnId);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable ref={ref} enabled={true} renderRightActions={renderRightActions}>
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}
