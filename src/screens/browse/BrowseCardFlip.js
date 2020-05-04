import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

const Screen = Dimensions.get('window');

function CardFace(props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={props.style}
      onPress={() => this[props.parentRefName].flip()}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.cardIconRow}>
          <Icon
            style={styles.cardTopIcon}
            name={props.icon}
            size={24}
            color={props.iconColor}
          />
        </View>
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <Text style={styles.cardText}>{props.text}</Text>
        </View>
        <View style={styles.cardIconRow}>
          <View />
          <Icon
            style={styles.cardBottomIcon}
            name={props.icon}
            size={24}
            color={props.iconColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function BrowseCardFlip() {
  let cards = [
    {
      front: {
        icon: 'heart',
        iconColor: 'tomato',
        text: 'Vibhu',
        bgColor: '#eee',
      },
      back: {
        icon: 'fighter-jet',
        iconColor: '#444',
        text: 'Mittal',
        bgColor: '#ffc',
      },
    },
    {
      front: {
        icon: 'search',
        iconColor: 'tomato',
        text: 'Ankit',
        bgColor: '#eee',
      },
      back: {icon: 'home', iconColor: '#444', text: 'Jain', bgColor: '#fcf'},
    },
    {
      front: {
        icon: 'search',
        iconColor: '#ff0',
        text: 'Tarot',
        bgColor: '#eee',
      },
      back: {icon: 'home', iconColor: '#444', text: 'Card', bgColor: '#cff'},
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true}>
        {cards.map((card, cardIndex) => (
          <CardFlip
            key={cardIndex.toString()}
            style={styles.cardContainer}
            ref={card => (this['card' + cardIndex] = card)}>
            <CardFace
              icon={card.front.icon}
              iconColor={card.front.iconColor}
              text={card.front.text}
              style={[styles.card, {backgroundColor: card.front.bgColor}]}
              parentRefName={'card' + cardIndex}
            />
            <CardFace
              icon={card.back.icon}
              iconColor={card.back.iconColor}
              text={card.back.text}
              style={[styles.card, {backgroundColor: card.back.bgColor}]}
              parentRefName={'card' + cardIndex}
            />
          </CardFlip>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardContainer: {
    alignSelf: 'center',
    width: Screen.width * 0.45,
    height: Screen.height * 0.35,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 24,
    alignSelf: 'center',
  },
  cardIconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTopIcon: {
    margin: 4,
    alignSelf: 'flex-start',
  },
  cardBottomIcon: {
    margin: 4,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
});
