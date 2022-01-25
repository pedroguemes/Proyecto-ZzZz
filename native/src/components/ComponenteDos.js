import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const PizzaTranslator = (props) => {
  const {navigate} = props.navigation;
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
      <Text onPress={()=> navigate('C_Uno')}> Volver a GATITO</Text>
    </View>
  );
}

export default PizzaTranslator;