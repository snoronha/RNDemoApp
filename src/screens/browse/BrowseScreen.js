import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import CardFlip from 'react-native-card-flip';
import {ItemTile} from '../../components/item_tile/ItemTile';
import server from '../../conf/server';

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export function BrowseScreen({navigation}) {
  const [cards, setCards] = useState([...range(1, 50)]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>
          {card} - {index}
        </Text>
      </View>
    );
  };

  const onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const swipeLeft = () => {
    this.swiper.swipeLeft();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={() => onSwiped('general')}
          onSwipedLeft={() => onSwiped('left')}
          onSwipedRight={() => onSwiped('right')}
          onSwipedTop={() => onSwiped('top')}
          onSwipedBottom={() => onSwiped('bottom')}
          onTapCard={swipeLeft}
          cards={cards}
          cardIndex={cardIndex}
          cardVerticalMargin={80}
          renderCard={renderCard}
          onSwipedAll={onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button
              onPress={() => this.swiper.swipeBack()}
              title="Swipe Back"
            />
            <Button
              onPress={() => navigation.navigate('CardFlip')}
              title="Card Flip"
            />
          </View>
        </Swiper>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#07F',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardContainer: {
    flex: 1,
  },
});
