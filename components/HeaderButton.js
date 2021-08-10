import { COLORS } from '../constants';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import React from 'react';

const CustomHeaderButton = props => (
  <HeaderButton
    {...props}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : COLORS.DARK_GREEN}
  />
)

export default CustomHeaderButton;