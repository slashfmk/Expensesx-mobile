import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import * as constants from "../../constants/appConstants";
import AppText from "../../ui/AppText";
import ActivityIndicator from "../../ui/ActivityIndicator";
import CategoryItem from "../../ui/CategoryItem";
import * as constant from "../../constants/appConstants";
import FullBottomButton from "../../ui/FullBottomButton";
import navConstants from "../../constants/navConstants";
import FixedButton from "../../ui/FixedButton";
import {QueryObserverResult, useQuery, useQueryClient} from "react-query";
import typesApi from "../../api/typesApi";
import PageActivityIndicator from "../../ui/PageActivityIndicator";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ExpenseManager: React.FC<any> = (props) => {

    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const {isLoading, isError, isFetching, data}: QueryObserverResult = useQuery(
        'typeExpenses',
        () => axiosPrivate.get(`/type/expenses`));

    const [refresh, setRefresh] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    //@ts-ignore
    const handleClose = (): void => {
        setIsModalVisible(false);
    }

    const refreshContent = async () => {
        await queryClient.invalidateQueries('typeExpenses');
    }

    return (
        <View style={style.container}>

            <View>
                <AppText style={style.title}>{data ?
                    //@ts-ignore
                    data?.data.length : 0} expense types available</AppText>
            </View>

            <FixedButton
                title={"plus"}
                onPress={() => props.navigation.navigate(navConstants.ADDTYPE, {type: "expenses"})}
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

export default ExpenseManager;

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
