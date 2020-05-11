import React, {useState} from 'react';
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
import {LottieAnimation} from '../../components/animation/LottieAnimation';

const Screen = Dimensions.get('window');

function CardFace(props) {
  const [animationId, setAnimationId] = useState(props.animationId);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={props.style}
      onPress={() => {
        // setAnimationId((animationId + 1) % 3);
        this[props.parentRefName].flip();
      }}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.cardIconRow}>
          <Icon
            style={styles.cardTopIcon}
            name={props.icon}
            size={24}
            color={props.iconColor}
          />
        </View>
        {props.text && (
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <Text style={styles.cardText}>{props.text}</Text>
          </View>
        )}
        {!props.text && (
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <LottieAnimation animationId={animationId} />
          </View>
        )}
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
      animationId: 0,
      front: {
        icon: 'heart',
        iconColor: 'tomato',
        text: 'Old Monk',
        bgColor: '#eee',
      },
      back: {icon: 'fighter-jet', iconColor: '#444', bgColor: '#ffc'},
    },
    {
      animationId: 1,
      front: {
        icon: 'search',
        iconColor: 'tomato',
        text: 'Hayward 5000',
        bgColor: '#eee',
      },
      back: {icon: 'home', iconColor: '#444', bgColor: '#fcf'},
    },
    {
      animationId: 2,
      front: {
        icon: 'search',
        iconColor: '#ff0',
        text: 'Tarot',
        bgColor: '#eee',
      },
      back: {icon: 'home', iconColor: '#444', bgColor: '#cff'},
    },
    {
      animationId: 3,
      front: {
        icon: 'heart',
        iconColor: '#ff0',
        text: 'Tarot',
        bgColor: '#eee',
      },
      back: {icon: 'search', iconColor: '#444', bgColor: '#cff'},
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
              animationId={card.animationId}
              parentRefName={'card' + cardIndex}
            />
            <CardFace
              icon={card.back.icon}
              iconColor={card.back.iconColor}
              text={card.back.text}
              style={[styles.card, {backgroundColor: card.back.bgColor}]}
              animationId={card.animationId}
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
    width: Screen.width * 0.6,
    height: Screen.height * 0.5,
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
