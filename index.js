/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    ViewPropTypes as RNViewPropTypes,
    Image,
} from 'react-native'

import PropTypes from 'prop-types';
import { getDimensionPercentage } from '../../src/Utils';
import { Colors, Fonts } from '../../src/theme';
const ViewPropTypes = RNViewPropTypes || View.propTypes;
export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const { height, width } = Dimensions.get('window');

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isShowIcon: false,
            text: '',
            imageUri: '',
            opacityValue: new Animated.Value(this.props.opacity),
            springValue: new Animated.Value(0),
            hideValue: new Animated.Value(0),


        }
    }

    show(text, isShowIcon, duration, callback) {
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.callback = callback;
        this.setState({

            text: text,
            isShowIcon: isShowIcon,
            isShow: true,
        });
        setTimeout(() => {
            this.setState({
                imageUri: require("./bckupSuccess.png"),
            });
        }, 700)

        this.animation = Animated.spring(
            this.state.springValue,
            {
                toValue: 1, // Final value
                friction: 2,
                tension: 100,
                useNativeDriver: true, // Improves performance

            }
        )
        this.animation.start(() => {
            setTimeout(() => {
                this.close();
            }, this.duration)
        });

    }

    close(duration) {


        if (!this.isShow && !this.state.isShow) return;


        this.animation = Animated.spring(
            this.state.springValue,
            {
                toValue: -10, // Final value
                useNativeDriver: true, // Improves performance
            }
        )
        this.animation.start(() => {
            this.setState({
                isShow: false,
                springValue: new Animated.Value(0),
                imageUri: ""
            })
        });

        // this.timer && clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        //     this.animation = Animated.timing(
        //         this.state.opacityValue,
        //         {
        //             toValue: 0.0,
        //             duration: this.props.fadeOutDuration,
        //         }
        //     )
        //     this.animation.start(() => {
        //         this.setState({
        //             isShow: false,
        //         });
        //         this.isShow = false;
        //         if (typeof this.callback === 'function') {
        //             this.callback();
        //         }
        //     });
        // }, delay);
    }

    componentWillUnmount() {
        this.animation && this.animation.stop()
        this.timer && clearTimeout(this.timer);
    }

    render() {

        const translateY = this.state.springValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 10],
        });

        // console.log("RENDER------------", this.state.springValue);
        let pos;
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }

        const view = this.state.isShow ?
            <View
                style={[styles.container, { top: pos }]}
                pointerEvents="none"
            >
                <Animated.View
                    style={[styles.content, {
                        transform: [{ translateY }]
                    }, this.props.style]}>
                    <View style={{
                        marginRight: 12, width: 20, height: 20,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {this?.state?.imageUri == "" ? <Image
                            resizeMode='contain'
                            style={{ width: 20, height: 20, }} source={require("./ic_tick_anim.gif")} /> :
                            <Image
                                resizeMode='contain'
                                style={{ width: 15, height: 15, }} source={this.state.imageUri} />}
                    </View>
                    {React.isValidElement(this.state.text) ? this.state.text : <Text style={[{
                        fontWeight: "700",
                        color: Colors.newTxtCol,
                        fontFamily: Fonts.bold,
                        fontSize: getDimensionPercentage(16),
                        letterSpacing: getDimensionPercentage(-0.32),
                        lineHeight: getDimensionPercentage(24)
                    }, this.props.textStyle]}>{this.state.text}</Text>}
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        backgroundColor: '#1F2133',
        borderRadius: 24,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#5C60FF1A"
    },
    text: {
        color: 'white'
    }
});

Toast.propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style,
    positionValue: PropTypes.number,
    fadeInDuration: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number
}

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
}
