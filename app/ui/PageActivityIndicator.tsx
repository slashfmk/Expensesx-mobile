
/*
Activity indicator for screens
 */
import React from 'react';
import {View} from 'react-native';
import AppModal from "./AppModal";
import ActivityIndicator from "./ActivityIndicator";

interface IPageActivityIndicator {
    visible: boolean;
}

const PageActivityIndicator: React.FC<IPageActivityIndicator> = (props) => {
    return (
        <AppModal
            title={"loading"}
            width={100}
            height={100}
            showIconTitle={props.visible}
            visible={props.visible}
        >
            <View style={{justifyContent: "center", alignItems: "center", position: "relative", top: -15}}>
                <ActivityIndicator visible={props.visible} />
            </View>

        </AppModal>
    );
}

export default PageActivityIndicator;
