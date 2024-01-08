import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import Toast from '../index.d.ts'
const index = () => {
    const toastRef = useRef(null);

    return (
        <View>
            <TouchableOpacity onPress={() => {
                toastRef?.current?.show("Show Successfully", true);
            }}>
                <Text>Show Toast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                toastRef?.current?.close();
            }}>
                <Text>Hide Toast</Text>
            </TouchableOpacity>


            <Toast
                ref={toastRef}
                style={{
                    backgroundColor: "#000",
                    borderRadius: 24,
                }}
                positionValue={50}
                position="top"
                textStyle={[
                    { marginHorizontal: 16 },
                ]}
            />
        </View>
    )
}

export default index