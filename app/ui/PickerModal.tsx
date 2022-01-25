import React, {useState, useEffect} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';



type Props = {
    items: string[];
    visible: boolean;
    title: string;
    onClose: () => void;
    onSelect: (value: string) => void;
    value: string;
};

const PickerModal: React.FC<Props> = ({
                                          items,
                                          visible,
                                          onSelect,
                                          onClose,
                                          title,
                                          value,
                                      }) => {
    const [pickerValue, setPickerValue] = useState<string>('');
    const {placeholderAge, placeHolderGender, genderMale} = useTranslation();

    useEffect(() => {
        if (!value) {
            const defaultPickerValue = title === 'age' ? '30' : genderMale;
            setPickerValue(defaultPickerValue);
        } else {
            setPickerValue(value);
        }
    }, [visible, title, value, genderMale]);

    const finalTitle = title === 'age' ? placeholderAge : placeHolderGender;

    return (
        <Modal animated transparent visible={visible} animationType="fade">
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <View style={styles.header}>
                        <IconButton onPress={onClose}>
                            <Icon name="close" />
                        </IconButton>
                        <Typography color="dark" style={styles.label}>
                            {finalTitle}
                        </Typography>
                        <IconButton
                            onPress={() => {
                                onSelect(pickerValue);
                                onClose();
                            }}>
                            <Icon name="check" />
                        </IconButton>
                    </View>
                    <Picker
                        selectedValue={pickerValue}
                        onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}>
                        {items.map((item) => (
                            <Picker.Item value={item} label={item} />
                        ))}
                    </Picker>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pickerContainer: {
        height: 200,
        width: '100%',
        backgroundColor: 'white',
    },
    label: {
        textTransform: 'capitalize',
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ThemeColors.white,
    },
});

export default PickerModal;