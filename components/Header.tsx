import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
};

const Header = ({ title }: Props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        lineHeight: 28,
        fontFamily: 'Manrope-ExtraBold',
        color: '#FAFAFA',
    },
    closeButton: {
        fontSize: 24,
        color: '#FAFAFA',
    },
});
