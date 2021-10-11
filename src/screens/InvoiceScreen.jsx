import { useIsFocused, useNavigation } from '@react-navigation/core';
import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import {
	Alert,
	Button,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { rootNavigationScreens } from '../App';
import DateInputElement from '../components/DateInputElement';
import InputElement, {
	styles as InputElementStyles,
} from '../components/InputElement';
import { contactNumValidationPattern } from '../contants/validationPatterns';
import { useInvoiceForm } from '../contexts/InvoiceFormProvider';

export default function InvoiceScreen() {
	const { navigate } = useNavigation();
	const isFocused = useIsFocused();

	const { control, handleSubmit, appendItem } = useInvoiceForm();
	const itemFields = useWatch({ control, name: 'items', disabled: isFocused });

	const onFormSubmit = data => {
		console.log(data);
		if (!data.items || data.items.length <= 0) {
			return Alert.alert(
				"You haven't added any items",
				'Atleast 1 item must be added',
				[{ text: 'OK' }],
				{ cancelable: true },
			);
		}

		navigate(rootNavigationScreens.receipt);
	};

	return (
		<ScrollView style={styles.formContainer}>
			<View>
				<Text style={styles.formGroupLabel}>Buyer Info:</Text>
				<Controller
					name='buyerName'
					control={control}
					rules={{ required: '* Required' }}
					render={({
						field: { onChange, ...field },
						fieldState: { isDirty, error },
					}) => (
						<InputElement
							label="Buyer's Name"
							error={!isDirty && error}
							// TextInput props
							autoCapitalize='sentences'
							autoCompleteType='name'
							textContentType='name'
							placeholder='eg: Sriram'
							autoFocus
							onChangeText={onChange}
							{...field}
						/>
					)}
				/>
				<Controller
					name='buyerContactNumber'
					control={control}
					rules={{
						required: '* Required',
						pattern: contactNumValidationPattern,
					}}
					render={({
						field: { onChange, ...field },
						fieldState: { isDirty, error },
					}) => (
						<InputElement
							label="Buyer's Contact Number"
							error={!isDirty ? error : void 0}
							// TextInput props
							autoCompleteType='tel'
							keyboardType='phone-pad'
							textContentType='telephoneNumber'
							placeholder='eg: 9933324884'
							onChangeText={onChange}
							{...field}
						/>
					)}
				/>
				<Controller
					name='transactionDate'
					control={control}
					rules={{ required: '* Required' }}
					render={({
						field: { onChange, onBlur, value: date, ref },
						fieldState: { error },
					}) => (
						<DateInputElement
							label='Date &amp; Time of transaction'
							error={error}
							date={date}
							onChangeDate={onChange}
							onBlur={onBlur}
							ref={ref}
						/>
					)}
				/>
			</View>

			<View>
				<Text style={[styles.formGroupLabel, styles.mt15]}>Items:</Text>

				{itemFields && itemFields.length > 0 ? (
					itemFields.map(({ id, itemName }) => <Text key={id}>{itemName}</Text>)
				) : (
					<Text style={InputElementStyles.error}>No Items added yet</Text>
				)}
			</View>

			<View style={styles.actionsContainer}>
				<Button
					title='Add Item'
					onPress={() => {
						appendItem();
						navigate(rootNavigationScreens.addItem);
					}}
				/>
				<Button title='Submit' onPress={handleSubmit(onFormSubmit)} />
			</View>
		</ScrollView>
	);
}

export const styles = StyleSheet.create({
	formContainer: {
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	formGroupLabel: {
		fontSize: 25,
		color: 'black',
		marginBottom: 10,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
	},
	textCenter: {
		textAlign: 'center',
	},
	mt15: {
		marginTop: 15,
	},
	actionsContainer: {
		marginTop: 20,
	},
});
