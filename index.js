/**
 * @format
 */

import 'react-native-get-random-values';
import React from 'react';
import {AppRegistry} from 'react-native';
import {AppWrapperNonSync} from './app/AppWrapperNonSync';
import {name as appName} from './app.json';

const App = () => <AppWrapperNonSync />;

AppRegistry.registerComponent(appName, () => App);
