import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getDateTimeString } from './utils';
import { styles as InputElementStyles } from './InputElement';

const DateInputElement = React.forwardRef(
	({ label, date, error, onChangeDate, onBlur }, ref) => {
		const [isDatePickerModalOpen, setDatePickerModal] = useState(false);

		const onDatePickerConfirm = newDate => {
			setDatePickerModal(false);
			onChangeDate(newDate);
			onBlur();
		};
		const onDatePickerCancel = () => {
			setDatePickerModal(false);
			onBlur();
		};

		return (
			<View style={InputElementStyles.container}>
				<Text style={InputElementStyles.label}>
					{label || 'Date & Time of transaction'}
				</Text>
				<TouchableHighlight
					onPress={() => setDatePickerModal(true)}
					style={InputElementStyles.inputGroup}
					ref={ref}
				>
					<Text style={[InputElementStyles.input, styles.textCenter]}>
						{getDateTimeString(date)}
					</Text>
				</TouchableHighlight>
				<Text>{error?.message}</Text>

				<DatePicker
					mode='datetime'
					date={date}
					onDateChange={_ => _}
					minuteInterval={15}
					modal={true}
					open={isDatePickerModalOpen}
					onConfirm={onDatePickerConfirm}
					onCancel={onDatePickerCancel}
				/>
			</View>
		);
	},
);

export default DateInputElement;

const styles = StyleSheet.create({
	textCenter: {
		textAlign: 'center',
	},
});
