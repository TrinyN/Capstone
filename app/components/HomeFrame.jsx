import Feather from "react-native-vector-icons/Feather";
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from '../styles'

// need to implement handle press later, quick track, open add pop up, notes add notes pop up

const HomeFrame = ({
    title,
}) => {

    let marginBottom
    let icon
    if (title == "Quick Track"){
        marginBottom = 20
        icon = 'plus-circle'
    }
    else {
        marginBottom = 0
        icon = 'edit-3'
    }
    return (
        // {/* Quick Track Frame */ }
        < View style={[styles.viewHomeFrameNormal, { marginBottom }]} >

            {/* Touchable Opacity to make entire frame a button */}
            {/* TODO: Add popup for quick tracker */}
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
                onPress={() => router.push('/tracker')}>
                <Text style={styles.frameTextWhite}>
                    {title}
                </Text>
                {/* How to fill pruple with dark plus (~Figma)??? */}
                {/* Issue: SVG (including stroke and fill) no long supported for feather */}
                <Feather name={icon}
                    size={55}
                    color={'#CB9CF2'}
                />
            </TouchableOpacity>

        </View >
    )
}

export default HomeFrame