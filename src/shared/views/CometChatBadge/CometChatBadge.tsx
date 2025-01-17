import React, { useContext } from 'react';
// @ts-ignore
import { Text, TextStyle, View, ViewProps } from 'react-native';
import { CometChatContextType } from '../../base/Types';
import { CometChatContext } from '../../CometChatContext';
import { BadgeStyle } from './BadgeStyle';
import styles from './styles';

/**
 *
 * CometChatBadge is a component useful when returning the number of unread messages in a chat.
 * This component is used to return the unread message count with custom style.
 *
 * @version 1.0.0
 * @author CometChat
 *
 */
interface CometChatBadgeProps {
  count: number;
  style?: BadgeStyle;
}

export const CometChatBadge = (props: CometChatBadgeProps) => {
  const {
    count= 0,
    style: propsStyle= new BadgeStyle({}),
  } = props;
  const { theme } = useContext<CometChatContextType>(CometChatContext);

  const style = new BadgeStyle({
    backgroundColor: theme?.palette.getPrimary(),
    textFont: theme.typography.caption2,
    textColor: theme.palette.getBackgroundColor(),
    ...propsStyle
  });

  if (count == 0) return null;
  return (
    <View
      style={[
        styles.badgeStyle,
        {
          backgroundColor: style.backgroundColor,
          borderRadius: style.borderRadius,
          width: style.width,
          height: style.height,
        } as ViewProps,
        style.border,
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          {
            color: style.textColor,
          },
          style.textFont,
        ] as TextStyle[]}
      >
        {count > 999 ? '999+' : count}
      </Text>
    </View>
  );
};
