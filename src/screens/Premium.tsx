import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Title, Paragraph, Button, List, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Premium = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Title style={styles.title}>Upgrade to Premium</Title>
          <Paragraph style={styles.description}>
            Unlock exclusive features and content
          </Paragraph>
          <List.Section style={styles.listSection}>
            <List.Item
              title="Ad-free experience"
              description="Enjoy your favorite content without interruptions"
              left={() => (
                <MaterialCommunityIcons
                  name="block-helper"
                  size={24}
                  color="#FFF"
                />
              )}
            />
            <Divider style={styles.listDivider} />
            <List.Item
              title="Offline playback"
              description="Download your favorite videos and watch them offline"
              left={() => (
                <MaterialCommunityIcons
                  name="download-circle-outline"
                  size={24}
                  color="#FFF"
                />
              )}
            />
            <Divider style={styles.listDivider} />
            <List.Item
              title="Exclusive content"
              description="Access content that's not available for free users"
              left={() => (
                <MaterialCommunityIcons
                  name="card-bulleted-outline"
                  size={24}
                  color="#FFF"
                />
              )}
            />
            <Divider style={styles.listDivider} />
            <List.Item
              title="Early access"
              description="Get early access to new features and updates"
              left={() => (
                <MaterialCommunityIcons
                  name="rocket-launch-outline"
                  size={24}
                  color="#FFF"
                />
              )}
            />
          </List.Section>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => console.log('Subscribe button pressed')}
          >
            <MaterialCommunityIcons
              name="currency-usd"
              size={24}
              color="#FFF"
            />
            <Paragraph style={styles.buttonText}>Subscribe</Paragraph>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Premium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  listSection: {
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
  },
  listItem: {
    color: 'white',
  },
  listDivider: {
    height: 1,
    marginVertical: 4,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 8,
  },
});
