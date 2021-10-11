import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Button, ScrollView } from 'react-native';
import { rootNavigationScreens } from '../App';
import InputElement from '../components/InputElement';
import { useInvoiceForm } from '../contexts/InvoiceFormProvider';
import { numberValidationPattern } from '../contants/validationPatterns';
import { styles as InvoiceScreenStyles } from './InvoiceScreen';

export default function InvoiceItemFormScreen() {
	const { cancelCurrentItem, control, currentItemIndex, trigger } =
		useInvoiceForm();

	const navigation = useNavigation();

	// if user presses the cancel button or goes back
	// make sure current item is removed from form state
	useEffect(
		() =>
			navigation.addListener('beforeRemove', e => {
				const { payload } = e.data.action;
				if (!payload?.params?.isItemAdded) cancelCurrentItem();
			}),
		[navigation, cancelCurrentItem],
	);

	return (
		<ScrollView style={InvoiceScreenStyles.formContainer}>
			<Controller
				name={`items.${currentItemIndex}.itemName`}
				control={control}
				rules={{ required: '* Required' }}
				render={({
					field: { onChange, ...field },
					fieldState: { isDirty, error },
				}) => (
					<InputElement
						label='Item Name'
						autoCapitalize='sentences'
						placeholder='eg: Ball'
						onChangeText={onChange}
						{...field}
						error={isDirty ? error : void 0}
					/>
				)}
			/>

			<Controller
				name={`items.${currentItemIndex}.quantity`}
				control={control}
				rules={{
					required: '* Required',
					min: 1,
					pattern: numberValidationPattern,
				}}
				render={({
					field: { onChange, value, ...field },
					fieldState: { isDirty, error },
				}) => (
					<InputElement
						label='Quanitity'
						keyboardType='number-pad'
						onChangeText={str => onChange(+str)}
						value={value?.toString()}
						{...field}
						error={isDirty ? error : void 0}
					/>
				)}
			/>

			<Controller
				name={`items.${currentItemIndex}.pricePerItem`}
				control={control}
				rules={{
					required: '* Required',
					min: 0,
					pattern: numberValidationPattern,
				}}
				render={({
					field: { onChange, value, ...field },
					fieldState: { isDirty, error },
				}) => (
					<InputElement
						label='Price Per Item'
						prefix='₹'
						keyboardType='number-pad'
						onChangeText={str => onChange(+str)}
						value={value?.toString()}
						{...field}
						error={isDirty ? error : void 0}
					/>
				)}
			/>

			<Controller
				name={`items.${currentItemIndex}.discount`}
				control={control}
				rules={{
					required: '* Required',
					min: 0,
					pattern: numberValidationPattern,
				}}
				render={({
					field: { onChange, value, ...field },
					fieldState: { isDirty, error },
				}) => (
					<InputElement
						label='Discount (Excluding GST)'
						prefix='%'
						keyboardType='number-pad'
						onChangeText={str => onChange(+str)}
						value={value?.toString()}
						{...field}
						error={isDirty ? error : void 0}
					/>
				)}
			/>

			<Controller
				name={`items.${currentItemIndex}.GST`}
				control={control}
				rules={{
					required: '* Required',
					min: 0,
					pattern: numberValidationPattern,
				}}
				render={({
					field: { onChange, value, ...field },
					fieldState: { isDirty, error },
				}) => (
					<InputElement
						label='GST'
						prefix='%'
						keyboardType='number-pad'
						onChangeText={str => onChange(+str)}
						value={value?.toString()}
						{...field}
						error={isDirty ? error : void 0}
					/>
				)}
			/>

			<Button
				title='Add Item'
				onPress={async () => {
					try {
						const isFormValid = await trigger(`items.${currentItemIndex}`);
						if (isFormValid)
							// make sure event handler does not cancel the item
							navigation.navigate(rootNavigationScreens.invoice, {
								isItemAdded: true,
							});
					} catch (err) {
						console.error(err);
					}
				}}
			/>
			<Button
				title='Cancel'
				onPress={() => navigation.navigate(rootNavigationScreens.invoice)}
			/>
		</ScrollView>
	);
}
