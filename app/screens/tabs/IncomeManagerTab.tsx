import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList, Alert} from "react-native";

import * as constants from '../../constants/appConstants';
import CategoryItem from "../../ui/CategoryItem";
import * as constant from "../../constants/appConstants";
import AppText from "../../ui/AppText";
import navConstants from "../../constants/navConstants";

import {QueryObserverResult, useQuery, QueryClient, useQueryClient} from "react-query";

import typesApi from "../../api/typesApi";
import FixedButton from "../../ui/FixedButton";
import PageActivityIndicator from "../../ui/PageActivityIndicator";
import axios from "axios";
import {baseUrlApi} from "../../constants/genConstant";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const IncomeManager: React.FC<any> = (props) => {

    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const {isLoading, isError, isFetching, data}: QueryObserverResult = useQuery(
        'typeIncomes',
        () => axiosPrivate.get(`/type/incomes`));

    const [refresh, setRefresh] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    //@ts-ignore
    const handleClose = (): void => {
        setIsModalVisible(false);
    }

    const refreshContent = async () => {
        await queryClient.invalidateQueries('typeIncomes');
    }

    return (
        <View style={style.container}>

            <View>
                <AppText style={style.title}>{data ?
                    //@ts-ignore
                    data?.data.length : 0} income types available</AppText>
            </View>

            <FixedButton
                title={"plus"}
                onPress={() => props.navigation.navigate(navConstants.ADDTYPE, {type: "incomes"})}
            />

            {
                 isLoading || isFetching ? <PageActivityIndicator visible={isLoading || isFetching}/> :
                    <FlatList style={{width: "100%"}}
                              data={data?.data}
                              renderItem={
                                  ({item}) => <CategoryItem
                                      id={item.type_id}
                                      title={item.title}
                                      subTitle={item.description}
                                      onLongPress={() => console.log("Very long press!")}
                                      onPress={() => props.navigation.navigate(navConstants.EDITTYPE,
                                          {
                                              item: {
                                                  id: item.type_id,
                                                  title: item.title,
                                                  description: item.description,
                                                  category: item.category
                                              }
                                          })
                                      }
                                  />
                              }
                              keyExtractor={item => item.type_id}
                              refreshing={refresh}
                              onRefresh={async () => refreshContent()}
                    />
            }
        </View>
    );

}

export default IncomeManager;

const style = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        backgroundColor: constants.COLORS.secondary,
        alignItems: "center"
    },
    title: {
        color: constant.COLORS.lightGray,
        paddingVertical: 10,
        fontSize: 17,
        marginBottom: 0
    },

});
