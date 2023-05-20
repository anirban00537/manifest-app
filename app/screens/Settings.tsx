import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';
import colors from '../constants/colors';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [fontSize, setFontSize] = React.useState('medium');
  const [autoSaveEnabled, setAutoSaveEnabled] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [showTips, setShowTips] = React.useState(true);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
  };

  const toggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const toggleShowTips = () => {
    setShowTips(!showTips);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>General Settings</Text>

      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          color={colors.primary}
        />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
          color={colors.primary}
        />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Font Size</Text>
        <View style={styles.fontSizeContainer}>
          <Text
            style={[
              styles.fontSizeOption,
              fontSize === 'small' && styles.selectedFontSize,
            ]}
            onPress={() => changeFontSize('small')}>
            Small
          </Text>
          <Text
            style={[
              styles.fontSizeOption,
              fontSize === 'medium' && styles.selectedFontSize,
            ]}
            onPress={() => changeFontSize('medium')}>
            Medium
          </Text>
          <Text
            style={[
              styles.fontSizeOption,
              fontSize === 'large' && styles.selectedFontSize,
            ]}
            onPress={() => changeFontSize('large')}>
            Large
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Vision Board Settings</Text>

      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Auto Save</Text>
        <Switch
          value={autoSaveEnabled}
          onValueChange={toggleAutoSave}
          color={colors.primary}
        />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Language</Text>
        <View style={styles.languageContainer}>
          <Text
            style={[
              styles.languageOption,
              language === 'en' && styles.selectedLanguage,
            ]}
            onPress={() => changeLanguage('en')}>
            English
          </Text>
          <Text
            style={[
              styles.languageOption,
              language === 'fr' && styles.selectedLanguage,
            ]}
            onPress={() => changeLanguage('fr')}>
            French
          </Text>
          <Text
            style={[
              styles.languageOption,
              language === 'es' && styles.selectedLanguage,
            ]}
            onPress={() => changeLanguage('es')}>
            Spanish
          </Text>
        </View>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Show Tips</Text>
        <Switch
          value={showTips}
          onValueChange={toggleShowTips}
          color={colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  banner: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: colors.white,
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 18,
    color: colors.text,
  },
  fontSizeContainer: {
    flexDirection: 'row',
  },
  fontSizeOption: {
    fontSize: 16,
    marginRight: 10,
    color: colors.text,
  },
  selectedFontSize: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  languageContainer: {
    flexDirection: 'row',
  },
  languageOption: {
    fontSize: 16,
    marginRight: 10,
    color: colors.text,
  },
  selectedLanguage: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default SettingsScreen;
