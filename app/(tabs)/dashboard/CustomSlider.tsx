import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CustomSlider = ({ data }: { data: Array<{ id: string, title: string, start_date: string, end_date: string }> }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} 
      >
        {data.map((item, index) => (
          <View key={item.id} style={[styles.slide, index === activeIndex && styles.activeSlide]}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>Start Date: {item.start_date}</Text>
            <Text style={styles.text}>End Date: {item.end_date}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeSlide: {
    backgroundColor: '#4B0082',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    marginBottom:10
  },
  activeDot: {
    backgroundColor: '#4B0082',
  },
});

export default CustomSlider;
